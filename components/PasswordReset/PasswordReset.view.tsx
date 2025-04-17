import React from 'react';
import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITitle } from '@components/_shared/Title';
import { useStyles } from '@hooks/useStyles';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { UIFlex } from '@components/_shared/Flex';

type Props = {
    isPasswordLoading: boolean;
};

export const PasswordResetView: React.FC<Props> = ({ isPasswordLoading }) => {
    const cx = useStyles(styles);
    const navigate = useNavigate();

    const toLoginPage = () => navigate('/user/login');

    return (
        <>
            <UICard
                bordered={false}
                className={cx('container')}
            >
                <div className={cx('content')}>
                    <UITitle
                        level={3}
                        className={cx('title')}
                    >
                        Сброс пароля
                    </UITitle>
                    <FormInput
                        formProps={{
                            name: 'email',
                            label: 'Почта sigma',
                            rules: [
                                {
                                    required: true,
                                    message: 'Обязательное поле',
                                },
                            ],
                        }}
                        inputProps={{
                            placeholder: 'Введите почту sigma',
                            size: 'large',
                        }}
                    />
                    <UIFlex
                        justify="space-between"
                        gap={20}
                    >
                        <UIButton
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className={cx('btn')}
                            loading={isPasswordLoading}
                            disabled={isPasswordLoading}

                        >
                            Сбросить
                        </UIButton>
                        <UIButton
                            onClick={toLoginPage}
                            size="large"
                            className={cx('btn')}
                        >
                            Вход в B2C-SQL
                        </UIButton>
                    </UIFlex>
                </div>
            </UICard>
        </>
    );
};
