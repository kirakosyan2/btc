import { UIForm } from '@components/_shared/Form';
import React, { useEffect } from 'react';
import { STGView } from './STG.view';
import {
    ThreadsDmPreStage,
    ThreadsDmPreStagePayload,
    useCurrDataNodeQuery,
    useUpdateCurrDataNodeMutation,
} from '@src/redux/nodes/nodes';
import { Form } from 'antd';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';

type Props = {
    threadId: string;
    onClose: () => void;
};

type FormProps = ThreadsDmPreStage;

export const STG: React.FC<Props> = ({ threadId, onClose }) => {
    const isReference = location.pathname.includes('reference')
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
                ...currDataNode.dmPreStage.config,
                sparkEngineParams: currDataNode.dmPreStage.config.sparkEngineParams ?? [{}],
            });
        }
    }, [currDataNode]);

    const onSubmit = async (data: FormProps) => {
        const payload: ThreadsDmPreStagePayload = {
            id: threadId,
            dmPreStage: {
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
            <STGView
                isLoading={isLoading}
                role={role}
                isReference={isReference}
            />
        </UIForm>
    );
};
