import { TourProps } from 'antd';
import React, { useRef } from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { Icon } from '@components/_shared/Icon';
import { LinkButton } from '@components/_shared/LinkButton';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';

import { OptionsSelect } from './Jenkins';
import styles from './styles.module.scss';

type Props = {
    linkJob?: string;
    options: OptionsSelect[];
    jobLinkParams: string;
    jobLinkVariables: string;
    isLoadingJenkins: boolean;
    isLoadingDeploy: boolean;
    isLoadingUploadVars: boolean;
    role: eUserRoles | null;
    handleUploadVars: () => void;
};

export const JenkinsView: React.FC<Props> = ({
    linkJob,
    options,
    jobLinkParams,
    jobLinkVariables,
    isLoadingJenkins,
    isLoadingDeploy,
    isLoadingUploadVars,
    role,
    handleUploadVars,
}) => {
    const cx = useStyles(styles);

    const { isOpened, openPopup, closePopup } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refJob = useRef(null);
    const refBranch = useRef(null);
    const refParams = useRef(null);
    const refUpload = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refJob.current,
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
            title: 'Save',
            description: 'Save your changes.',
            target: () => refParams.current,
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
            target: () => refUpload.current,
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
                    Jenkins
                </UITitle>

                <UIFlex className={cx('content')} vertical>
                    <div ref={refJob}>
                        <LinkButton
                            to={linkJob ?? ''}
                            className={cx('link')}
                            target="_blank">
                            <UIButton
                                size="large"
                                className={cx('btn')}
                                target="_blank">
                                Ссылка на Job
                            </UIButton>
                        </LinkButton>
                    </div>

                    <div ref={refBranch}>
                        <FormSelect
                            formProps={{
                                name: 'branch',
                                label: (
                                    <UITitle level={5} style={{ margin: 0 }}>
                                        Ветка
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
                            selectProps={{
                                placeholder: 'Выберите ветку',
                                size: 'large',
                                options: options,
                                loading: isLoadingJenkins,
                                disabled:
                                    isLoadingJenkins ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>

                    <UIFlex
                        justify="center"
                        gap={40}
                        style={{ marginTop: '10px' }}>
                        {!jobLinkParams ? (
                            <div className={cx('containerBtn')} ref={refParams}>
                                <UIButton
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className={cx('btn')}
                                    loading={isLoadingDeploy}
                                    disabled={
                                        isLoadingDeploy ||
                                        [eUserRoles.BUISNESS].includes(
                                            role as eUserRoles
                                        )
                                    }>
                                    Собрать с параметрами
                                </UIButton>
                            </div>
                        ) : (
                            <LinkButton
                                to={jobLinkParams}
                                className={cx('btn')}
                                target="_blank">
                                <UIButton size="large" className={cx('btn')}>
                                    Перейти в Jenkins job
                                </UIButton>
                            </LinkButton>
                        )}

                        {!jobLinkVariables ? (
                            <div className={cx('containerBtn')} ref={refUpload}>
                                <UIButton
                                    size="large"
                                    className={cx('btn')}
                                    loading={isLoadingUploadVars}
                                    disabled={
                                        isLoadingUploadVars ||
                                        [eUserRoles.BUISNESS].includes(
                                            role as eUserRoles
                                        )
                                    }
                                    onClick={handleUploadVars}
                                    icon={
                                        <UITooltip title="Загрузка переменных витрины требуется только при изменении стендозависимых параметров">
                                            <span>
                                                <Icon
                                                    type="question-circle-outlined"
                                                    size="xs"
                                                />
                                            </span>
                                        </UITooltip>
                                    }
                                    iconPosition="end">
                                    Загрузить переменные витрины
                                </UIButton>
                            </div>
                        ) : (
                            <LinkButton
                                to={jobLinkVariables}
                                className={cx('btn')}
                                target="_blank">
                                <UIButton size="large" className={cx('btn')}>
                                    Перейти в Jenkins job
                                </UIButton>
                            </LinkButton>
                        )}
                    </UIFlex>
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
