import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';

import { UIInput } from '@components/_shared/Input';
import { UITable } from '@components/_shared/Table';
import { UITypography } from '@components/_shared/Typography';
import { useStyles } from '@hooks/useStyles';
import { eUserRoles } from '@src/redux/auth/auth';
import {
    ShowcaseUpdateBase,
    useBaseQuery,
    useUpdateBaseMutation,
} from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

type DataType = {
    key: string;
    parametr: string;
    meaning: string;
    name: React.ReactNode;
};

export const TableCTL: React.FC = () => {
    const cx = useStyles(styles);
    const { id: datamartID } = useParams();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: baseData, isLoading } = useBaseQuery(datamartID as string, {
        skip: !datamartID,
    });

    // Mutations
    const [updateBase, { isLoading: isLoadingUpdate }] =
        useUpdateBaseMutation();

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Параметр',
                dataIndex: 'parametr',
                key: 'key',
                render: (_, row) => (
                    <UITypography className={cx('parametr')}>
                        {row.parametr}
                    </UITypography>
                ),
            },
            {
                title: 'Описание ',
                dataIndex: 'name',
                key: 'key',
                render: (_, row) => (
                    <UITypography className={cx('parametr')}>
                        {row.name}
                    </UITypography>
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
                        disabled={[
                            eUserRoles.BUISNESS,
                            eUserRoles.ETL_DEVELOPER,
                        ].includes(role as eUserRoles)}
                    />
                ),
            },
        ],
        []
    );

    const normSettingList: DataType[] = useMemo(() => {
        const arr: DataType[] = [];

        if (baseData) {
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
                meaning: baseData.entity_category,
            });
        }

        return arr;
    }, [baseData]);

    const editField = async (_: string, data: any) => {
        const payload: ShowcaseUpdateBase = {
            id: datamartID as string,
            entity_category: data,
        };
        const res: any = await updateBase(payload);
        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно сохранены',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при сохранении данных',
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
