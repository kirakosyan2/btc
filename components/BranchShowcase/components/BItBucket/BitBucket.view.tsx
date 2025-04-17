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
    isLoadingUpdate: boolean;
    role: eUserRoles | null;
};

export const BitBucketView: React.FC<Props> = ({ isLoadingUpdate, role }) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refBranch = useRef(null);
    const refEmail = useRef(null);
    const refJira = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refBranch.current,
            nextButtonProps: {
                children: 'Далее',
            },
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => refEmail.current,
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
            target: () => refJira.current,
            nextButtonProps: {
                children: 'Далее',
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
                    BitBucket
                </UITitle>

                <UIFlex className={cx('content')} gap={40}>
                    <div ref={refBranch} className={cx('contentItem')}>
                        <FormInput
                            formProps={{
                                name: 'branch',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle
                                            className={cx('contentItem')}
                                            level={5}>
                                            Ветка
                                        </UITitle>
                                        <UITooltip
                                            className={cx('tooltip')}
                                            title="Название текущей ветки в BitBucket">
                                            <span>
                                                <Icon
                                                    type="question-circle-outlined"
                                                    size="xs"
                                                />
                                            </span>
                                        </UITooltip>
                                    </div>
                                ),
                                className: cx('containerItem'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                disabled:
                                    isLoadingUpdate ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                                size: 'large',
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div ref={refEmail} className={cx('contentItem')}>
                        <FormInput
                            formProps={{
                                name: 'email',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle
                                            className={cx('contentItem')}
                                            level={5}>
                                            Почта
                                        </UITitle>
                                        <UITooltip
                                            className={cx('tooltip')}
                                            title="Почта, на которую будут приходить уведомления при сборке и деплое текущей ветки в трубе">
                                            <span>
                                                <Icon
                                                    type="question-circle-outlined"
                                                    size="xs"
                                                />
                                            </span>
                                        </UITooltip>
                                    </div>
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
                                placeholder: 'Введите почту',
                                disabled:
                                    isLoadingUpdate ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                                size: 'large',
                            }}
                        />
                    </div>

                    <div ref={refJira} className={cx('contentItem')}>
                        <FormInput
                            formProps={{
                                name: 'jira',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle
                                            className={cx('contentItem')}
                                            level={5}>
                                            Jira
                                        </UITitle>
                                        <UITooltip
                                            className={cx('tooltip')}
                                            title="Ссылка или номер задачи в jira (опционально)">
                                            <span>
                                                <Icon
                                                    type="question-circle-outlined"
                                                    size="xs"
                                                />
                                            </span>
                                        </UITooltip>
                                    </div>
                                ),
                                className: cx('contentItem'),
                            }}
                            inputProps={{
                                placeholder: 'Jira',
                                disabled:
                                    isLoadingUpdate ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                                size: 'large',
                            }}
                        />
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
