import React from 'react';

import { ModalPasswordResetSuccess } from '@components/ModalPasswordResetSuccess';
import { UIForm } from '@components/_shared/Form';
import { usePopupControls } from '@hooks/usePopupControls';
import { useResetPasswordEmailMutation } from '@src/redux/auth/auth';
import { notificationEasy } from '@src/utils';

import { PasswordResetView } from './PasswordReset.view';

type FormProps = {
    email: string;
};

export const PasswordReset: React.FC = () => {
    const { isOpened, closePopup, openPopup } = usePopupControls();
    const [updatePassword, { isLoading: isPasswordLoading }] =
        useResetPasswordEmailMutation();

    const onSubmit = async ({ email }: FormProps) => {
        const res: any = await updatePassword({ email });
        if (res?.error) {
            notificationEasy({
                type: 'error',
                content:
                    res?.error?.data?.detail ??
                    'Произошла ошибка при отправке письма, попробуйте снова',
            });
        } else {
            notificationEasy({
                content:
                    'На вашу почту отправлено письмо с инструкцией по смене пароля',
            });
            openPopup();
        }
    };

    return (
        <>
            <UIForm onFinish={onSubmit} layout="vertical">
                <PasswordResetView isPasswordLoading={isPasswordLoading} />
            </UIForm>

            <ModalPasswordResetSuccess open={isOpened} onClose={closePopup} />
        </>
    );
};
