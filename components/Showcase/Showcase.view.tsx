import { useStyles } from '@hooks/useStyles';
import React from 'react';
import styles from './styles.module.scss';
import { UITitle } from '@components/_shared/Title';
import { RenderShowcaseItems } from './components/RenderShowcaseItem/RenderShowcaseItem';
import { UIFlex } from '@components/_shared/Flex';
import { ShowcaseCurrent, ShowcasesList } from '@src/redux/initiative/initiative';
import { SkeletonShowcaseName } from './components/SkeletonShowcaseName';

type Props = {
    showcasesList: ShowcasesList[];
    showcase?: ShowcaseCurrent;
    isLoadingShowcase: boolean;
    isLoadingShowcaseList: boolean;
};

export const ShowcaseView: React.FC<Props> = ({
    showcasesList,
    showcase,
    isLoadingShowcase,
    isLoadingShowcaseList,
}) => {
    const cx = useStyles(styles);

    return (
        <div>
            {!isLoadingShowcase ? (
                <UITitle
                    level={2}
                    className={cx('title')}
                >
                    {showcase?.name}
                </UITitle>
            ) : (
                <SkeletonShowcaseName />
            )}
            <UIFlex>
                <RenderShowcaseItems
                    showcasesList={showcasesList}
                    isLoadingShowcaseList={isLoadingShowcaseList}
                />
            </UIFlex>
        </div>
    );
};
