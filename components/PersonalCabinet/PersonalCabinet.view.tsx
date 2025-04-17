import { UICard } from '@components/_shared/Card';
import { LinkButton } from '@components/_shared/LinkButton';
import { UITable } from '@components/_shared/Table';
import { UITitle } from '@components/_shared/Title';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import {
    useMeQuery,
    usePersonalCabinetListQuery,
} from '@src/redux/personalCabinet/personalCabinet';
import { UITypography } from '@components/_shared/Typography';

type DataType = {
    customer_id: number;
    customer_name: string;
    initiative_name: string;
    initiative_id: number;
    datamart_id: number;
    datamart_name: string;
    branch_id: number;
    branch_name: string;
    developer_name: string;
    task_status: string;
    start_date_time: string;
};

export const PersonalCabinetView: React.FC = () => {
    const cx = useStyles(styles);

    //Query
    const { data: personalCabinetList } = usePersonalCabinetListQuery();
    const { data: me } = useMeQuery();

    const normPersonalCabinetList: DataType[] = useMemo(
        () =>
            personalCabinetList?.length
                ? personalCabinetList.map((item) => ({
                      customer_id: item.customer_id,
                      customer_name: item.customer_name,
                      initiative_id: item.initiative_id,
                      initiative_name: item.initiative_name,
                      datamart_id: item.datamart_id,
                      datamart_name: item.datamart_name,
                      branch_id: item.branch_id,
                      branch_name: item.branch_name,
                      developer_name: item.developer_name,
                      task_status: item.task_status,
                      start_date_time: item.start_date_time,
                  }))
                : [],
        [personalCabinetList],
    );

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Заказчик',
                dataIndex: 'customer_name',
                key: 'key',
                render: (_, row) => <UITypography>{row.customer_name}</UITypography>,
            },
            {
                title: 'Инициатива',
                dataIndex: 'initiative_name',
                key: 'key',
                render: (_, row) => (
                    <LinkButton to={`/initiative/${row.initiative_id}`}>
                        {row.initiative_name}
                    </LinkButton>
                ),
            },
            {
                title: 'ETL-поток',
                dataIndex: 'datamart_name',
                key: 'key',
                render: (_, row) => (
                    <LinkButton to={`/showcase/${row.datamart_id}`}>{row.datamart_name}</LinkButton>
                ),
            },
            {
                title: 'Ветка',
                dataIndex: 'branch_id',
                key: 'key',
                render: (_, row) => (
                    <LinkButton to={`/branch/${row.branch_id}`}>{row.branch_name}</LinkButton>
                ),
            },
            {
                title: 'Разработчик',
                dataIndex: 'developer_name',
                key: 'key',
            },
            {
                title: 'Статус',
                dataIndex: 'task_status',
                key: 'key',
            },
            {
                title: 'Дата начала разработки',
                dataIndex: 'start_date_time',
                key: 'key',
            },
        ],
        [],
    );

    return (
        <UICard>
            <UITitle
                className={cx('title')}
                level={3}
            >
                Личный кабинет {me?.username}
            </UITitle>

            <UITitle
                level={4}
                className={cx('title')}
            >
                Активные задачи
            </UITitle>

            <UITable<DataType>
                columns={columns}
                dataSource={normPersonalCabinetList}
                bordered
                locale={{
                    emptyText: 'Нет данных',
                }}
            />
        </UICard>
    );
};
