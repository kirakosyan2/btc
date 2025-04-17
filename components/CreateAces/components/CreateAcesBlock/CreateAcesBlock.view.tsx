import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { Icon } from '@components/_shared/Icon';
import { UITooltip } from '@components/_shared/Tooltip';
import { UIButton } from '@components/_shared/Button';
import { TransformTeamsList } from '@src/redux/teams/teams';

type Props = {
    teamsList: TransformTeamsList[];
    isLoadingTeams: boolean;
    isLoadingCreateAces: boolean;
};
export const CreateAcesBlockView: React.FC<Props> = ({
    // teamsList,
    isLoadingTeams,
    isLoadingCreateAces,
}) => {
    const cx = useStyles(styles);

    return (
        <UICard className={cx('container')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Создание нового ТУЗа
            </UITitle>

            <UIFlex
                className={cx('content')}
                gap={40}
            >
                <FormInput
                    formProps={{
                        name: 'team',
                        label: <UITitle level={5}>Команда</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        // value: ,
                        // options: teamsList,
                        // loading: isLoadingTeams,
                        disabled: !!isLoadingTeams,
                        readOnly: true,
                    }}
                />

                <FormInput
                    formProps={{
                        name: 'aces',
                        label: <UITitle level={5}>Название ТУЗа</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'ведите название ТУЗа',
                        size: 'large',
                    }}
                />
            </UIFlex>

            <UITitle
                className={cx('title', 'prefix')}
                level={3}
            >
                Префиксы
                <UITooltip title="Префиксы - это значения, которые подставляются в конфиги. В зависимости от стенда префикс может отличаться.">
                    <span>
                        <Icon
                            type="question-circle-outlined"
                            size="xs"
                        />
                    </span>
                </UITooltip>
            </UITitle>

            <UIFlex
                className={cx('prefix-container')}
                gap={40}
            >
                <FormInput
                    formProps={{
                        name: 'base',
                        label: <UITitle level={5}>Префикс BASE</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите BASE префикс',
                        size: 'large',
                    }}
                />

                <FormInput
                    formProps={{
                        name: 'dev',
                        label: <UITitle level={5}>Префикс DEV</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите DEV префикс',
                        size: 'large',
                    }}
                />

                <FormInput
                    formProps={{
                        name: 'ift',
                        label: <UITitle level={5}>Префикс IFT</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите IFT префикс',
                        size: 'large',
                    }}
                />
            </UIFlex>

            <UIFlex gap={40}>
                <FormInput
                    formProps={{
                        name: 'uat',
                        label: <UITitle level={5}>Префикс UAT</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите UAT префикс',
                        size: 'large',
                    }}
                />

                <FormInput
                    formProps={{
                        name: 'psi',
                        label: <UITitle level={5}>Префикс PSI</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите PSI префикс',
                        size: 'large',
                    }}
                />

                <FormInput
                    formProps={{
                        name: 'prom',
                        label: <UITitle level={5}>Префикс PROM</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите PROM префикс',
                        size: 'large',
                    }}
                />
            </UIFlex>

            <UIFlex justify="center">
                <UIButton
                    htmlType="submit"
                    type="primary"
                    className={cx('btn')}
                    size="large"
                    loading={isLoadingCreateAces}
                    disabled={isLoadingCreateAces}
                >
                    Создать
                </UIButton>
            </UIFlex>
        </UICard>
    );
};
