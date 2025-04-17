import { TourProps } from 'antd';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { UICard } from '@components/_shared/Card';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';
import { UITypography } from '@components/_shared/Typography';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { useGetDMLQuery } from '@src/redux/streamV2/streamV2';

import { RenderCardDML } from './components/RenderCardDML';
import styles from './styles.module.scss';

export const DML: React.FC = () => {
    const cx = useStyles(styles);
    const { id: branch_id } = useParams();
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refBlock = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refBlock.current,
            nextButtonProps: {
                children: 'Далее',
            },
        },
    ];

    // Query
    const { data: flowList, isLoading: isLoadingFlowList } = useGetDMLQuery(
        branch_id as string,
        {
            skip: !branch_id,
        }
    );

    return (
        <div ref={refBlock}>
            <UICard className={cx('container')}>
                <UITitle className={cx('title')} level={3}>
                    DML
                </UITitle>

                <RenderCardDML
                    flowList={flowList ?? []}
                    isLoadingFlowList={isLoadingFlowList}
                />

                {!isLoadingFlowList && flowList?.length === 0 && (
                    <UITypography className={cx('text')}>
                        Нет данных
                    </UITypography>
                )}

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
        </div>
    );
};
