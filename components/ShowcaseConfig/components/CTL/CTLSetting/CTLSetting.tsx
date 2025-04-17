import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UITable } from '@components/_shared/Table';
import { UITypography } from '@components/_shared/Typography';
import { ColumnsType } from 'antd/es/table';
import { UIInput } from '@components/_shared/Input';
import { eUserRoles } from '@src/redux/auth/auth';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';
import {
    CTLCategory,
    useCtlCategoryQuery,
    useUpdateCtlCategoryMutation,
} from '@src/redux/config/configs';

type DataType = {
    key: string;
    parametr: string;
    meaning: string;
    name: React.ReactNode;
};

export const CTLSetting: React.FC = () => {
    const cx = useStyles(styles);
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: ctlCategory, isLoading } = useCtlCategoryQuery();

    // Mutations
    const [updateCTL, { isLoading: isLoadingUpdate }] = useUpdateCtlCategoryMutation();

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Параметр',
                dataIndex: 'parametr',
                key: 'key',
                render: (_, row) => (
                    <UITypography className={cx('parametr')}>{row.parametr}</UITypography>
                ),
            },
            {
                title: 'Описание ',
                dataIndex: 'name',
                key: 'key',
                render: (_, row) => (
                    <UITypography className={cx('parametr')}>{row.name}</UITypography>
                ),
            },
            {
                title: 'Значение',
                dataIndex: 'meaning',
                key: 'key',
                render: (_, row) => (
                    <UIInput
                        defaultValue={row.meaning}
                        onBlur={(e) => editField(row.key, e.target.value)}
                        disabled={[eUserRoles.BUISNESS, eUserRoles.ETL_DEVELOPER].includes(
                            role as eUserRoles,
                        )}
                    />
                ),
            },
        ],
        [],
    );

    const normSettingList: DataType[] = useMemo(() => {
        const arr: DataType[] = [];

        if (ctlCategory) {
            arr.push({
                key: 'category',
                parametr: 'CTL категория',
                name: (
                    <UITypography>
                        Базовая категория CTL сущностей ваших витрин
                        <br />
                        <strong>Например: p1167</strong>
                    </UITypography>
                ),
                meaning: ctlCategory.entity_category,
            });
        }

        return arr;
    }, [ctlCategory]);

    const editField = async (_: string, data: any) => {
        const payload: CTLCategory = {
            entity_category: data,
        };
        const res: any = await updateCTL(payload);
        if (res?.data) {
            notificationEasy({
                content: 'S2T успешно обновлен',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при обновлении S2T',
            });
        }
    };

    return (
        <UITable<DataType>
            columns={columns}
            dataSource={normSettingList}
            loading={isLoading || isLoadingUpdate}
            bordered
            pagination={false}
            locale={{
                emptyText: 'Нет данных',
            }}
        />
    );
};
