import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { FormInput } from '@components/_shared/Form/FormInput';
import { LinkButton } from '@components/_shared/LinkButton';
import { UITitle } from '@components/_shared/Title';
import { useStyles } from '@hooks/useStyles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { UIFlex } from '@components/_shared/Flex';
import { FormInputPassword } from '@components/_shared/Form/FormInputPassword';

type Props = {
    isLoading: boolean;
};
export const AuthLoginView: React.FC<Props> = ({ isLoading }) => {
    const cx = useStyles(styles);
    const navigate = useNavigate();

    const toRegisterPage = () => navigate('/user/registration');

    return (
        <UICard
            bordered={false}
            className={cx('container')}
        >
            <UITitle
                level={3}
                className={cx('title')}
            >
                Вход
            </UITitle>
            <FormInput
                formProps={{
                    name: 'login',
                    label: 'Логин',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    placeholder: 'Введите логин',
                    size: 'large',
                }}
            />
            {/* TODO: Добавить регулярку на пароль */}
            <FormInputPassword
                formProps={{
                    name: 'password',
                    label: 'Пароль',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    placeholder: 'Введите пароль',
                    size: 'large',
                }}
            />

            <UIFlex
                justify="space-between"
                gap={10}
            >
                <UIButton
                    type="primary"
                    htmlType="submit"
                    className={cx('btn')}
                    size="large"
                    disabled={isLoading}
                    loading={isLoading}
                >
                    Вход
                </UIButton>
                <UIButton
                    onClick={toRegisterPage}
                    className={cx('btn')}
                    size="large"
                >
                    Регистрация
                </UIButton>
            </UIFlex>
            <LinkButton
                to="/user/password/reset"
                // to={''}
                className={cx('link')}
            >
                Cброс пароля
            </LinkButton>
        </UICard>
    );
};
