import React, { useEffect } from 'react';
import { CoalesceFilesView } from './CoalesceFiles.view';
import { UIForm } from '@components/_shared/Form';
import { Form } from 'antd';
import {
    ThreadsCoalesceFiles,
    ThreadsCoalesceFilesPayload,
    useCurrDataNodeQuery,
    useUpdateCurrDataNodeMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';

type Props = {
    threadId: string;
    onClose: () => void;
};

type FormProps = ThreadsCoalesceFiles;

export const CoalesceFiles: React.FC<Props> = ({ threadId, onClose }) => {
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: currDataNode } = useCurrDataNodeQuery(threadId, {
        skip: !threadId,
    });

    // Mutations
    const [update, { isLoading }] = useUpdateCurrDataNodeMutation();

    useEffect(() => {
        if (currDataNode) {
            form.setFieldsValue({
                ...currDataNode.coalesceFiles.config,
                sparkEngineParams: currDataNode.coalesceFiles.config.sparkEngineParams ?? [{}],
            });
        }
    }, [currDataNode]);

    const onSubmit = async (data: FormProps) => {
        const payload: ThreadsCoalesceFilesPayload = {
            id: threadId,
            coalesceFiles: {
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
            <CoalesceFilesView
                isLoading={isLoading}
                role={role}
            />
        </UIForm>
    );
};
