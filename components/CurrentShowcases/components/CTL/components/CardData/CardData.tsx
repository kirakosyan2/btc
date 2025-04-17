import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { Key, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';

import { useCtlCategoryQuery } from '@src/redux/config/configs';
import {
    TCTLTreeCurrConfigPayload,
    TCTLTreeUpdateCurrConfigPayload,
    TDeleteCurrConfigPayload,
    useConfigsTreeQuery,
    useCtlTreeCurrConfigMutation,
    useCtlTreeQuery,
    useCtlTreeUpdateCurrConfigMutation,
    useDeleteConfigTreeMutation,
} from '@src/redux/showcases/showcase';
import { notificationEasy } from '@src/utils';

import { CardDataView } from './CardData.view';

type Props = {
    ctlID: Key;
    openedModalSteam: () => void;
};

type FormProps = {
    ctl_id: number;
    ctl_name: string;
    path: string;
    category: string;
    parent: number;
};

export type ConfigsListItems = {
    label: string;
    value: number;
};

export const CardData: React.FC<Props> = ({ ctlID, openedModalSteam }) => {
    const { id: datamartID } = useParams();
    const [form] = Form.useForm();

    // Query
    const [getConfig, { data: configData }] = useCtlTreeCurrConfigMutation();
    const { data: configsTree, refetch: refetchConfigsTree } =
        useConfigsTreeQuery(datamartID as string, {
            skip: !datamartID,
        });
    const { data: ctlCategory } = useCtlCategoryQuery();
    const { refetch: refetchCtlTree } = useCtlTreeQuery(datamartID as string, {
        skip: !datamartID,
    });

    // Mutations
    const [updateCurrConfig] = useCtlTreeUpdateCurrConfigMutation();
    const [deleteCurrConfig, { isLoading: isLoadingDelete }] =
        useDeleteConfigTreeMutation();

    const normalConfigsList = useMemo(
        () =>
            configsTree?.length
                ? configsTree.map((item) => ({
                      label: item.entity_name,
                      value: item.id,
                  }))
                : [],
        [configsTree]
    );

    useEffect(() => {
        getDataCurrentCTL();
    }, [ctlID, datamartID]);

    useEffect(() => {
        if (ctlID && configData) {
            form.setFieldsValue({
                ctl_id: configData.entity_id,
                ctl_name: configData.entity_name,
                path: configData.entity_path,
                category: configData.entity_category,
                parent: configData.parent,
            });
        }
    }, [ctlID, configData]);

    const getDataCurrentCTL = async () => {
        if (ctlID && datamartID) {
            const payload: TCTLTreeCurrConfigPayload = {
                datamartId: datamartID,
                treeId: ctlID,
            };

            await getConfig(payload);
        }
    };

    const onChangeField = debounce(async (field: FormProps) => {
        const payload: TCTLTreeUpdateCurrConfigPayload = {
            ctlId: ctlID as string,
            datamartId: datamartID as string,
            entity_id: field.ctl_id,
            entity_name: field.ctl_name,
            entity_path: field.path,
            entity_category: field.category,
            parent: field.parent,
        };

        const res: any = await updateCurrConfig(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно обновлены',
            });
            refetchCtlTree();
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при обновлении данных',
            });
        }
    }, 700);

    const handleDelete = async (cascade: boolean) => {
        const payload: TDeleteCurrConfigPayload = {
            datamartId: datamartID as string,
            treeId: ctlID as Key,
            cascade,
        };

        const res: any = await deleteCurrConfig(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Конфигурация успешно удалена',
            });
            refetchCtlTree();
            refetchConfigsTree();
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

    return (
        <UIForm
            form={form}
            layout="vertical"
            onValuesChange={(_, allValues) => onChangeField(allValues)}>
            <CardDataView
                parent={configData?.parent}
                normalConfigsList={normalConfigsList}
                isLoadingDelete={isLoadingDelete}
                ctlCategory={ctlCategory?.entity_category}
                handleDelete={handleDelete}
                openedModalSteam={openedModalSteam}
            />
        </UIForm>
    );
};
