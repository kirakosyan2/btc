import { UIFlex } from '@components/_shared/Flex';
import { useStyles } from '@hooks/useStyles';
import React from 'react';
import styles from './styles.module.scss';
import { TeamSelection } from './components/TeamSelection';
import { ActiveTaskSeparately } from './components/ActiveTaskSeparately';
// import { ActiveTask } from './components/ActiveTask';
import { Statistic } from './components/Statistick/Statistic';

export const Graphs: React.FC = () => {
    const cx = useStyles(styles);
    return (
        <UIFlex
            className={cx('container')}
            vertical
            gap={40}
        >
            <TeamSelection />
            <Statistic />
            {/* <ActiveTask /> */}
            <ActiveTaskSeparately />
        </UIFlex>
    );
};
