import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { Key, useEffect, useMemo } from 'react';

import { UIForm } from '@components/_shared/Form';

import {
    ChangeCurrentCTLConfigPayload,
    useChangeCurrentCtlMutation,
    useCtlQuery,
    useCurrentCtlMutation,
    useDeleteCurrentCtlMutation,
    useShowcaseConfigCTLQuery,
} from '@src/redux/config/configs';
import { notificationEasy } from '@src/utils';

import { CardDataView } from './CardData.view';

type Props = {
    ctlID?: Key;
};

export type ConfigsListItems = {
    label: string;
    value: number;
};

type FormProps = {
    ctl_id: number;
    ctl_name: string;
    path: string;
    category: string;
    parent: number;
};

export const CardData: React.FC<Props> = ({ ctlID }) => {
    const [form] = Form.useForm();

    // Query
    const { data: configsCTL, refetch: refetchConfigsCTL } =
        useShowcaseConfigCTLQuery(undefined, {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        });
    const { refetch: refetchCurrCTL } = useCtlQuery();

    // Mutations
    const [getCurrentCTL, { data: CTL }] = useCurrentCtlMutation();
    const [updateCurrCTL] = useChangeCurrentCtlMutation();
    const [deleteCurrCTL, { isLoading: isLoadingDelete }] =
        useDeleteCurrentCtlMutation();

    const normalConfigsList = useMemo(
        () =>
            configsCTL?.length
                ? configsCTL.map((item) => ({
                      label: item.entity_name,
                      value: item.id,
                  }))
                : [],
        [configsCTL]
    );

    useEffect(() => {
        getDataCurrentCTL();
    }, [ctlID]);

    useEffect(() => {
        if (CTL) {
            form.setFieldsValue({
                ctl_id: CTL.entity_id,
                ctl_name: CTL.entity_name,
                path: CTL.entity_path,
                category: CTL.entity_category,
                parent: CTL.parent,
            });
        }
    }, [CTL]);

    const getDataCurrentCTL = async () => {
        if (ctlID) {
            await getCurrentCTL(ctlID);
        }
    };

    const onChangeField = debounce(async (field: FormProps) => {
        const payload: ChangeCurrentCTLConfigPayload = {
            id: ctlID as Key,
            entity_id: field.ctl_id,
            entity_name: field.ctl_name,
            entity_path: field.path,
            entity_category: field.category,
            parent: field.parent,
        };

        const res: any = await updateCurrCTL(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно обновлены',
            });
            refetchCurrCTL();
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при обновлении данных',
            });
        }
    }, 700);

    const handleDeleteCurrCTL = async (cascade: boolean) => {
        const payload = {
            id: ctlID as Key,
            cascade,
        };

        const res: any = await deleteCurrCTL(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Конфигурация успешно удалена',
            });
            refetchCurrCTL();
            refetchConfigsCTL();
            form.resetFields();
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при удалении конфигурации',
            });
        }
    };

    // TODO: Добавить Skeleton
    return (
        <UIForm
            layout="vertical"
            form={form}
            onValuesChange={(_, allValues) => onChangeField(allValues)}>
            <CardDataView
                normalConfigsList={normalConfigsList}
                parent={CTL?.parent}
                isLoadingDelete={isLoadingDelete}
                handleDeleteCurrCTL={handleDeleteCurrCTL}
            />
        </UIForm>
    );
};
