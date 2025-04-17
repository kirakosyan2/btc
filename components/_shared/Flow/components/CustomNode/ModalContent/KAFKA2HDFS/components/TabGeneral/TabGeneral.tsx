import { Form } from 'antd';
import React, { useEffect } from 'react';

import { UIForm } from '@components/_shared/Form';

import {
    KAFKA2THDFSPayload,
    useGetKAFKA2HDFSQuery,
    useTypeToKAFKA2HDFSQuery,
    useUpdateKAFKA2HDFSMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';

import { TabGeneralView } from './TabGeneral.view';

type Props = {
    threadId: string;
};

type FormProps = {
    type: string;
    processingTime: number;
    timeoutSec: number;
};

export const TabGeneral: React.FC<Props> = ({ threadId }) => {
    const [form] = Form.useForm();

    // Query
    const { data: dataGeneral } = useGetKAFKA2HDFSQuery(threadId, {
        skip: !threadId,
    });

    const { data: typeKAFKA2HDFS } = useTypeToKAFKA2HDFSQuery(threadId, {
        skip: !threadId,
    });

    // Mutations
    const [updateGeneral] = useUpdateKAFKA2HDFSMutation();

    useEffect(() => {
        if (dataGeneral) {
            form.setFieldsValue({
                processingTime: dataGeneral.config.general?.processingTime,
                timeoutSec:
                    dataGeneral.config.general?.terminationStrategy?.params
                        ?.timeoutSec,
                type: dataGeneral.config.general?.terminationStrategy?.type,
            });
        }
    }, [dataGeneral]);

    const onSubmit = async ({
        type,
        timeoutSec,
        processingTime,
    }: FormProps) => {
        const payload: KAFKA2THDFSPayload = {
            id: threadId,
            general: {
                terminationStrategy: {
                    type,
                    params: {
                        timeoutSec,
                    },
                },
                processingTime,
            },
        };

        const res: any = await updateGeneral(payload);

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
            <TabGeneralView types={typeKAFKA2HDFS ?? []} />
        </UIForm>
    );
};
