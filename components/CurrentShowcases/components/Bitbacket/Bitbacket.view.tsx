import { Col, Row, TourProps } from 'antd';
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
import { UITypography } from '@components/_shared/Typography';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';

import styles from './style.module.scss';

type Props = {
    link?: string;
    status?: string;
    isLoadingData: boolean;
    repoName?: string;
    role: eUserRoles | null;
    onLinkRequest: () => void;
};

export const BitbacketView: React.FC<Props> = ({
    link,
    status,
    isLoadingData,
    repoName,
    role,
    onLinkRequest,
}) => {
    const cx = useStyles(styles);
    const isReference = location.pathname.includes('reference');
    const { isOpened, openPopup, closePopup } = usePopupControls();

    const refRepo = useRef(null);
    const refName = useRef(null);
    const refStatus = useRef(null);
    const refCreateBtn = useRef(null);
    const refChangeBtn = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refRepo.current,
            nextButtonProps: {
                children: 'Далее',
            },
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => refName.current,
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
            target: () => refCreateBtn.current,
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
            target: () => refChangeBtn.current,
            nextButtonProps: {
                children: 'Закрыть',
                // onClick: closeTour,
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
                    Bitbucket
                </UITitle>
                <div>
                    <Row gutter={20}>
                        <Col span={5}>
                            <div ref={refRepo}>
                                {status?.toLocaleLowerCase() === 'создан' ? (
                                    <LinkButton
                                        to={link ?? ''}
                                        target="_blank"
                                        className={cx('link')}>
                                        Ссылка на репозиторий
                                    </LinkButton>
                                ) : (
                                    <UITypography className={cx('link')}>
                                        Репозиторий не создан
                                    </UITypography>
                                )}
                            </div>
                        </Col>

                        <Col span={16}>
                            <UIFlex vertical>
                                <div ref={refName}>
                                    <UITitle level={4} className={cx('title')}>
                                        Название репозитория
                                    </UITitle>
                                    <FormInput
                                        formProps={{
                                            name: 'name',
                                            className: cx('formListItem'),
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        'Обязательное поле',
                                                },
                                            ],
                                        }}
                                        inputProps={{
                                            placeholder: 'Введите название',
                                            size: 'large',
                                            disabled:
                                                status?.toLowerCase() ===
                                                    'создан' ||
                                                isLoadingData ||
                                                [eUserRoles.BUISNESS].includes(
                                                    role as eUserRoles
                                                ),
                                        }}
                                    />
                                </div>
                            </UIFlex>
                        </Col>

                        <Col span={3}>
                            <UIFlex vertical>
                                <div ref={refStatus}>
                                    <UITitle level={4} className={cx('title')}>
                                        Статус
                                    </UITitle>
                                    <UITypography className={cx('text')}>
                                        {status}
                                    </UITypography>
                                </div>
                            </UIFlex>
                        </Col>
                    </Row>

                    <UIFlex justify="center" gap={40}>
                        <span ref={refCreateBtn}>
                            <UIButton
                                type="primary"
                                size="large"
                                className={cx('btn')}
                                disabled={
                                    status === 'создан' ||
                                    !repoName ||
                                    isLoadingData ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    )
                                }
                                onClick={onLinkRequest}>
                                Создать репозиторий
                            </UIButton>
                        </span>
                        <span ref={refChangeBtn}>
                            <UIButton
                                htmlType="submit"
                                size="large"
                                className={cx('btn')}
                                disabled={
                                    status?.toLowerCase() === 'создан' ||
                                    isLoadingData ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    )
                                }>
                                Изменить
                            </UIButton>
                        </span>
                    </UIFlex>
                </div>

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
