import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UIAlert } from '@components/_shared/Alert';
import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormInputPassword } from '@components/_shared/Form/FormInputPassword';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { Icon } from '@components/_shared/Icon';
import { LinkButton } from '@components/_shared/LinkButton';
import { PasswordSrengthMeter } from '@components/_shared/PasswordSrengthMeter';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITypography } from '@components/_shared/Typography';

import { useStyles } from '@hooks/useStyles';

import { TransformTeamsList } from '@src/redux/teams/teams';
import {
    atLeastOneLowercase,
    atLeastOneNumeric,
    atLeastOneSpecialChar,
    atLeastOneUppercase,
    eightCharsOrMore,
} from '@src/utils/regexp';

import styles from './styles.module.scss';

type Props = {
    password: string;
    isLoading: boolean;
    teamsList: TransformTeamsList[];
    isLoadingTeamsList: boolean;
};

export const RegistrationView: React.FC<Props> = ({
    password = '',
    isLoading,
    teamsList,
    isLoadingTeamsList,
}) => {
    const cx = useStyles(styles);
    const navigate = useNavigate();

    const toBackLoginPage = () => navigate('/user/login');

    const passwordTracker = {
        uppercase: password.match(atLeastOneUppercase),
        lowercase: password.match(atLeastOneLowercase),
        number: password.match(atLeastOneNumeric),
        specialChar: password.match(atLeastOneSpecialChar),
        eightCharsOrGreater: password.match(eightCharsOrMore),
    };

    const percent =
        (Object.values(passwordTracker).filter((value) => value).length / 5) *
        100;

    return (
        <UICard bordered={false} className={cx('container')}>
            <UITitle level={3} className={cx('title')}>
                Регистрация
            </UITitle>
            <UIAlert
                className={cx('alert')}
                message={
                    <UITypography strong>
                        <UITypography>
                            После того, как вы заполните и отправите форму
                            кнопкой "Зарегистрировать", ваша регистрация
                            валидируется и активируется нами, необходимо
                            написать нам письмо на support_b2c-sql@sberbank.ru с
                            темой "B2C-SQL UI, активация аккаунта"с указанием
                            роли: Администратор команды, Разработчик или
                            Бизнес-аналитик. После чего Вам придёт письмо, что
                            учётная запись активирована и вы можете начать
                            использование B2C-SQL UI.
                        </UITypography>
                        Если у вас возникают проблемы при регистрации в
                        приложении, воспользуйтесь нашей{' '}
                        <LinkButton
                            to={
                                'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13436852633'
                            }>
                            инструкцией
                        </LinkButton>{' '}
                        по регистрации в B2C-SQL UI
                    </UITypography>
                }
            />
            <UIFlex justify="space-between" gap={50}>
                <FormInput
                    formProps={{
                        name: 'login',
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITitle level={5}>Логин</UITitle>
                                <UITooltip title="Логин может быть любым, но рекомендуется, чтобы по возможности он совпадал с логином почты во избежание путаницы. Регистр букв в логине не учитывается">
                                    <span>
                                        <Icon
                                            className={cx('icon')}
                                            type="question-circle-outlined"
                                            size="xs"
                                        />
                                    </span>
                                </UITooltip>
                            </div>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите логин',
                        size: 'large',
                    }}
                />
                <FormSelect
                    formProps={{
                        name: 'team',
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITitle className={cx('icon')} level={5}>
                                    Команда пользователя
                                </UITitle>
                                <UITooltip title="Если в выпадающем списке Команда пользователя вы не нашли свою команду, необходимо написать нам письмо на support_b2c-sql@sberbank.ru с темой WEB UI, новая команда">
                                    <span>
                                        <Icon
                                            className={cx('icon-team')}
                                            type="question-circle-outlined"
                                            size="xs"
                                        />
                                    </span>
                                </UITooltip>
                            </div>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],

                        className: cx('containerItem'),
                    }}
                    selectProps={{
                        placeholder: 'Выберите команду',
                        options: teamsList,
                        size: 'large',
                        loading: isLoadingTeamsList,
                    }}
                />
            </UIFlex>
            <UIFlex justify="space-between" gap={50}>
                <FormInput
                    formProps={{
                        name: 'name',
                        label: <UITitle level={5}>Имя пользователя</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите имя',
                        size: 'large',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'lastName',
                        label: (
                            <UITitle level={5}>Фамилия пользователя</UITitle>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите фамилию',
                        size: 'large',
                    }}
                />
            </UIFlex>
            <UIFlex justify="space-between" gap={50}>
                <FormInput
                    formProps={{
                        name: 'sigmaEmail',
                        label: (
                            <UITitle level={5}>
                                Почта сигма пользователя
                            </UITitle>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите почту сигма',
                        size: 'large',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'omegaEmail',
                        label: (
                            <UITitle level={5}>
                                Почта омега пользователя
                            </UITitle>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите почту омега',
                        size: 'large',
                    }}
                />
            </UIFlex>
            <UIFlex justify="space-between" gap={50}>
                <FormInput
                    formProps={{
                        name: 'sigmaLogin',
                        label: (
                            <UITitle level={5}>
                                Логин сигма пользователя
                            </UITitle>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите логин сигма',
                        size: 'large',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'omegaLogin',
                        label: (
                            <UITitle level={5}>
                                Логин омега пользователя
                            </UITitle>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите логин омега',
                        size: 'large',
                    }}
                />
            </UIFlex>
            <UIFlex
                justify="space-between"
                gap={50}
                style={{
                    marginBottom: '20px',
                }}>
                <UIFlex style={{ width: '100%' }} vertical>
                    {/* TODO: переделать и вынести в отдельную функцию */}
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
                                            !password.match(atLeastOneUppercase)
                                                ?.length
                                        ) {
                                            return Promise.reject(
                                                new Error(
                                                    'Пароль должен содержать хотя бы одну заглавную букву'
                                                )
                                            );
                                        }

                                        if (
                                            value &&
                                            !password.match(atLeastOneLowercase)
                                                ?.length
                                        ) {
                                            return Promise.reject(
                                                new Error(
                                                    'Пароль должен содержать хотя бы одну прописную букву'
                                                )
                                            );
                                        }

                                        if (
                                            value &&
                                            !password.match(atLeastOneNumeric)
                                                ?.length
                                        ) {
                                            return Promise.reject(
                                                new Error(
                                                    'Пароль должен содержать хотя бы одну цифру'
                                                )
                                            );
                                        }

                                        if (
                                            value &&
                                            !password.match(
                                                atLeastOneSpecialChar
                                            )?.length
                                        ) {
                                            return Promise.reject(
                                                new Error(
                                                    'Пароль должен содержать хотя бы один спец символ'
                                                )
                                            );
                                        }

                                        if (
                                            value &&
                                            !password.match(eightCharsOrMore)
                                                ?.length
                                        ) {
                                            return Promise.reject(
                                                new Error(
                                                    'Пароль должен быть не менее 8 символов'
                                                )
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

                <UIFlex style={{ width: '100%' }}>
                    <FormInputPassword
                        formProps={{
                            name: 'passwordRecovery',
                            label: (
                                <UITitle level={5}>Повторите пароль</UITitle>
                            ),
                            rules: [
                                {
                                    required: true,
                                    message: 'Обязательное поле',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                'Новый пароль не соответствует введеному'
                                            )
                                        );
                                    },
                                }),
                            ],
                            className: cx('containerItem'),
                            style: {
                                marginBottom: 0,
                            },
                        }}
                        inputProps={{
                            placeholder: 'Повторите пароль',
                            size: 'large',
                        }}
                    />
                </UIFlex>
            </UIFlex>
            <UIFlex justify="space-between" gap={50}>
                <UIButton
                    type="primary"
                    htmlType="submit"
                    className={cx('btn')}
                    size="large"
                    loading={isLoading}
                    disabled={isLoading}>
                    Зарегистрироваться
                </UIButton>

                <UIButton
                    onClick={toBackLoginPage}
                    className={cx('btn')}
                    size="large">
                    Войти
                </UIButton>
            </UIFlex>
        </UICard>
    );
};
