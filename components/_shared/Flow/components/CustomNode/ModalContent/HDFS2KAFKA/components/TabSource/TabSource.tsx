import { Form } from 'antd';
import React, { useEffect } from 'react';

import { UIForm } from '@components/_shared/Form';

import {
    THDFS2KAFKAPayload,
    useGetHDFS2KAFKAQuery,
    useUpdateHDFS2KAFKAMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';

import { TabSourceView } from './TabSource.view';

type Props = {
    threadId: string;
};

type FormProps = {
    sourceJsonValueColumn: string;
    sourceKeyColumn: string;
    sourceSql: string;
};

const TYPE_SOURCE = 'read_raw_json';

export const TabSource: React.FC<Props> = ({ threadId }) => {
    const [form] = Form.useForm();

    // Query
    const { data: dataSource } = useGetHDFS2KAFKAQuery(threadId, {
        skip: !threadId,
    });

    // Mutations
    const [updateKafkaNode] = useUpdateHDFS2KAFKAMutation();

    useEffect(() => {
        if (dataSource) {
            form.setFieldsValue({
                ...dataSource.config.source?.params,
            });
        }
    }, [dataSource]);

    const onSubmit = async (data: FormProps) => {
        const payload: THDFS2KAFKAPayload = {
            id: threadId,
            source: {
                type: TYPE_SOURCE,
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
            <TabSourceView />
        </UIForm>
    );
};
