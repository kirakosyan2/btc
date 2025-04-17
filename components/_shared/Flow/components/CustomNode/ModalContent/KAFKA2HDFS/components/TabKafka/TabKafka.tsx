import { Form } from 'antd';
import React, { useEffect } from 'react';

import { UIForm } from '@components/_shared/Form';

import {
    KAFKA2THDFSPayload,
    useGetKAFKA2HDFSQuery,
    useUpdateKAFKA2HDFSMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';

import { TabKafkaView } from './TabKafka.view';

type Props = {
    threadId: string;
};

type FormProps = {
    topic: string;
    msgPerSecond: number;
    kafkaConfigPath: string;
    awaitTermination: boolean;
    secmanConfigPath: string;
};

const TYPE_KAFKA = 'kafka_reader';

export const TabKafka: React.FC<Props> = ({ threadId }) => {
    const [form] = Form.useForm();

    // Query
    const { data: dataHDFS } = useGetKAFKA2HDFSQuery(threadId, {
        skip: !threadId,
    });

    // Mutations
    const [updateHDFS] = useUpdateKAFKA2HDFSMutation();

    useEffect(() => {
        if (dataHDFS) {
            form.setFieldsValue({
                ...dataHDFS.config.kafka?.params,
            });
        }
    }, [dataHDFS]);

    const onSubmit = async (data: FormProps) => {
        const payload: KAFKA2THDFSPayload = {
            id: threadId,
            kafka: {
                type: TYPE_KAFKA,
                params: data,
            },
        };

        const res: any = await updateHDFS(payload);

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
