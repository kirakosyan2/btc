import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';
// import { ActiveTaskGraph } from './ActiveTaskGraph';

export const ActiveTask: React.FC = () => {
    const cx = useStyles(styles);

    return (
        <UICard className={cx('container')}>
            <UITitle
                className={cx('title')}
                level={2}
            >
                Активные задачи
            </UITitle>

            {/* <ActiveTaskGraph /> */}
        </UICard>
    );
};
