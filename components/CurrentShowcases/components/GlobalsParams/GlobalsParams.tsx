import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';

import { usePopupControls } from '@hooks/usePopupControls';

import {
    ShowcaseUpdateGlobalParams,
    ShowcaseVars,
    useBaseQuery,
    useUpdateBaseMutation,
} from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { GlobalsParamsView } from './GlobalsParams.view';
import { ModalGlobalParams } from './ModalGlobalParams';

type Props = {
    isReference: boolean;
};

type FormProps = {
    aces: number;
    variables: ShowcaseVars[];
    base_ctl_entity_id: number;
    base_ctl_entity_name: string;
    base_ctl_entity_path: string;
    end_ctl_entity_id: number;
};

export const GlobalsParams: React.FC<Props> = ({ isReference }) => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    const { isOpened, openPopup, closePopup } = usePopupControls();

    // Query
    const { data: dataBase } = useBaseQuery(id as string, {
        skip: !id,
    });

    // Mutatations
    const [updateGlobalParams, { isLoading: isLoadingUpdate }] =
        useUpdateBaseMutation();

    useEffect(() => {
        if (dataBase) {
            form.setFieldsValue({
                aces: dataBase.tuz,
                base_ctl_entity_id: dataBase.base_ctl_entity_id,
                base_ctl_entity_name: dataBase.base_ctl_entity_name,
                base_ctl_entity_path: dataBase.base_ctl_entity_path,
                end_ctl_entity_id: dataBase.end_ctl_entity_id,
            });
        }
    }, [dataBase]);

    const onChangeField = debounce(async (field: FormProps) => {
        if (isReference) return;

        const payload: ShowcaseUpdateGlobalParams = {
            id: String(id),
            tuz: field.aces,
            base_ctl_entity_id: field.base_ctl_entity_id,
            base_ctl_entity_name: field.base_ctl_entity_name,
            base_ctl_entity_path: field.base_ctl_entity_path,
            end_ctl_entity_id: field.end_ctl_entity_id,
        };

        const res: any = await updateGlobalParams(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно обновлены',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при обновлении данных',
            });
        }
    }, 1000);

    return (
        <>
            <UIForm
                onValuesChange={(_, allValues) => onChangeField(allValues)}
                layout="vertical"
                form={form}>
                <GlobalsParamsView
                    isLoadingUpdate={isLoadingUpdate}
                    role={role}
                    openModalGlobal={openPopup}
                />
            </UIForm>
            <ModalGlobalParams
                opened={isOpened}
                isReference={isReference}
                onClose={closePopup}
            />
        </>
    );
};
