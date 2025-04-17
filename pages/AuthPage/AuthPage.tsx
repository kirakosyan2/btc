import { AuthLogin } from '@components/AuthLogin';
import { PasswordRecovery } from '@components/PasswordRecovery';
import { PasswordReset } from '@components/PasswordReset';
import { Registration } from '@components/Registration';
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export const AuthPage: React.FC = () => {
    const location = useLocation();

    const Component = (): ReactNode => {
        switch (location.pathname) {
            case '/user/login':
                return <AuthLogin />;

            case '/user/registration':
                return <Registration />;

            case '/user/password/reset':
                return <PasswordReset />;

            case '/user/password/recovery':
                return <PasswordRecovery />;

            default:
                return null;
        }
    };

    return <Component />;
};
