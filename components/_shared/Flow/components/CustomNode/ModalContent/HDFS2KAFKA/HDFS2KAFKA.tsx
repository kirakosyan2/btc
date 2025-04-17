import { TabsProps } from 'antd';
import React, { useMemo } from 'react';

import { UIFlex } from '@components/_shared/Flex';
import { UITabs } from '@components/_shared/Tabs';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import { TabKafka } from './components/TabKafka';
import { TabLogging } from './components/TabLogging';
import { TabSource } from './components/TabSource';
import styles from './styles.module.scss';

type Props = {
    threadId: string;
    onClose: () => void;
};

export const HDFS2KAFKA: React.FC<Props> = ({ threadId }) => {
    const cx = useStyles(styles);

    const items: TabsProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: 'Настройки процесса записи данных в Kafka',
                children: <TabKafka threadId={threadId} />,
            },
            {
                key: '2',
                label: 'Настройки процесса чтения данных для модуля',
                children: <TabSource threadId={threadId} />,
            },
            {
                key: '3',
                label: 'Настройки логирования результатов записи',
                children: <TabLogging threadId={threadId} />,
            },
        ],
        []
    );

    return (
        <UIFlex vertical>
            <UITitle level={3} className={cx('title')}>
                Модуль HDFS2KAFKA
            </UITitle>

            <UITabs items={items} />
        </UIFlex>
    );
};
