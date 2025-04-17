import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UICard } from '@components/_shared/Card';
import { UIForm } from '@components/_shared/Form';

import {
    TExternal,
    TExternalpayload,
    useGetExternalQuery,
    useUpdateExternalMutation,
} from '@src/redux/directoriesAndFiles/directoriesAndFiles';
import { notificationEasy } from '@src/utils';

import { RegisterUserFuncView } from './RegisterUserFunc.view';

type FormProps = {
    external_conf: TExternal[];
};

export const RegisterUserFunc: React.FC = () => {
    const { id: branch_id } = useParams();
    const [form] = Form.useForm();

    // Query
    const { data: dataExternal } = useGetExternalQuery(branch_id as string, {
        skip: !branch_id,
    });

    // Mutations
    const [updateExternal, { isLoading: isLoadingUpdate }] =
        useUpdateExternalMutation();

    useEffect(() => {
        if (dataExternal) {
            form.setFieldsValue({
                ...dataExternal,
            });
        }
    }, [dataExternal]);

    const onSubmit = async ({ external_conf }: FormProps) => {
        const payload: TExternalpayload = {
            branchId: branch_id as string,
            external_conf,
        };

        const res: any = await updateExternal(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно сохранены',
            });
        }

        if (!res?.data?.external_conf) {
            notificationEasy({
                type: 'error',
                content: 'Произошла ошибка при сохранении',
            });
        }
    };

    return (
        <UICard>
            <UIForm form={form} onFinish={onSubmit}>
                <RegisterUserFuncView isLoadingUpdate={isLoadingUpdate} />
            </UIForm>
        </UICard>
    );
};
