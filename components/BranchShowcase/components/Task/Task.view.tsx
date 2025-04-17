import { TourProps } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';
import { TransformDevelopersList } from '@src/redux/developers/developers';
import { TransformOptionsList } from '@src/redux/types/type';

import styles from './styles.module.scss';

type Props = {
    developersList: TransformDevelopersList[];
    isLoadingDevelopers: boolean;
    taskStatusList: TransformOptionsList[];
    isLoadingData: boolean;
    isLoadingStatus: boolean;
    role: eUserRoles | null;
};

export const TaskView: React.FC<Props> = ({
    developersList,
    isLoadingDevelopers,
    taskStatusList,
    isLoadingData,
    isLoadingStatus,
    role,
}) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const navigate = useNavigate();
    const isReference = location.pathname.includes('reference');

    const refDatamart = useRef(null);
    const refBranch = useRef(null);
    const refDeveloper = useRef(null);
    const refStatus = useRef(null);
    const refDate = useRef(null);
    const refBtn = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refDatamart.current,
            nextButtonProps: {
                children: 'Далее',
            },
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => refBranch.current,
            nextButtonProps: {
                children: 'Далее',
            },
            prevButtonProps: {
                children: 'Назад',
            },
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refDeveloper.current,
            nextButtonProps: {
                children: 'Далее',
            },
            prevButtonProps: {
                children: 'Назад',
            },
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refStatus.current,
            nextButtonProps: {
                children: 'Далее',
            },
            prevButtonProps: {
                children: 'Назад',
            },
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refDate.current,
            nextButtonProps: {
                children: 'Далее',
            },
            prevButtonProps: {
                children: 'Назад',
            },
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refBtn.current,
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
                <UITitle className={cx('title')} level={3}>
                    Задача
                </UITitle>
                <UIFlex className={cx('content')} gap={40}>
                    <div ref={refDatamart} className={cx('contentItem')}>
                        <FormInput
                            formProps={{
                                name: 'showcase',
                                label: (
                                    <UITitle
                                        className={cx('contentItem')}
                                        level={5}>
                                        Витрина
                                    </UITitle>
                                ),
                                className: cx('contentItem'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите название',
                                size: 'large',
                                disabled:
                                    isLoadingData ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div ref={refBranch} className={cx('contentItem')}>
                        <FormInput
                            formProps={{
                                name: 'branch',
                                label: (
                                    <UITitle
                                        className={cx('contentItem')}
                                        level={5}>
                                        Ветка
                                    </UITitle>
                                ),
                                className: cx('contentItem'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите название',
                                readOnly: true,
                                size: 'large',
                                disabled:
                                    isLoadingData ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>

                    <div ref={refDeveloper} className={cx('contentItem')}>
                        <FormSelect
                            formProps={{
                                name: 'developer_name',
                                label: (
                                    <UITitle
                                        className={cx('contentItem')}
                                        level={5}>
                                        Разработчик
                                    </UITitle>
                                ),
                                className: cx('contentItem'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            selectProps={{
                                options: developersList,
                                loading: isLoadingDevelopers,
                                disabled:
                                    isLoadingDevelopers ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                                size: 'large',
                            }}
                        />
                    </div>
                </UIFlex>
                <UIFlex className={cx('content')} gap={40}>
                    <div ref={refStatus} className={cx('contentItem')}>
                        <FormSelect
                            formProps={{
                                name: 'load_status',
                                label: (
                                    <UITitle
                                        className={cx('contentItem')}
                                        level={5}>
                                        Статус задачи
                                    </UITitle>
                                ),
                                className: cx('contentItem'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            selectProps={{
                                options: taskStatusList,
                                disabled:
                                    isLoadingStatus ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                                size: 'large',
                            }}
                        />
                    </div>

                    <div ref={refDate} className={cx('contentItem')}>
                        <FormInput
                            formProps={{
                                name: 'start_date_time',
                                label: (
                                    <UITitle
                                        className={cx('contentItem')}
                                        level={5}>
                                        Дата начала
                                    </UITitle>
                                ),
                                className: cx('contentItem'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                size: 'large',
                                readOnly: true,
                                disabled:
                                    isLoadingData ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>
                </UIFlex>
                <UIFlex gap={40} justify="center">
                    <div ref={refBtn}>
                        <UIButton
                            type="default"
                            className={cx('btn')}
                            size="large"
                            onClick={() => navigate(-1)}>
                            Перейти к ETL потоку/витрине
                        </UIButton>
                    </div>
                </UIFlex>
                {isReference && (
                    <UITooltip title="Описание блока" className={cx('icon')}>
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
