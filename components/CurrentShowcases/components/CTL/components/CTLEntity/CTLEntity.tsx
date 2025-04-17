import { Icon } from '@components/_shared/Icon';
import { UIInput } from '@components/_shared/Input';
import { UITable } from '@components/_shared/Table';
import { notificationEasy } from '@src/utils';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import {
    ShowcaseCTLDeletePayload,
    ShowcaseCTLUpdatePayload,
    useDeleteCtlMutation,
    useUpdateCtlMutation,
} from '@src/redux/showcases/showcase';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@src/redux/store';
import { eUserRoles } from '@src/redux/auth/auth';
import { UITypography } from '@components/_shared/Typography';
import { useCtlCategoryQuery } from '@src/redux/config/configs';
import { UIFlex } from '@components/_shared/Flex';

type Props = {
    id: string;
    datamart: number;
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
};

type DataType = {
    key: string;
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
};
export const CTLEntity: React.FC<Props> = (data) => {
    const cx = useStyles(styles);
    const { id: etl_id } = useParams();
    const { role } = useAppSelector((store) => store.auth);

    const normDateList: DataType[] = useMemo(
        () =>
            [data].map((item) => ({
                key: item.id,
                entity_id: item.entity_id,
                entity_name: item.entity_name,
                entity_path: item.entity_path,
                entity_category: item.entity_category,
            })),
        [data],
    );

    // Query
    const { data: ctlCategory, isLoading: isLoadingCategory } = useCtlCategoryQuery();

    // Mutations
    const [deleteCTL, { isLoading: isLoadingDelete }] = useDeleteCtlMutation();
    const [updateCTL, { isLoading: isLoadingUpdate }] = useUpdateCtlMutation();

    const onDelete = (id: string) => {
        return async () => {
            const payload: ShowcaseCTLDeletePayload = {
                id: String(id),
                etl_id: String(etl_id),
            };

            const res: any = await deleteCTL(payload);

            if (res?.data) {
                notificationEasy({
                    content: 'CTL сущность успешно удалена',
                });
            } else {
                notificationEasy({
                    type: 'error',
                    content: res?.error.data.detail ?? 'Произошла ошибка при удалении CTL сущности',
                });
            }
        };
    };

    const editField = async (id: string, field: string, data: any) => {
        const payload: ShowcaseCTLUpdatePayload = {
            id: String(id),
            etl_id: String(etl_id),
            [field]: data,
        };

        const res: any = await updateCTL(payload);

        if (res?.data) {
            notificationEasy({
                content: 'CTL сущность успешно обновлена',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при обновлении CTL сущности',
            });
        }
    };

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'ID сущности',
                dataIndex: 'entity_id',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.entity_id}
                        disabled
                    />
                ),
            },
            {
                title: 'Название сущности',
                dataIndex: 'entity_name',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.entity_name}
                        onBlur={(e) => editField(row.key, 'entity_name', e.target.value)}
                        disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                    />
                ),
            },
            {
                title: 'Путь сущности',
                dataIndex: 'entity_path',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.entity_path}
                        onBlur={(e) => editField(row.key, 'entity_path', e.target.value)}
                        disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                    />
                ),
            },
            {
                title: 'Категория сущности',
                dataIndex: 'entity_category',
                key: 'key',
                render: (_, row) => (
                    <UIFlex
                        className={cx('category')}
                        align="center"
                    >
                        <UITypography className={cx('text')}>
                            <strong>{ctlCategory?.entity_category}</strong>
                        </UITypography>
                        /
                        <UIInput
                            className={cx('itemCategory')}
                            defaultValue={row.entity_category}
                            onBlur={(e) => editField(row.key, 'entity_category', e.target.value)}
                            disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                        />
                    </UIFlex>
                ),
            },
            {
                title: 'Удаление',
                key: 'key',
                render: (_, row) => (
                    <Icon
                        className={cx('icon')}
                        type="delete-outlined"
                        onClick={
                            ![eUserRoles.BUISNESS].includes(role as eUserRoles)
                                ? onDelete(row.key)
                                : () => {}
                        }
                    />
                ),
            },
        ],
        [ctlCategory],
    );

    return (
        <UITable<DataType>
            columns={columns}
            dataSource={normDateList}
            pagination={false}
            loading={isLoadingDelete || isLoadingUpdate || isLoadingCategory}
            bordered
            locale={{
                emptyText: 'Нет данных',
            }}
        />
    );
};
