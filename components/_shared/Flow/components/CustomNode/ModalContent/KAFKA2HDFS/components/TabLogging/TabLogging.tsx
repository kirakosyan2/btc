import { Form } from 'antd';
import React, { useEffect } from 'react';

import { UIForm } from '@components/_shared/Form';

import {
    KAFKA2THDFSPayload,
    useGetKAFKA2HDFSQuery,
    useUpdateKAFKA2HDFSMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';

import { TabLoggingView } from './TabLogging.view';

type Props = {
    threadId: string;
};

type FormProps = {
    modeKafkaLogging: string;
};

const TYPE_LOGGING = 'stdout_logger';

export const TabLogging: React.FC<Props> = ({ threadId }) => {
    const [form] = Form.useForm();

    // Query
    const { data: dataLogging } = useGetKAFKA2HDFSQuery(threadId, {
        skip: !threadId,
    });

    // Mutations
    const [updateLogging] = useUpdateKAFKA2HDFSMutation();

    useEffect(() => {
        if (dataLogging) {
            form.setFieldsValue({
                ...dataLogging.config.logging?.params,
            });
        }
    }, [dataLogging]);

    const onSubmit = async (data: FormProps) => {
        const payload: KAFKA2THDFSPayload = {
            id: threadId,
            logging: {
                type: TYPE_LOGGING,
                params: data,
            },
        };

        const res: any = await updateLogging(payload);

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
