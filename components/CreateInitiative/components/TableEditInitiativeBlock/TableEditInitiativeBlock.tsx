import { UITable } from '@components/_shared/Table';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import { UIInput } from '@components/_shared/Input';
import { UISelect } from '@components/_shared/Select';
import {
    InitiativeUpdatePayload,
    useInitiativeListQuery,
    useUpdateInitiativeMutation,
} from '@src/redux/initiative/initiative';
import { useCustomersQuery } from '@src/redux/customers/customers';
import { notificationEasy } from '@src/utils';

type DataType = {
    key: number;
    name: string;
    customer: number;
    link: string;
};

export const TableEditInitiativeBlock: React.FC = () => {
    // Query
    const { data: customersList, isLoading: isLoadingCustomersList } = useCustomersQuery();
    const { data: initiativeList } = useInitiativeListQuery();

    // Mutations
    const [updateInitiative, { isLoading: isLoadingUpdateDate }] = useUpdateInitiativeMutation();

    const normalInitiativeList: DataType[] = useMemo(
        () =>
            initiativeList?.length
                ? initiativeList.map((initiative) => ({
                      key: initiative.id,
                      name: initiative.name,
                      customer: initiative.customer,
                      link: initiative.confluence_link,
                  }))
                : [],
        [initiativeList],
    );

    const normalCustomerList = useMemo(
        () =>
            customersList?.length
                ? customersList.map((customer) => ({
                      value: customer.id,
                      label: customer.name,
                  }))
                : [],
        [customersList],
    );

    const editField = async (id: number, field: string, data: any) => {
        const payload: InitiativeUpdatePayload = {
            id,
            [field]: data,
        };

        const res: any = await updateInitiative(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Инициатива успешно обновлена',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при обновлении инициативы',
            });
        }
    };

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Заказчик',
                dataIndex: 'customer',
                key: 'key',
                render: (_, row) => (
                    <UISelect
                        defaultValue={row.customer}
                        onChange={(e) => editField(row.key, 'customer', e)}
                        options={normalCustomerList}
                        loading={isLoadingCustomersList}
                        disabled={isLoadingCustomersList}
                    />
                ),
            },
            {
                title: 'Название инициативы',
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
                title: 'Ссылка в Confluence на инициативу',
                dataIndex: 'link',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.link}
                        onBlur={(e) => editField(row.key, 'confluence_link', e.target.value)}
                    />
                ),
            },
        ],
        [isLoadingCustomersList, normalInitiativeList],
    );

    return (
        <UITable<DataType>
            columns={columns}
            dataSource={normalInitiativeList}
            loading={isLoadingUpdateDate}
            bordered
            locale={{
                emptyText: 'Нет данных',
            }}
        />
    );
};
