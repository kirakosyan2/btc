import React, { useEffect } from 'react';
import { TabHistoryView } from './TabHistory.view';
import { UIForm } from '@components/_shared/Form';
import { Form } from 'antd';
import { Historicity, UpdateStream, useUpdateStreamMutation } from '@src/redux/stream/stream';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';

type Props = {
    data?: Historicity;
    idDML?: number;
    name: string;
    onClose: () => void;
};

export const TabHistory: React.FC<Props> = ({ data, idDML, name, onClose }) => {
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);
    const active = Form.useWatch('enabled', form);

    // Mutations
    const [updateStream, { isLoading: isLoadingUpdate }] = useUpdateStreamMutation();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
            });
        }
    }, [data]);

    const onSubmit = async (data: Historicity) => {
        const payload: UpdateStream = {
            id: String(idDML),
            app_config: {
                stages: {
                    historicity: {
                        ...data,
                    },
                },
            },
        };

        const res: any = await updateStream(payload);

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
            <TabHistoryView
                name={name}
                isLoadingUpdate={isLoadingUpdate}
                active={active}
                role={role}
            />
        </UIForm>
    );
};
