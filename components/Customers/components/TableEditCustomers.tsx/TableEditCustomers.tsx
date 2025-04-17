import { Icon } from '@components/_shared/Icon';
import { UITable } from '@components/_shared/Table';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UIInput } from '@components/_shared/Input';
import {
    CustomerUpdatePayload,
    useCustomersQuery,
    useDeleteCustomerMutation,
    useUpdateCustomerMutation,
} from '@src/redux/customers/customers';
import { notificationEasy } from '@src/utils';

type DataType = {
    key: number;
    name: string;
    customer: string;
    link: string;
};

export const TableEditCustomers: React.FC = () => {
    const cx = useStyles(styles);

    // Query
    const { data: customersList } = useCustomersQuery();

    // Mutations
    const [updateCustomer, { isLoading: isLoadingUpdate }] = useUpdateCustomerMutation();
    const [deleteCustomer] = useDeleteCustomerMutation();

    const normCustomersList: DataType[] = useMemo(
        () =>
            customersList?.length
                ? customersList.map((item) => ({
                      key: item.id,
                      name: item.name,
                      customer: item.code_name,
                      link: item.confluence_link,
                  }))
                : [],
        [customersList],
    );

    const onDelete = (id: number) => {
        return async () => {
            const res: any = await deleteCustomer(id);

            if (res?.data) {
                notificationEasy({
                    content: 'Заказчик успешно удален',
                });
            } else {
                notificationEasy({
                    type: 'error',
                    content: res?.error.data.detail ?? 'Произошла ошибка при удалении заказчика',
                });
            }
        };
    };

    const editField = async (id: number, field: string, data: any) => {
        const payload: CustomerUpdatePayload = {
            id,
            [field]: data,
        };

        const res: any = await updateCustomer(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Заказчик успешно обновлен',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при обновлении заказчика',
            });
        }
    };

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Код заказчик',
                dataIndex: 'customer',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.customer}
                        onBlur={(e) => editField(row.key, 'name', e.target.value)}
                    />
                ),
            },
            {
                title: 'Название заказчика',
                dataIndex: 'name',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.name}
                        onBlur={(e) => editField(row.key, 'name', e.target.value)}
                    />
                ),
            },
            {
                title: 'Ссылка в Confluence на заказчика',
                dataIndex: 'link',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.link}
                        onBlur={(e) => editField(row.key, 'link', e.target.value)}
                    />
                ),
            },
            {
                title: 'Удаление',
                key: 'key',
                render: (_, row) => (
                    <Icon
                        className={cx('icon')}
                        type="delete-outlined"
                        onClick={onDelete(row.key)}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <UITable<DataType>
            columns={columns}
            dataSource={normCustomersList}
            loading={isLoadingUpdate}
            bordered
            locale={{
                emptyText: 'Нет данных',
            }}
        />
    );
};
