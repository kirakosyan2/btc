import { Form } from 'antd';
import React, { useEffect } from 'react';

import { UIForm } from '@components/_shared/Form';

import {
    KAFKA2THDFSPayload,
    useGetKAFKA2HDFSQuery,
    useUpdateKAFKA2HDFSMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';

import { TabHDFSView } from './TabHDFS.view';

type Props = {
    threadId: string;
};

type FormProps = {
    tableName: string;
    schemaName: string;
    tableFormat: string;
    checkPointLocation: string;
    columnNameWithDate: string;
    columnNameForPartition: string;
};

const TYPE_HDFS = 'hdfs_write';

export const TabHDFS: React.FC<Props> = ({ threadId }) => {
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
                ...dataHDFS.config.hdfs?.params,
            });
        }
    }, [dataHDFS]);

    const onSubmit = async (data: FormProps) => {
        const payload: KAFKA2THDFSPayload = {
            id: threadId,
            hdfs: {
                type: TYPE_HDFS,
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
            <TabHDFSView />
        </UIForm>
    );
};
