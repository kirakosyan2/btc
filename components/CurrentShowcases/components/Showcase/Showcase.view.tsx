import { Col, Row, TourProps } from 'antd';
import React, { useMemo, useRef } from 'react';

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
import { InitiativesList } from '@src/redux/initiative/initiative';

import { ModalDatamart } from './components/ModalDatamart';
import styles from './styles.module.scss';

type Props = {
    initiativesList: InitiativesList[];
    isLoadingInitiative: boolean;
    isLoadingBase: boolean;
    isLoadingUpdate: boolean;
    role: eUserRoles | null;
};

export const ShowcaseView: React.FC<Props> = ({
    initiativesList,
    isLoadingInitiative,
    isLoadingBase,
    isLoadingUpdate,
    role,
}) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const {
        isOpened: isOpenedTour,
        openPopup: openTour,
        closePopup: closeTour,
    } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refDatamart = useRef(null);
    const refName = useRef(null);
    const refLink = useRef(null);
    const refOwner = useRef(null);
    const refBtn = useRef(null);

    const normalInitiativeList = useMemo(
        () =>
            initiativesList?.length
                ? initiativesList.map((initiative) => ({
                      value: initiative.id,
                      label: initiative.name,
                  }))
                : [],
        [initiativesList]
    );

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
            target: () => refLink.current,
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
            target: () => refOwner.current,
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
                    Витрина
                </UITitle>
                <div>
                    <Row gutter={40}>
                        <Col span={6}>
                            <UIFlex vertical>
                                <div ref={refDatamart}>
                                    <UITitle level={4} className={cx('title')}>
                                        Инициатива
                                    </UITitle>
                                    <FormSelect
                                        formProps={{
                                            name: 'initiative',
                                            className: cx('formListItem'),
                                        }}
                                        selectProps={{
                                            options: normalInitiativeList,
                                            loading:
                                                isLoadingInitiative ||
                                                isLoadingBase ||
                                                isLoadingUpdate,
                                            disabled:
                                                isLoadingInitiative ||
                                                [eUserRoles.BUISNESS].includes(
                                                    role as eUserRoles
                                                ),
                                            placeholder: 'Выберите инициативу',
                                            size: 'large',
                                        }}
                                    />
                                </div>
                            </UIFlex>
                        </Col>
                        <Col span={6}>
                            <UIFlex vertical>
                                <div ref={refName}>
                                    <UITitle level={4} className={cx('title')}>
                                        Название
                                    </UITitle>
                                    <FormInput
                                        formProps={{
                                            name: 'name',
                                            className: cx('formListItem'),
                                        }}
                                        inputProps={{
                                            placeholder: 'Введите название',
                                            size: 'large',
                                            disabled:
                                                isLoadingBase ||
                                                isLoadingUpdate ||
                                                [eUserRoles.BUISNESS].includes(
                                                    role as eUserRoles
                                                ),
                                        }}
                                    />
                                </div>
                            </UIFlex>
                        </Col>
                        <Col span={6}>
                            <UIFlex vertical>
                                <div ref={refLink}>
                                    <UITitle level={4} className={cx('title')}>
                                        Ссылка на Confluence
                                    </UITitle>

                                    <FormInput
                                        formProps={{
                                            name: 'confluence_link',
                                            className: cx('formListItem'),
                                        }}
                                        inputProps={{
                                            placeholder:
                                                'Введите имя владельца витрины',
                                            size: 'large',
                                            disabled:
                                                isLoadingBase ||
                                                isLoadingUpdate ||
                                                [eUserRoles.BUISNESS].includes(
                                                    role as eUserRoles
                                                ),
                                        }}
                                    />
                                </div>
                            </UIFlex>
                        </Col>
                        <Col span={6}>
                            <UIFlex vertical>
                                <div ref={refOwner}>
                                    <UITitle level={4} className={cx('title')}>
                                        Владелец витрины
                                    </UITitle>

                                    <FormInput
                                        formProps={{
                                            name: 'owner_email',
                                            className: cx('formListItem'),
                                        }}
                                        inputProps={{
                                            placeholder:
                                                'Введите почту владельца витрины',
                                            size: 'large',
                                            disabled:
                                                isLoadingBase ||
                                                isLoadingUpdate ||
                                                [eUserRoles.BUISNESS].includes(
                                                    role as eUserRoles
                                                ),
                                        }}
                                    />
                                </div>
                            </UIFlex>
                        </Col>
                    </Row>

                    <UIFlex justify="center">
                        <span ref={refBtn}>
                            <UIButton
                                type="primary"
                                size="large"
                                className={cx('btn')}
                                onClick={openPopup}>
                                Переопределить конфиг команды для данной витрины
                            </UIButton>
                        </span>
                    </UIFlex>
                </div>

                {isReference && (
                    <UITooltip title="Описание блока" className={cx('icon')}>
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                onClick={openTour}
                            />
                        </span>
                    </UITooltip>
                )}
            </UICard>

            <ModalDatamart isOpen={isOpened} onClose={closePopup} />

            {isReference && (
                <UITour open={isOpenedTour} steps={steps} onClose={closeTour} />
            )}
        </>
    );
};
