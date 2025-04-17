import { TourProps } from 'antd';
import React, { useRef } from 'react';

import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';

import styles from './styles.module.scss';

type Props = {
    isLoadingDevops: boolean;
    role: eUserRoles | null;
};
export const DevopsView: React.FC<Props> = ({ role, isLoadingDevops }) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refKA = useRef(null);
    const refName = useRef(null);
    const refKey = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refKA.current,
            nextButtonProps: {
                children: 'Далее',
            },
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refName.current,
            nextButtonProps: {
                children: 'Далее',
            },
            prevButtonProps: {
                children: 'Назад',
            },
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => refKey.current,
            nextButtonProps: {
                children: 'Закрыть',
            },
            prevButtonProps: {
                children: 'Назад',
            },
        },
    ];

    return (
        <>
            <UICard className={cx('container')}>
                <UITitle level={3} className={cx('title')}>
                    Devops
                </UITitle>

                <UIFlex className={cx('content')} vertical>
                    <div ref={refKA}>
                        <FormInput
                            formProps={{
                                name: 'ci_subsystem',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle
                                            level={5}
                                            className={cx('text')}>
                                            КЭ витрины
                                        </UITitle>
                                        <UITooltip title="Конфигурационный элемент (КЭ) - разрабатываемой витрины в service manager ">
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
                                className: cx('contentItem'),
                            }}
                            inputProps={{
                                placeholder: 'Введите КЭ витрины',
                                size: 'large',
                                disabled:
                                    isLoadingDevops ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>

                    <div ref={refName}>
                        <FormInput
                            formProps={{
                                name: 'sm_name',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle
                                            level={5}
                                            className={cx('text')}>
                                            Название витрины в service manager
                                        </UITitle>
                                        <UITooltip title="Если не знаете КЭ, обратитесь к архитектору вашей АС  (можно посмотреть в service manager по КЭ витрины)">
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
                                className: cx('contentItem'),
                            }}
                            inputProps={{
                                placeholder:
                                    'Введите название витрины в service manager',
                                size: 'large',
                                disabled:
                                    isLoadingDevops ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>

                    <div ref={refKey}>
                        <FormInput
                            formProps={{
                                name: 'sonar_project_key',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle
                                            level={5}
                                            className={cx('text')}>
                                            Ключ проекта Sonar Cube
                                        </UITitle>
                                        <UITooltip title="Ключ проекта Sonar Cube (sonar.projectKey)">
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
                                className: cx('contentItem'),
                            }}
                            inputProps={{
                                placeholder: 'Введите ключ проекта Sonar Cube',
                                size: 'large',
                                disabled:
                                    isLoadingDevops ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>
                </UIFlex>

                {isReference && (
                    <UITooltip
                        title="Описание блока"
                        className={cx('hintIcon')}>
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                onClick={openPopup}
                            />
                        </span>
                    </UITooltip>
                )}
            </UICard>

            {isReference && (
                <UITour open={isOpened} steps={steps} onClose={closePopup} />
            )}
        </>
    );
};
