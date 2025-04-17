import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITitle } from '@components/_shared/Title';
import React from 'react';
import { useStyles } from '@hooks/useStyles';
import styles from './styles.module.scss';

import { TransformDevelopersList } from '@src/redux/developers/developers';
import { UITooltip } from '@components/_shared/Tooltip';
import { Icon } from '@components/_shared/Icon';
import { eUserRoles } from '@src/redux/auth/auth';

type Props = {
    developersList: TransformDevelopersList[];
    isLoadingDevelopers: boolean;
    isLoadingUpdatePSI: boolean;
    role: eUserRoles | null;
};

export const ParticipantPSIView: React.FC<Props> = ({ role }) => {
    const cx = useStyles(styles);

    return (
        <>
            <UIFlex
                vertical
                className={cx('inputContainer')}
            >
                <FormInput
                    formProps={{
                        name: 'product_owner',

                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITitle
                                    level={5}
                                    className={cx('text')}
                                >
                                    Логин SIGMA владельца продукта
                                </UITitle>
                                {/* <UITooltip title="">
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                            className={cx('icon')}
                                        />
                                    </span>
                                </UITooltip> */}
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
                        disabled: [eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        ),
                        size: 'large',
                        placeholder: 'Выберите логин  организатора (владельца продукта)',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'fullNameDKA',
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITitle level={5}>
                                    Логин SIGMA архитектора ДКА
                                </UITitle>
                                <UITooltip title="для АС ГАНЗА Ивашкин Петр Александрович">
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                            className={cx('icon')}
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
                        size: 'large',

                        placeholder: 'Введите логин SIGMA архитектора ДКА',
                    }}
                />

                <FormInput
                    formProps={{
                        name: 'fullNameRM',
                        label: <UITitle level={5}>Логин SIGMA релизного менеджера</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите логин SIGMA релизного менеджера',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'fullNameLS',
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITitle level={5}>
                                    Логин SIGMA администратора 2ЛС
                                </UITitle>
                                <UITooltip title="для АС ГАНЗА Юрин Григорий Юрьевич">
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                            className={cx('icon')}
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
                        size: 'large',
                        placeholder: 'Введите логин SIGMA 2ЛС',
                    }}
                />

                <FormInput
                    formProps={{
                        name: 'fullNameApproving',
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITitle level={5}>
                                    Логин SIGMA утверждающего
                                </UITitle>
                                <UITooltip title="для АС ГАНЗА Васев Владимир Сергеевич">
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                            className={cx('icon')}
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
                        size: 'large',
                        placeholder: 'Введите логин SIGMA утверждающего',
                    }}
                />
            </UIFlex>
        </>
    );
};
