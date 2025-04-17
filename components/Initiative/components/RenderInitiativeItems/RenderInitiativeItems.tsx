import React from 'react';

import { UIFlex } from '@components/_shared/Flex';
import { UITypography } from '@components/_shared/Typography';

import { useStyles } from '@hooks/useStyles';

import { useInitiativeListQuery } from '@src/redux/initiative/initiative';

import { InitiativeItem } from '../InitiativeItem/InitiativeItem';
import { SkeletonInitiativeItem } from '../SkeletonInitiativeItem';
import styles from './styles.module.scss';

export const RenderInitiativeItems: React.FC = () => {
    const cx = useStyles(styles);

    const { data: initiativeList, isLoading: isLoadingInitive } =
        useInitiativeListQuery();

    return (
        <UIFlex gap={40} className={cx('container')}>
            {initiativeList?.length &&
                !isLoadingInitive &&
                initiativeList.map((item) => (
                    <InitiativeItem key={item.id} {...item} />
                ))}

            {isLoadingInitive && <SkeletonInitiativeItem />}
            {!isLoadingInitive && initiativeList?.length === 0 && (
                <UITypography className={cx('text')}>Нет данных</UITypography>
            )}
        </UIFlex>
    );
};
