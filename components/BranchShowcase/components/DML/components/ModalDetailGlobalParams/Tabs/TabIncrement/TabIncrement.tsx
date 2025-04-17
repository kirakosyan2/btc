import React, { useEffect } from 'react';
import { TabIncrementView } from './TabIncrement.view';
import { UIForm } from '@components/_shared/Form';
import { Increment, UpdateStream, useUpdateStreamMutation } from '@src/redux/stream/stream';
import { Form } from 'antd';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';

type Props = {
    data?: Increment;
    idDML?: number;
    name: string;
    onClose: () => void;
};

export const TabIncrement: React.FC<Props> = ({ name, data, idDML, onClose }) => {
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    const active = Form.useWatch('enabled', form);

    // Mitations
    const [updateStream, { isLoading: isLoaingUpdateStream }] = useUpdateStreamMutation();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
            });
        }
    }, [data]);

    const onSubmit = async (data: Increment) => {
        const payload: UpdateStream = {
            id: String(idDML),
            app_config: {
                stages: {
                    getIncrement: {
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
            onFinish={onSubmit}
            layout="vertical"
            form={form}
        >
            <TabIncrementView
                name={name}
                isLoaingUpdateStream={isLoaingUpdateStream}
                active={active}
                role={role}
            />
        </UIForm>
    );
};
