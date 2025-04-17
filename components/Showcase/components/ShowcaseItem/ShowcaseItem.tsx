import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { LinkButton } from '@components/_shared/LinkButton';
import { TextShorter } from '@components/_shared/TextShorter';
import { UITypography } from '@components/_shared/Typography';

import { useStyles } from '@hooks/useStyles';

import { ShowcasesList } from '@src/redux/initiative/initiative';

import styles from './styles.module.scss';

type Props = {
    showcase: ShowcasesList;
};

export const ShowcaseItem: React.FC<Props> = ({ showcase }) => {
    const cx = useStyles(styles);
    return (
        <UICard className={cx('container')}>
            <UIFlex className={cx('btn')}>
                <TextShorter
                    tooltip
                    title={showcase.name}
                    className={cx('paragraph')}
                    classNameText={cx('title')}>
                    {showcase.name}
                </TextShorter>
                <UIFlex>
                    <UITypography className={cx('activeTasks')}>
                        Активных задач: {showcase.etl_count_active}
                    </UITypography>
                    <UITypography className={cx('totalTasks')}>
                        Всего задач: {showcase.etl_count_all}
                    </UITypography>
                </UIFlex>
                <UIFlex className={cx('buttonGroup')}>
                    <LinkButton
                        to={
                            showcase.is_reference
                                ? `/showcase/reference/${showcase.id}`
                                : `/showcase/${showcase.id}`
                        }>
                        <UIButton type="primary" size="large">
                            Просмотр
                        </UIButton>
                    </LinkButton>
                    <UIButton size="large">Confluence</UIButton>
                </UIFlex>
            </UIFlex>
        </UICard>
    );
};
