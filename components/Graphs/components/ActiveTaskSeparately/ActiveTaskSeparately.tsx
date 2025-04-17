import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';
import { ColumnsType } from 'antd/es/table';
import { UIInput } from '@components/_shared/Input';
import { UITable } from '@components/_shared/Table';
import { useStatisticsListQuery } from '@src/redux/statistic/statistics';

type DataType = {
    key: string;
    customer: string;
    initiative: string;
    etl_flow: string;
    branch: string;
    developer: string;
    status: number;
    date_start_dev: string;
};

export const ActiveTaskSeparately: React.FC = () => {
    const cx = useStyles(styles);

    // Query
    const { data: ststsList } = useStatisticsListQuery();

    const normalStatsList: DataType[] = useMemo(
        () =>
            ststsList?.length
                ? ststsList.map((statistic) => ({
                      key: `${new Date().getMilliseconds()} ${Math.random()}`,
                      customer: statistic.customer.name,
                      initiative: statistic.initiative.name,
                      etl_flow: statistic.datamart.name,
                      branch: statistic.branch.name,
                      developer: statistic.developer_name,
                      date_start_dev: statistic.start_date_time,
                      status: statistic.task_status,
                  }))
                : [],
        [ststsList],
    );

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Заказчик',
                dataIndex: 'customer',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.customer}
                        readOnly
                    />
                ),
            },
            {
                title: 'Инициатива',
                dataIndex: 'initiative',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.initiative}
                        readOnly
                    />
                ),
            },
            {
                title: 'ETL-поток',
                dataIndex: 'etl_flow',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.etl_flow}
                        readOnly
                    />
                ),
            },
            {
                title: 'Ветка',
                dataIndex: 'branch',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.branch}
                        readOnly
                    />
                ),
            },
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
                title: 'Статус',
                dataIndex: 'status',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.status}
                        readOnly
                    />
                ),
            },
            {
                title: 'Дата начала разработки',
                dataIndex: 'date_start_dev',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.date_start_dev}
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
                Активные задачи детально
            </UITitle>
            <UITable<DataType>
                columns={columns}
                bordered
                dataSource={normalStatsList}
                locale={{
                    emptyText: 'Нет данных',
                }}
            />
        </UICard>
    );
};
