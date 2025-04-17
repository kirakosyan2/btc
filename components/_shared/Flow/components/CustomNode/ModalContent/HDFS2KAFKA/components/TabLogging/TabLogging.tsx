import { Form } from 'antd';
import React, { useEffect } from 'react';

import { UIForm } from '@components/_shared/Form';

import {
    THDFS2KAFKAPayload,
    useGetHDFS2KAFKAQuery,
    useUpdateHDFS2KAFKAMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';

import { TabLoggingView } from './TabLogging.view';

type Props = {
    threadId: string;
};

type FormProps = {
    kafkaLogComment: string;
    logSchemaName: string;
    logTableName: string;
    shouldRecreateTable: boolean;
};

const TYPE_LOGGING = 'table_logger';

export const TabLogging: React.FC<Props> = ({ threadId }) => {
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
                ...kafkaData.config.logging?.params,
            });
        }
    }, [kafkaData]);

    const onSubmit = async (data: FormProps) => {
        const payload: THDFS2KAFKAPayload = {
            id: threadId,
            logging: {
                type: TYPE_LOGGING,
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
            <TabLoggingView />
        </UIForm>
    );
};
