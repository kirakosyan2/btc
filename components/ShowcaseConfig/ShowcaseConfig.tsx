import { useStyles } from '@hooks/useStyles';
import React from 'react';
import styles from './styles.module.scss';
import { TableGeneralSettings } from './components/GeneralSettings';
import { TableJira } from './components/JIra';
import { TableDevOps } from './components/DevOps';
import { TableS2T } from './components/S2T';
import { UITitle } from '@components/_shared/Title';
import { UIFlex } from '@components/_shared/Flex';
import { CTL } from './components/CTL';

export const ShowcaseConfig: React.FC = () => {
    const cx = useStyles(styles);

    return (
        <UIFlex
            vertical
            gap={40}
        >
            <UITitle
                level={2}
                className={cx('title')}
            >
                Конфиг команды
            </UITitle>
            <TableGeneralSettings />
            <TableJira />
            <TableDevOps />
            <TableS2T />
            <CTL />
        </UIFlex>
    );
};
