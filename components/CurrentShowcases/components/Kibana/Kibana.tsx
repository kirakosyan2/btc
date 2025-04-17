import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';
import {
    ShowcaseKibanaUpdate,
    useBaseQuery,
    useUpdateBaseMutation,
} from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { KibanaView } from './Kibana.view';

type Props = {
    isReference: boolean;
};

type FormProps = {
    id: string;
    shortName: string;
};
export const Kibana: React.FC<Props> = ({ isReference }) => {
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
    const [updateKibana] = useUpdateBaseMutation();

    useEffect(() => {
        if (dataBase) {
            form.setFieldsValue({
                id: dataBase.kibana_app_id,
                shortName: dataBase.kibana_app_name,
            });
        }
    }, [dataBase]);

    const onChangeField = debounce(async (field: FormProps) => {
        if (isReference) return;

        const payload: ShowcaseKibanaUpdate = {
            id: String(id),
            kibana_app_id: field.id,
            kibana_app_name: field.shortName,
        };

        const res: any = await updateKibana(payload);

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
            <KibanaView isLoadingData={isLoadingBase} role={role} />
        </UIForm>
    );
};
