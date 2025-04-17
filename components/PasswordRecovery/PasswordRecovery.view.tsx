import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';
import { useStyles } from '@hooks/useStyles';
import React from 'react';
import styles from './styles.module.scss';
import { UIFlex } from '@components/_shared/Flex';
import { PasswordSrengthMeter } from '@components/_shared/PasswordSrengthMeter';
import { FormInputPassword } from '@components/_shared/Form/FormInputPassword';
import {
    atLeastOneLowercase,
    atLeastOneNumeric,
    atLeastOneSpecialChar,
    atLeastOneUppercase,
    eightCharsOrMore,
} from '@src/utils/regexp';

type Props = {
    isLoading: boolean;
    newPassword: string;
};

export const PasswordRecoveryView: React.FC<Props> = ({ isLoading, newPassword }) => {
    const cx = useStyles(styles);
    const passwordTracker = {
        uppercase: (newPassword ?? '').match(atLeastOneUppercase),
        lowercase: (newPassword ?? '').match(atLeastOneLowercase),
        number: (newPassword ?? '').match(atLeastOneNumeric),
        specialChar: (newPassword ?? '').match(atLeastOneSpecialChar),
        eightCharsOrGreater: (newPassword ?? '').match(eightCharsOrMore),
    };
    const percent = (Object.values(passwordTracker).filter((value) => value).length / 5) * 100;

    return (
        <UICard
            bordered={false}
            className={cx('container')}
        >
            <div className={cx('content')}>
                <UITitle
                    level={2}
                    className={cx('title')}
                >
                    Восстановление пароля
                </UITitle>
                <UIFlex
                    style={{ width: '100%' }}
                    vertical
                >
                    <FormInputPassword
                        formProps={{
                            name: 'password',
                            label: <UITitle level={5}>Введите пароль</UITitle>,
                            rules: [
                                {
                                    required: true,
                                    message: 'Обязательное поле',
                                },
                                {
                                    validator: async (_, value) => {
                                        if (
                                            value &&
                                            !newPassword.match(atLeastOneUppercase)?.length
                                        ) {
                                            return Promise.reject(
                                                new Error(
                                                    'Пароль должен содержать хотя бы одну заглавную букву',
                                                ),
                                            );
                                        }
                                        if (
                                            value &&
                                            !newPassword.match(atLeastOneLowercase)?.length
                                        ) {
                                            return Promise.reject(
                                                new Error(
                                                    'Пароль должен содержать хотя бы одну прописную букву',
                                                ),
                                            );
                                        }
                                        if (
                                            value &&
                                            !newPassword.match(atLeastOneNumeric)?.length
                                        ) {
                                            return Promise.reject(
                                                new Error(
                                                    'Пароль должен содержать хотя бы одну цифру',
                                                ),
                                            );
                                        }
                                        if (
                                            value &&
                                            !newPassword.match(atLeastOneSpecialChar)?.length
                                        ) {
                                            return Promise.reject(
                                                new Error(
                                                    'Пароль должен содержать хотя бы один спец символ',
                                                ),
                                            );
                                        }
                                        if (value && !newPassword.match(eightCharsOrMore)?.length) {
                                            return Promise.reject(
                                                new Error('Пароль должен быть не менее 8 символов'),
                                            );
                                        }
                                    },
                                },
                            ],
                            className: cx('containerItem'),
                            style: {
                                marginBottom: 0,
                            },
                        }}
                        inputProps={{
                            placeholder: 'Введите пароль',
                            size: 'large',
                        }}
                    />
                    <PasswordSrengthMeter percent={percent} />
                </UIFlex>
                <UIFlex
                    style={{ width: '100%' }}
                    vertical
                >
                    <FormInputPassword
                        formProps={{
                            name: 'passwordRecovery',
                            label: <UITitle level={5}>Повторите пароль</UITitle>,
                            rules: [
                                {
                                    required: true,
                                    message: 'Обязательное поле',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error('Новый пароль не соответствует введеному'),
                                        );
                                    },
                                }),
                            ],
                            className: cx('containerItem'),
                        }}
                        inputProps={{
                            placeholder: 'Повторите пароль',
                            size: 'large',
                        }}
                    />
                </UIFlex>
                <UIFlex justify="centre">
                    <UIButton
                        className={cx('btn')}
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        Сохранить
                    </UIButton>
                </UIFlex>
            </div>
        </UICard>
    );
};
