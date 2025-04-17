import { UIForm } from '@components/_shared/Form';
import React, { useEffect } from 'react';
import { IncrementView } from './Increment.view';
import {
    ThreadsGetIncrement,
    ThreadsGetIncrementPayload,
    useCurrDataNodeQuery,
    useUpdateCurrDataNodeMutation,
} from '@src/redux/nodes/nodes';
import { Form } from 'antd';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';

type Props = {
    threadId: string;
    onClose: () => void;
};

type FormProps = ThreadsGetIncrement;

export const Increment: React.FC<Props> = ({ threadId, onClose }) => {
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: currDataNode } = useCurrDataNodeQuery(threadId, {
        skip: !threadId,
    });

    // Mutations
    const [updateIncrement, { isLoading }] = useUpdateCurrDataNodeMutation();

    useEffect(() => {
        if (currDataNode) {
            form.setFieldsValue({
                ...currDataNode.getIncrement.config,
                sparkEngineParams: currDataNode.getIncrement.config.sparkEngineParams ?? [{}],
            });
        }
    }, [currDataNode]);

    const onSubmit = async (data: FormProps) => {
        const payload: ThreadsGetIncrementPayload = {
            id: threadId,
            getIncrement: {
                config: data,
            },
        };

        const res: any = await updateIncrement(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно сохранены',
            });
            onClose();
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при сохранении данных',
            });
        }
    };

    return (
        <UIForm
            layout="vertical"
            form={form}
            onFinish={onSubmit}
        >
            <IncrementView
                isLoading={isLoading}
                role={role}
            />
        </UIForm>
    );
};
