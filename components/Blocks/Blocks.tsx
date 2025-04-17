import { UIForm } from '@components/_shared/Form';
import React from 'react';
import { BlocksView } from './Blocks.view';
import { BlockPayoad, useCreateBlockMutation } from '@src/redux/block/block';
import { notificationEasy } from '@src/utils';
import { Form } from 'antd';

type FormProps = {
    name: string;
    nameRu: string;
    nameEn: string;
};
export const Blocks: React.FC = () => {
    const [createBlock, { isLoading: isLoadingCreate }] = useCreateBlockMutation();

    const [form] = Form.useForm();

    const onSubmit = async ({ name, nameEn, nameRu }: FormProps) => {
        const payload: BlockPayoad = {
            name,
            short_name_eng: nameEn,
            short_name_rus: nameRu,
        };

        const res: any = await createBlock(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Блок успешно создан',
            });

            form.resetFields();
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при создании блока',
            });
        }
    };

    return (
        <UIForm
            onFinish={onSubmit}
            layout="vertical"
            form={form}
        >
            <BlocksView isLoadingCreate={isLoadingCreate} />
        </UIForm>
    );
};
