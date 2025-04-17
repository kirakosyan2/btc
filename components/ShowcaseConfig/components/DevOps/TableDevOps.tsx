import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';

import { UICard } from '@components/_shared/Card';
import { UIInput } from '@components/_shared/Input';
import { UISelect } from '@components/_shared/Select';
import { UITable } from '@components/_shared/Table';
import { UITitle } from '@components/_shared/Title';
import { UITypography } from '@components/_shared/Typography';
import { useStyles } from '@hooks/useStyles';
import { eUserRoles } from '@src/redux/auth/auth';
import {
    ShowcaseUpdateDevOps,
    useShowcaseConfigDevopsQuery,
    useUpdateShowcaseConfigDevOpsMutation,
} from '@src/redux/config/configs';
import { useAppSelector } from '@src/redux/store';
import { useClusterLinesQuery } from '@src/redux/types/type';
import { notificationEasy } from '@src/utils';

import styles from './styles.module.scss';

type DataType = {
    key: string;
    description: React.ReactNode;
    parametr: string;
    meaning: string;
};

type DevOpsDictionary = {
    parametr: string;
    description: React.ReactNode;
};

const DEVOPS_DICTIONARY: Record<string, DevOpsDictionary> = {
    ci_pkap_as: {
        parametr: 'КЭ ПКАП АС',
        description: (
            <>
                КЭ ПКАП АС в рамках которой планируется внедрять функционал
                <br />
                <strong>Пример: CI05021966</strong>
            </>
        ),
    },
    mus_code: {
        parametr: 'МУС код',
        description: (
            <>
                МУС код получается при регистрации проекта в SAST.
                <br />
                <strong>Например: 00OD0001</strong>
            </>
        ),
    },
    mus_name: {
        parametr: 'МУС имя',
        description: (
            <>
                МУС имя получается при регистрации проекта в SAST.
                <br />
                <strong>Например: B2C-SQL</strong>
            </>
        ),
    },
    cluster_line: {
        parametr: 'Линейка кластеров',
        description: (
            <>
                Линейка кластеров на которую планируется деплоить витрины
                <br />
                <strong>Пример: ganza</strong>
            </>
        ),
    },
};

export const TableDevOps: React.FC = () => {
    const cx = useStyles(styles);
    const { role } = useAppSelector((store) => store.auth);

    //Query
    const { data: devOpsList, isLoading } = useShowcaseConfigDevopsQuery();
    const { data: clusterLine, isLoading: isLoadingClustersLines } =
        useClusterLinesQuery();

    //Mutations
    const [updateDevOpslisd, { isLoading: isLoadingUpdate }] =
        useUpdateShowcaseConfigDevOpsMutation();

    const editField = async (field: string, data: any) => {
        const payload: ShowcaseUpdateDevOps = {
            [field]: data,
        };

        const res: any = await updateDevOpslisd(payload);

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

        if (devOpsList && Object.values(devOpsList).length) {
            for (const [key, value] of Object.entries(devOpsList)) {
                arr.push({
                    key,
                    description: DEVOPS_DICTIONARY[key]?.description,
                    parametr: DEVOPS_DICTIONARY[key]?.parametr,
                    meaning: value,
                });
            }
        }

        return arr;
    }, [devOpsList]);

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
        <UICard>
            <UITitle level={3} className={cx('title')}>
                DevOps
            </UITitle>
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
        </UICard>
    );
};
