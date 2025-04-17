import { TourProps } from 'antd';
import React, { useRef } from 'react';

import { UICard } from '@components/_shared/Card';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';

import { DatamartEdit } from './components/DatamartEdit';
import styles from './styles.module.scss';

type Props = {
    role: eUserRoles | null;
};
export const CTLView: React.FC<Props> = () => {
    const cx = useStyles(styles);

    const { isOpened, openPopup, closePopup } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refStart = useRef(null);
    const refFinish = useRef(null);
    const refName = useRef(null);
    const refPath = useRef(null);
    const refBtn = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refStart.current,
            nextButtonProps: {
                children: 'Далее',
            },
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => refFinish.current,
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
            target: () => refPath.current,
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
                <UITitle className={cx('title')} level={4}>
                    CTL сущности
                </UITitle>

                <DatamartEdit />

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
