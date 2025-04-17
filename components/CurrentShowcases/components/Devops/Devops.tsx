import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';
import { ShowcaseUpdateDevops } from '@src/redux/config/configs';
import {
    useBaseQuery,
    useUpdateBaseMutation,
} from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { DevopsView } from './Devops.view';

type Props = {
    isReference: boolean;
};

type FormProps = {
    ci_subsystem: string;
    sm_name: string;
    sonar_project_key: number;
};

export const Devops: React.FC<Props> = ({ isReference }) => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: dataBase, isLoading: isLoadingBase } = useBaseQuery(
        id as string,
        {
            skip: !id,
        }
    );

    // Mutations
    const [updateDevops] = useUpdateBaseMutation();

    useEffect(() => {
        if (dataBase) {
            form.setFieldsValue({
                ...dataBase,
            });
        }
    }, [dataBase]);

    const onChangeField = debounce(async (allValues: FormProps) => {
        if (isReference) return;

        const payload: ShowcaseUpdateDevops = {
            id: String(id),
            ...allValues,
        };

        const res: any = await updateDevops(payload);

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
    }, 700);

    return (
        <UIForm
            onValuesChange={(_, allValues) => onChangeField(allValues)}
            layout="vertical"
            form={form}>
            <DevopsView isLoadingDevops={isLoadingBase} role={role} />
        </UIForm>
    );
};
