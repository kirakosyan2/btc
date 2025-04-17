import React, { useEffect } from 'react';
import { TabSparkView } from './TabSpark.view';
import { UIForm } from '@components/_shared/Form';
import {
    SparkParams,
    SparkParamsPayload,
    useSparksQuery,
    useUpdateSparkMutation,
} from '@src/redux/DQC/DQC';
import { notificationEasy } from '@src/utils';
import { Form } from 'antd';
import { useAppSelector } from '@src/redux/store';

type Props = {
    threadId: string;
    onClose: () => void;
};

type FormProps = {
    spark_engine_params: SparkParams[];
};

export const TabSpark: React.FC<Props> = ({ threadId }) => {
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: sparks } = useSparksQuery(threadId, {
        skip: !threadId,
    });

    // Mutatios
    const [updateSpark, { isLoading: isLoadingUpdateSpark }] = useUpdateSparkMutation();

    useEffect(() => {
        if (sparks) {
            form.setFieldsValue({
                spark_engine_params: sparks,
            });
        }
    }, [sparks]);

    const onSubmit = async (data: FormProps) => {
        const payload: SparkParamsPayload = {
            id: threadId,
            sparkEngineParams: data.spark_engine_params,
        };
        const res: any = await updateSpark(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно сохранены',
            });
        } else {
            notificationEasy({
                content: 'Произошла ошибка при сохранении данных',
                type: 'error',
            });
        }
    };

    return (
        <UIForm
            form={form}
            onFinish={onSubmit}
        >
            <TabSparkView
                isLoadingUpdateSpark={isLoadingUpdateSpark}
                role={role}
            />
        </UIForm>
    );
};
