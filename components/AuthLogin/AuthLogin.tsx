import { Form } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';

import { StorageService } from '@services/index';

import { useLoginMutation } from '@src/redux/auth/auth';
import { notificationEasy } from '@src/utils';

import { AuthLoginView } from './AuthLogin.view';

type FormProps = {
    login: string;
    password: string;
};

const storageService = StorageService.getInstance();

export const AuthLogin: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Mutations
    const [autentification, { isLoading }] = useLoginMutation();

    const onSubmit = async ({ login, password }: FormProps) => {
        const payload = {
            username: login,
            password,
        };

        const res: any = await autentification(payload);

        if (res?.data) {
            const authorized = {
                authorized: true,
                access_token: res.data.access,
                refresh_token: res.data.refresh,
                role: res.data.user_role,
            };

            storageService.setItem('authorized', JSON.stringify(authorized));
            navigate('/initiative', { replace: true });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при авторизации',
            });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.submit();
        }
    };

    return (
        <UIForm
            layout="vertical"
            form={form}
            onFinish={onSubmit}
            onKeyDown={handleKeyDown}>
            <AuthLoginView isLoading={isLoading} />
        </UIForm>
    );
};
