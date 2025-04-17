import { UIForm } from '@components/_shared/Form'
import React, { useEffect } from 'react'
import { Form } from 'antd';
import { useAppSelector } from '@src/redux/store';
import { DataQualityCheck, UpdateStream, useUpdateStreamMutation } from '@src/redux/stream/stream';
import { notificationEasy } from '@src/utils';
import { TabDQCView } from './TabDQC.view';


type Props = {
    name: string;
    onClose: () => void;
    data?: DataQualityCheck;
    idDML?: number;
}

export const TabDQC: React.FC<Props> = ({ name, onClose, data, idDML }) => {

    const [form] = Form.useForm();
    const active = Form.useWatch('enabled', form);
    const { role } = useAppSelector((store) => store.auth);


    // Mutations
    const [updateStream, { isLoading: isLoadingUpdate }] = useUpdateStreamMutation();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
            });
        }
    }, [data]);

    const onSubmit = async (data: DataQualityCheck) => {
        const payload: UpdateStream = {
            id: String(idDML),
            app_config: {
                stages: {
                    dataQualityCheck: {
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
            <TabDQCView
                isLoadingUpdate={isLoadingUpdate}
                active={active}
                role={role}
                name={name} />
        </UIForm >
    )
};
