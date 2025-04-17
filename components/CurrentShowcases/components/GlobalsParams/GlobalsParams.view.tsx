import { TourProps } from 'antd';
import React, { useRef } from 'react';

import { UIButton } from '@components/_shared/Button';
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

    openModalGlobal: () => void;
};

export const GlobalsParamsView: React.FC<Props> = ({
    role,

    openModalGlobal,
}) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refName = useRef(null);
    const refBtn = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refName.current,
            nextButtonProps: {
                children: 'Далее',
            },
        },
        {
            title: 'Save',
            description: 'Save your changes.',
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
                <UITitle level={3} className={cx('title')}>
                    Глобальные CTL параметры
                </UITitle>
                <UIFlex gap={20}>
                    <div ref={refName} className={cx('input')}>
                        <FormInput
                            formProps={{
                                name: 'aces',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle
                                            className={cx('text', 'acesText')}
                                            level={5}>
                                            Логическое имя ТУЗа
                                        </UITitle>
                                        <UITooltip
                                            className={cx('tuz')}
                                            title={
                                                <>
                                                    ТУЗ, под которым будет
                                                    работать поток.
                                                    <br />
                                                    Пример:
                                                    custom_blago_b2c_autopay
                                                </>
                                            }>
                                            <span>
                                                <Icon
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
                            }}
                            inputProps={{
                                placeholder: 'Введите логическое имя ТУЗа',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </div>

                    <div ref={refBtn} className={cx('btnContainer')}>
                        <UIButton
                            size="large"
                            type="primary"
                            className={cx('btnParams')}
                            icon={
                                <UITooltip title="Глобальные переменные, которые которые будут использоваться всеми потоками витрины.">
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                        />
                                    </span>
                                </UITooltip>
                            }
                            iconPosition="end"
                            onClick={openModalGlobal}>
                            Пользовательские глобальные переменные
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
