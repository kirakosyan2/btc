import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';
import { ColumnsType } from 'antd/es/table';
import { UIInput } from '@components/_shared/Input';
import { UITable } from '@components/_shared/Table';
import { useDevelopQuery } from '@src/redux/statistic/statistics';

type DataType = {
    key: string;
    developer: string;
    active_task: string;
    completed_releases: number;
    completed_fixes: number;
    completed_new_releases: number;
    all_task: number;
};

export const Statistic: React.FC = () => {
    const cx = useStyles(styles);

    // Query
    const { data: statisticList, isLoading: isStatLoading } = useDevelopQuery();

    const normalTopDevelopList: DataType[] = useMemo(
        () =>
            statisticList?.length
                ? statisticList.map((statistic) => ({
                      key: `${new Date().getMilliseconds()} ${Math.random()}`,
                      developer: statistic.developer_name,
                      active_task: statistic.active_tasks,
                      completed_releases: statistic.completed_releases,
                      completed_fixes: statistic.completed_fixes,
                      completed_new_releases: statistic.completed_new_releases,
                      all_task: statistic.all_tasks,
                  }))
                : [],
        [statisticList],
    );

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Разработчик',
                dataIndex: 'developer',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.developer}
                        readOnly
                    />
                ),
            },
            {
                title: 'Задачи в работе',
                dataIndex: 'active_task',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.active_task}
                        readOnly
                    />
                ),
            },
            {
                title: 'Завершенные релизы',
                dataIndex: 'completed_releases',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.completed_releases}
                        readOnly
                    />
                ),
            },
            {
                title: 'Завершенные фиксы',
                dataIndex: 'completed_fixes',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.completed_fixes}
                        readOnly
                    />
                ),
            },
            {
                title: 'Завершенные новые релизы',
                dataIndex: 'completed_new_releases',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.completed_new_releases}
                        readOnly
                    />
                ),
            },
            {
                title: 'Все задачи',
                dataIndex: 'all_task',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.all_task}
                        readOnly
                    />
                ),
            },
        ],
        [],
    );

    return (
        <UICard className={cx('container')}>
            <UITitle
                className={cx('title')}
                level={3}
            >
                Статистика
            </UITitle>
            <UITitle
                level={5}
                className={cx('text', 'upper')}
            >
                Топы:
            </UITitle>
            <UITable<DataType>
                columns={columns}
                bordered
                loading={isStatLoading}
                dataSource={normalTopDevelopList}
                locale={{
                    emptyText: 'Нет данных',
                }}
            />
        </UICard>
    );
};
