import React from 'react';
import { UIForm } from '@components/_shared/Form';
import { PasswordRecoveryView } from './PasswordRecovery.view';
import { useResetPasswordConfirmMutation } from '@src/redux/auth/auth';
import { notificationEasy, notificationWithBtn } from '@src/utils';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { useAppSearchParams } from '@hooks/useAppSearchParams';

type FormProps = {
    password: string;
    uid: string;
    token: string;
};

type PropsValuesForParams = {
    token: string;
    uid: string;
};

export const PasswordRecovery: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { getValuesForParams } = useAppSearchParams<PropsValuesForParams>();

    const token = getValuesForParams<string>('token');
    const uid = getValuesForParams<string>('uid');
    const password = Form.useWatch('password', form);

    // Mutatuions
    const [updatePassword, { isLoading }] = useResetPasswordConfirmMutation();

    const onSubmit = async ({ password, }: FormProps) => {
        const payload = {
            new_password: password,
            uid,
            token,
        };

        const res: any = await updatePassword(payload);

        if (res?.error?.data) {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при изменении пароля',
            });

        } else {
            notificationWithBtn({
                type: 'success',
                title: 'Пароль сохранен',
                btnText: 'Закрыть',
                content: 'Ваш пароль успешно изменен',
                btnType: 'primary',
            });

            navigate('/user/login');
        }
    };

    return (
        <UIForm
            onFinish={onSubmit}
            layout="vertical"
            form={form}
        >
            <PasswordRecoveryView
                newPassword={password}
                isLoading={isLoading}
            />
        </UIForm>
    );
};
