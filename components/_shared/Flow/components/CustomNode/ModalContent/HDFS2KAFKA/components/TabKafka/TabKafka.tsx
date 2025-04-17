import { Form } from 'antd';
import React, { useEffect } from 'react';

import { UIForm } from '@components/_shared/Form';

import {
    THDFS2KAFKAPayload,
    useGetHDFS2KAFKAQuery,
    useUpdateHDFS2KAFKAMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';

import { TabKafkaView } from './TabKafka.view';

type Props = {
    threadId: string;
};

type FormProps = {
    msgPerSecond: number;
    secmanConfigPath: string;
    topic: string;
};

const TYPE_KAFKA = 'kafka_writer';

export const TabKafka: React.FC<Props> = ({ threadId }) => {
    const [form] = Form.useForm();

    // Query
    const { data: kafkaData } = useGetHDFS2KAFKAQuery(threadId, {
        skip: !threadId,
    });

    // Mutations
    const [updateKafkaNode] = useUpdateHDFS2KAFKAMutation();

    useEffect(() => {
        if (kafkaData) {
            form.setFieldsValue({
                ...kafkaData.config.kafka?.params,
            });
        }
    }, [kafkaData]);

    const onSubmit = async (data: FormProps) => {
        const payload: THDFS2KAFKAPayload = {
            id: threadId,
            kafka: {
                type: TYPE_KAFKA,
                params: data,
            },
        };

        const res: any = await updateKafkaNode(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Сохранено',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ?? 'Произошла ошибка при сохранении',
            });
        }
    };

    return (
        <UIForm layout="vertical" form={form} onFinish={onSubmit}>
            <TabKafkaView />
        </UIForm>
    );
};
