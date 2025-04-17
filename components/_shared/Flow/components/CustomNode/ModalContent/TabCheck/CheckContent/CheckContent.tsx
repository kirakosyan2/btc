import { UIForm } from '@components/_shared/Form';
import React from 'react';
import { CheckContentView } from './CheckContent.view';
import { CheckUpdatePayload, useChecksQuery, useUpdateCheckMutation } from '@src/redux/DQC/DQC';
import { Form, App as AppConfig } from 'antd';
import { notificationEasy } from '@src/utils';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { changeDQCCheck, removeDQCCheck } from '@src/redux/DQC/DQCCheck.slice';

type Props = {
    threadId: string;
};

export const CheckContent: React.FC<Props> = ({ threadId }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const { role } = useAppSelector((store) => store.auth);
    const { data } = useAppSelector((store) => store.DQCCheck);

    // Query
    useChecksQuery(threadId, {
        skip: !threadId,
    });

    // Mutations
    const [updateCheck, { isLoading: isLoadingUpdate }] = useUpdateCheckMutation();

    const onSubmit = async () => {
        const payload: CheckUpdatePayload = {
            id: threadId,
            check_list: data,
        };

        const res: any = await updateCheck(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно сохранены',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при сохранении данных',
            });
        }
    };

    const onDeleteCheck = (id: string) => {
        dispatch(removeDQCCheck(id));
    };

    const onChangeFieldStatistic = (id: string, value: string | boolean, field: string) => {
        dispatch(
            changeDQCCheck({
                id,
                value,
                field,
            }),
        );
    };

    return (
        <UIForm
            layout="vertical"
            form={form}
            onFinish={onSubmit}
        >
            <AppConfig>
                <CheckContentView
                    data={data}
                    isLoadingUpdate={isLoadingUpdate}
                    role={role}
                    removeCheck={onDeleteCheck}
                    onChangeField={onChangeFieldStatistic}
                />
            </AppConfig>
        </UIForm>
    );
};
