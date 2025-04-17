import { TabsProps } from 'antd';
import React, { useMemo } from 'react';

import { UIFlex } from '@components/_shared/Flex';
import { UITabs } from '@components/_shared/Tabs';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import { TabGeneral } from './components/TabGeneral';
import { TabHDFS } from './components/TabHDFS';
import { TabKafka } from './components/TabKafka';
// import { TabLogging } from './components/TabLogging';
import styles from './styles.module.scss';

type Props = {
    threadId: string;
    onClose: () => void;
};

export const KAFKA2HDFS: React.FC<Props> = ({ threadId }) => {
    const cx = useStyles(styles);

    const items: TabsProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: 'Настроки процесса записи данных в таблицу',
                children: <TabHDFS threadId={threadId} />,
            },
            {
                key: '2',
                label: 'Настройки процесса чтения данных из Kafka',
                children: <TabKafka threadId={threadId} />,
            },
            {
                key: '3',
                label: 'Общие настройки модуля',
                children: <TabGeneral threadId={threadId} />,
            },
            // {
            //     key: '4',
            //     label: 'Настройки логирования результатов записи',
            //     children: <TabLogging threadId={threadId} />,
            // },
        ],
        []
    );

    return (
        <UIFlex vertical>
            <UITitle level={3} className={cx('title')}>
                Модуль KAFKA2HDFS
            </UITitle>

            <UITabs items={items} />
        </UIFlex>
    );
};
