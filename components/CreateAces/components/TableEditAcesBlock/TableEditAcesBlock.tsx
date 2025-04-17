import { Icon } from '@components/_shared/Icon';
import { UITable } from '@components/_shared/Table';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UIInput } from '@components/_shared/Input';
import {
    AcesUpdatePayload,
    useAcesQuery,
    useDeleteAcesMutation,
    useUpdateAcesMutation,
} from '@src/redux/aces/aces';
import { notificationEasy } from '@src/utils';

type DataType = {
    key: number;
    base: string;
    dev: string;
    ift: string;
    uat: string;
    psi: string;
    prom: string;
    name: string;
};

export const TableEditAcesBlock: React.FC = () => {
    const cx = useStyles(styles);

    //Query
    const { data: acesList } = useAcesQuery();

    //Mutation
    const [updateAces, { isLoading: updateLoading }] = useUpdateAcesMutation();
    const [deleteAces, { isLoading: deleteLoading }] = useDeleteAcesMutation();

    const normAcesList: DataType[] = useMemo(
        () =>
            acesList?.length
                ? acesList.map((item) => ({
                      key: item.id,
                      name: item.name,
                      base: item.base_prefix,
                      dev: item.dev_prefix,
                      ift: item.ift_prefix,
                      uat: item.uat_prefix,
                      psi: item.pci_prefix,
                      prom: item.prom_prefix,
                  }))
                : [],
        [acesList],
    );

    const onDelete = (id: number) => {
        return async () => {
            const res: any = await deleteAces(id);

            if (res?.data) {
                notificationEasy({
                    content: 'ТУЗ успешно удален',
                });
            } else {
                notificationEasy({
                    type: 'error',
                    content: res?.error.data.detail ?? 'Произошла ошибка при удалении ТУЗа',
                });
            }
        };
    };

    const editField = async (id: number, field: string, data: any) => {
        const payload: AcesUpdatePayload = {
            id,
            [field]: data,
        };

        const res: any = await updateAces(payload);

        if (res?.data) {
            notificationEasy({
                content: 'ТУЗ успешно обновлен',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при обвновлении ТУЗа',
            });
        }
    };

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Название ТУЗа',
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
                title: 'Префикс BASE',
                dataIndex: 'base',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.base}
                        onBlur={(e) => editField(row.key, 'base_prefix', e.target.value)}
                    />
                ),
            },
            {
                title: 'Префикс DEV',
                dataIndex: 'dev',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.dev}
                        onBlur={(e) => editField(row.key, 'dev_prefix', e.target.value)}
                    />
                ),
            },
            {
                title: 'Префикс IFT',
                dataIndex: 'ift',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.ift}
                        onBlur={(e) => editField(row.key, 'ift_prefix', e.target.value)}
                    />
                ),
            },
            {
                title: 'Префикс UAT',
                dataIndex: 'uat',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.uat}
                        onBlur={(e) => editField(row.key, 'uat_prefix', e.target.value)}
                    />
                ),
            },
            {
                title: 'Префикс PSI',
                dataIndex: 'psi',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.psi}
                        onBlur={(e) => editField(row.key, 'pci_prefix', e.target.value)}
                    />
                ),
            },
            {
                title: 'Префикс PROM',
                dataIndex: 'prom',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.prom}
                        onBlur={(e) => editField(row.key, 'prom_prefix', e.target.value)}
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
            dataSource={normAcesList}
            loading={updateLoading || deleteLoading}
            bordered
            locale={{
                emptyText: 'Нет данных',
            }}
        />
    );
};
