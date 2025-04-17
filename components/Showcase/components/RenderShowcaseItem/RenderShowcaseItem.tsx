import React from 'react';

import { UIFlex } from '@components/_shared/Flex';
import { UITypography } from '@components/_shared/Typography';

import { useStyles } from '@hooks/useStyles';

import { ShowcasesList } from '@src/redux/initiative/initiative';

import { ShowcaseItem } from '../ShowcaseItem/ShowcaseItem';
import { SkeletonShowcaseItem } from '../SkeletonShowcaseItem';
import styles from './styles.module.scss';

type Props = {
    showcasesList: ShowcasesList[];
    isLoadingShowcaseList: boolean;
};
export const RenderShowcaseItems: React.FC<Props> = ({
    showcasesList,
    isLoadingShowcaseList,
}) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('container')}>
            <UIFlex gap={40} className={cx('content')}>
                {!isLoadingShowcaseList &&
                    showcasesList &&
                    showcasesList.map((showcase) => (
                        <ShowcaseItem key={showcase.id} showcase={showcase} />
                    ))}

                {isLoadingShowcaseList && <SkeletonShowcaseItem />}
            </UIFlex>
            {!isLoadingShowcaseList && showcasesList.length === 0 && (
                <UITypography className={cx('text')}>Нет данных</UITypography>
            )}
        </div>
    );
};
