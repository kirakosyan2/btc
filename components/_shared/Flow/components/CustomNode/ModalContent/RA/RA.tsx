import { UIForm } from '@components/_shared/Form';
import React, { useEffect } from 'react';
import { RAView } from './RA.view';
import { Form } from 'antd';
import {
    ThreadsRA,
    ThreadsRAPayload,
    useCurrDataNodeQuery,
    useUpdateCurrDataNodeMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';

type Props = {
    threadId: string;
    onClose: () => void;
};

type FormProps = ThreadsRA;

export const RA: React.FC<Props> = ({ threadId, onClose }) => {
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: currDataNode } = useCurrDataNodeQuery(threadId, {
        skip: !threadId,
    });
    console.log('currDataNode', currDataNode);


    // Mutations
    const [update, { isLoading }] = useUpdateCurrDataNodeMutation();

    useEffect(() => {
        if (currDataNode) {
            form.setFieldsValue({
                ...currDataNode.moveTable.config,
                sparkEngineParams: currDataNode.moveTable.config.sparkEngineParams ?? [{}],
            });
        }
    }, [currDataNode]);

    const onSubmit = async (data: FormProps) => {
        const payload: ThreadsRAPayload = {
            id: threadId,
            moveTable: {
                config: data,
            },
        };

        const res: any = await update(payload);

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
            <RAView
                isLoading={isLoading}
                role={role}
            />
        </UIForm>
    );
};
