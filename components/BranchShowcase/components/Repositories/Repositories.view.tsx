import { TourProps } from 'antd';
import React, { useRef } from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { Icon } from '@components/_shared/Icon';
import { LinkButton } from '@components/_shared/LinkButton';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';

import styles from './styles.module.scss';

type Props = {
    isLinkLoading: boolean;
    isLoadingUpdate: boolean;
    repoLink: string;
    role: eUserRoles | null;
    onBitBucketRequest: () => void;
    clearRepoLink: () => void;
};
export const RepositoriesView: React.FC<Props> = ({
    isLinkLoading,
    isLoadingUpdate,
    repoLink,
    role,
    onBitBucketRequest,
    clearRepoLink,
}) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refBranch = useRef(null);
    const refVersion = useRef(null);
    const refStatus = useRef(null);
    const refDate = useRef(null);
    const ref2st = useRef(null);
    const refSQL = useRef(null);
    const refBitBucket = useRef(null);

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
            target: () => refVersion.current,
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
            target: () => ref2st.current,
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
            target: () => refSQL.current,
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
            target: () => refBitBucket.current,
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
                    Репозиторий
                </UITitle>

                <UIFlex className={cx('content')} gap={40}>
                    <div ref={refBranch} className={cx('contentItem')}>
                        <FormInput
                            formProps={{
                                name: 'repositoriesBranch',
                                label: (
                                    <UITitle level={5}>
                                        Ветка репозитория
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
                                placeholder: 'Введите название ветки',
                                size: 'large',
                                readOnly: true,
                                disabled:
                                    isLoadingUpdate ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>

                    <div ref={refVersion} className={cx('contentItem')}>
                        <FormInput
                            formProps={{
                                name: 'repositoriesVersion',
                                label: (
                                    <UITitle level={5}>Версия витрины</UITitle>
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
                                placeholder: 'Укажите версию витрины',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </div>

                    <div ref={refStatus} className={cx('contentItem')}>
                        <FormInput
                            formProps={{
                                name: 'status',
                                label: <UITitle level={5}>Статус</UITitle>,
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
                                    isLoadingUpdate ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>

                    <div ref={refDate} className={cx('contentItem')}>
                        <FormInput
                            formProps={{
                                name: 'dateAndTimeBranch',
                                label: (
                                    <UITitle
                                        level={5}
                                        className={cx('dateTime')}>
                                        Дата и время загрузки витрины
                                    </UITitle>
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
                                size: 'large',
                                readOnly: true,
                                disabled:
                                    isLoadingUpdate ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>
                </UIFlex>

                <UIFlex gap={40}>
                    <div ref={ref2st} className={cx('containerBtn')}>
                        <UIButton
                            type="primary"
                            disabled
                            className={cx('btn')}
                            size="large">
                            Генерация S2T
                        </UIButton>
                    </div>
                    <div ref={refSQL} className={cx('containerBtn')}>
                        <UIButton
                            type="primary"
                            disabled
                            className={cx('btn')}
                            size="large">
                            Синхронизация SQL-кода из ВВ
                        </UIButton>
                    </div>
                    {!repoLink ? (
                        <div ref={refBitBucket} className={cx('containerBtn')}>
                            <UIButton
                                type="primary"
                                className={cx('btn')}
                                size="large"
                                onClick={onBitBucketRequest}
                                disabled={
                                    isLinkLoading ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    )
                                }
                                loading={isLinkLoading}>
                                Загрузить в BitBucket
                            </UIButton>
                        </div>
                    ) : (
                        <div className={cx('containerBtn')}>
                            <LinkButton
                                to={repoLink}
                                target="_blank"
                                className={cx('btn_link')}>
                                <UIButton
                                    size="large"
                                    className={cx('btn')}
                                    onClick={clearRepoLink}>
                                    Ссылка на репозиторий
                                </UIButton>
                            </LinkButton>
                        </div>
                    )}
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
