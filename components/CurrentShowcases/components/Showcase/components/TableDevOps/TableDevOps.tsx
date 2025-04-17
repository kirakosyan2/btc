import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';

import { UIInput } from '@components/_shared/Input';
import { UISelect } from '@components/_shared/Select';
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
import { useClusterLinesQuery } from '@src/redux/types/type';
import { notificationEasy } from '@src/utils';

type DataType = {
    key: string;
    description: React.ReactNode;
    parametr: string;
    meaning: string;
};

export const TableDevOps: React.FC = () => {
    const cx = useStyles(styles);
    const { id: datamartID } = useParams();
    const { role } = useAppSelector((store) => store.auth);

    //Query
    const { data: clusterLine, isLoading: isLoadingClustersLines } =
        useClusterLinesQuery();

    const { data: baseData, isLoading } = useBaseQuery(datamartID as string, {
        skip: !datamartID,
    });

    //Mutations
    const [updateBase, { isLoading: isLoadingUpdate }] =
        useUpdateBaseMutation();

    const editField = async (_: string, data: any) => {
        const payload: ShowcaseUpdateBase = {
            id: datamartID as string,
            cluster_line: data,
        };

        const res: any = await updateBase(payload);

        if (res?.data) {
            notificationEasy({
                content: 'DevOps успешно обновлен',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при обвновлении DevOps',
            });
        }
    };

    const normDevOpsLisd: DataType[] = useMemo(() => {
        const arr: DataType[] = [];

        if (baseData) {
            arr.push({
                key: 'devops',
                description: (
                    <>
                        Линейка кластеров на которую планируется деплоить
                        витрины
                        <br />
                        <strong>Пример: ganza</strong>
                    </>
                ),
                parametr: 'Линейка кластеров',
                meaning: baseData.cluster_line,
            });
        }

        return arr;
    }, [baseData]);

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
                        {row.description}
                    </UITypography>
                ),
            },
            {
                title: 'Значение',
                dataIndex: 'meaning',
                key: 'key',
                render: (_, row) => {
                    if (row.parametr === 'Линейка кластеров') {
                        return (
                            <UISelect
                                className={cx('select')}
                                defaultValue={row.meaning}
                                options={clusterLine ?? []}
                                loading={isLoadingClustersLines}
                                disabled={isLoadingClustersLines}
                                onChange={(e: string) => editField(row.key, e)}
                            />
                        );
                    } else {
                        return (
                            <UIInput
                                defaultValue={row.meaning}
                                onBlur={(e) =>
                                    editField(row.key, e.target.value)
                                }
                                disabled={[
                                    eUserRoles.BUISNESS,
                                    eUserRoles.ETL_DEVELOPER,
                                ].includes(role as eUserRoles)}
                            />
                        );
                    }
                },
            },
        ],
        [clusterLine]
    );

    return (
        <UITable<DataType>
            columns={columns}
            dataSource={normDevOpsLisd}
            loading={isLoading || isLoadingUpdate}
            bordered
            pagination={false}
            locale={{
                emptyText: 'Нет данных',
            }}
        />
    );
};
