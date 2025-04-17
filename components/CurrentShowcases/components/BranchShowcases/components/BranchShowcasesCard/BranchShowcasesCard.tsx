import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { LinkButton } from '@components/_shared/LinkButton';
import { UITypography } from '@components/_shared/Typography';

import { useStyles } from '@hooks/useStyles';

import { ShowcaseCurrentBranches } from '@src/redux/showcases/showcase';

import styles from './styles.module.scss';

type Props = {
    data: ShowcaseCurrentBranches;
};

export const BranchShowcasesCard: React.FC<Props> = ({ data }) => {
    const cx = useStyles(styles);
    const isReference = location.pathname.includes('reference');

    return (
        <UICard
            classNames={{
                body: cx('container'),
            }}>
            <div className={cx('wrapper')}>
                <UITypography className={cx('text')}>
                    <UITypography className={cx('text')} strong>
                        Ветка:
                    </UITypography>
                    {data.name}
                </UITypography>
                <UITypography className={cx('text')}>
                    <UITypography className={cx('text')} strong>
                        Исполнитель:
                    </UITypography>
                    {data.developer_name}
                </UITypography>
                <UITypography className={cx('text')}>
                    <UITypography className={cx('text')} strong>
                        Тип задачи:
                    </UITypography>
                    {data.task_type_name}
                </UITypography>
                <UITypography className={cx('text')}>
                    <UITypography className={cx('text')} strong>
                        Статус задачи:
                    </UITypography>
                    {data.task_status_name}
                </UITypography>
            </div>
            <LinkButton
                to={
                    isReference
                        ? `/branch/reference/${data.id}`
                        : `/branch/${data.id}`
                }>
                <UIButton className={cx('btn')} size="middle">
                    Просмотр
                </UIButton>
            </LinkButton>
        </UICard>
    );
};
