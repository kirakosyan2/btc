import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';

import {
    ShowcaseUpdateBase,
    useBaseQuery,
    useCreateEntityCtlMutation,
    useUpdateBaseMutation,
} from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { CTLView } from './CTL.view';

type Props = {
    isReference: boolean;
};

type FormProps = {
    base_ctl_entity_id: number;
    end_ctl_entity_id: number;
    base_ctl_entity_name: string;
    base_ctl_entity_path: string;
};

export const CTL: React.FC<Props> = ({ isReference }) => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query

    const { data: dataBase } = useBaseQuery(id as string, {
        skip: !id,
    });

    // Mutations
    useCreateEntityCtlMutation();
    const [updateBase] = useUpdateBaseMutation();

    useEffect(() => {
        if (dataBase) {
            form.setFieldsValue({
                ...dataBase,
            });
        }
    }, [dataBase]);

    const onChangeField = debounce(async (field: FormProps) => {
        if (isReference) return;

        const payload: ShowcaseUpdateBase = {
            id: String(id),
            ...field,
        };

        const res: any = await updateBase(payload);

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
            layout="vertical"
            form={form}
            onValuesChange={(_, allValues) => onChangeField(allValues)}>
            <CTLView role={role} />
        </UIForm>
    );
};
