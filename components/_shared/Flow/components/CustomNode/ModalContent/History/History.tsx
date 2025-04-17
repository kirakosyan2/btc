import { UIForm } from '@components/_shared/Form';
import React, { useEffect } from 'react';
import { HistoryView } from './History.view';
import { Form } from 'antd';
import {
    ThreadsHistoricity,
    ThreadsHistoricityPayload,
    useCurrDataNodeQuery,
    useUpdateCurrDataNodeMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';

type Props = {
    threadId: string;
    onClose: () => void;
};

type FormProps = ThreadsHistoricity;

export const History: React.FC<Props> = ({ threadId, onClose }) => {
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
                ...currDataNode.historicity.config,
                sparkEngineParams: currDataNode.historicity.config.sparkEngineParams ?? [{}],
            });
        }
    }, [currDataNode]);

    const onSubmit = async (data: FormProps) => {
        const payload: ThreadsHistoricityPayload = {
            id: threadId,
            historicity: {
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
            onFinish={onSubmit}
            form={form}
        >
            <HistoryView
                isLoading={isLoading}
                role={role}
            />
        </UIForm>
    );
};
