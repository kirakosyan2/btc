import { UITitle } from '@components/_shared/Title';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { App as AppConfig, TabsProps } from 'antd';
import { TabStatistic } from '../TabStatistic';
import { UITabs } from '@components/_shared/Tabs';
import { TabCheck } from '../TabCheck';
import { TabSpark } from '../TabSpark';

type Props = {
    threadId: string;
    onClose: () => void;
};

export const CheckData: React.FC<Props> = ({ threadId, onClose }) => {
    const cx = useStyles(styles);

    const items: TabsProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: 'Статистики',
                children: (
                    <AppConfig>
                        <TabStatistic
                            threadId={threadId}
                            onClose={onClose}
                        />
                    </AppConfig>
                ),
            },
            {
                key: '2',
                label: 'Проверки',
                children: (
                    <TabCheck
                        threadId={threadId}
                        onClose={onClose}
                    />
                ),
            },
            {
                key: '3',
                label: 'Настройки Spark',
                children: (
                    <TabSpark
                        threadId={threadId}
                        onClose={onClose}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <div className={cx('container')}>
            <UITitle
                className={cx('title')}
                level={3}
            >
                Модуль проверки качества данных
            </UITitle>

            <UITabs items={items} />
        </div>
    );
};
