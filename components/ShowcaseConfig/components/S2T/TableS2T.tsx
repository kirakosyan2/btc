import { UITable } from '@components/_shared/Table';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UIInput } from '@components/_shared/Input';
import { UITypography } from '@components/_shared/Typography';
import { UITitle } from '@components/_shared/Title';
import { UICard } from '@components/_shared/Card';
import {
    ShowcaseUpdateS2T,
    useShowcaseConfigS2TQuery,
    useUpdateShowcaseConfigS2TMutation,
} from '@src/redux/config/configs';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';
import { eUserRoles } from '@src/redux/auth/auth';

type DataType = {
    key: string;
    description: React.ReactNode;
    parametr: string;
    meaning: string;
};

type S2TDictionary = {
    parametr: string;
    description: React.ReactNode;
};

const S2T_DICTIONARY: Record<string, S2TDictionary> = {
    cluster_instance: {
        parametr: 'Инстанс кластера',
        description: (
            <>
                Наименование инстанса, на котором располагаются витрины
                <br />
                <strong>Например: SKLSDPBLAGO</strong>
            </>
        ),
    },
    base_scheme_prefix: {
        parametr: 'Стандартная приписка к схемам',
        description: (
            <>
                Стандартная приписка к схемам (спец-витрина_имя-блока)
                <br />
                <strong>Например: custom_blago_b2c</strong>
            </>
        ),
    },
    po_email: {
        parametr: 'Почтовый адрес',
        description: (
            <>
                Почтовый адрес владельца витрин (по умолчанию)
                <br />
                <strong>Например: RYuKhakhilev@omega.sbrf.ru</strong>
            </>
        ),
    },
    name_pkap_as: {
        parametr: 'Полное наименование АС',
        description: (
            <>
                Полное наименование АС в рамках которой разрабатывается витрина, можно получть в АС МЕТА
                <br />
                <strong>Наример: ПКАП1167 АС Ганза</strong>
            </>
        ),
    },
    code_pkap_as: {
        parametr: 'Код АС',
        description: (
            <>
                Код АС в рамках которой разрабатывается витрина, можно получть в АС МЕТА
                <br />
                <strong>Например: ПКАП1167</strong>
            </>
        ),
    },
};

export const TableS2T: React.FC = () => {
    const cx = useStyles(styles);
    const { role } = useAppSelector((store) => store.auth);

    //Query
    const { data: s2tList, isLoading } = useShowcaseConfigS2TQuery();

    //Mutation
    const [updateS2Tlisd, { isLoading: isLoadingUpdate }] = useUpdateShowcaseConfigS2TMutation();

    const editField = async (field: string, data: any) => {
        const payload: ShowcaseUpdateS2T = {
            [field]: data,
        };

        const res: any = await updateS2Tlisd(payload);

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

    const normS2TLisd: DataType[] = useMemo(() => {
        const arr: DataType[] = [];

        if (s2tList && Object.values(s2tList).length) {
            for (const [key, value] of Object.entries(s2tList)) {
                arr.push({
                    key,
                    description: S2T_DICTIONARY[key]?.description,
                    parametr: S2T_DICTIONARY[key]?.parametr,
                    meaning: value,
                });
            }
        }

        return arr;
    }, [s2tList]);

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
                    <UITypography className={cx('parametr')}>{row.description}</UITypography>
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

    return (
        <UICard>
            <UITitle
                level={3}
                className={cx('title')}
            >
                S2T
            </UITitle>
            <UITable<DataType>
                columns={columns}
                dataSource={normS2TLisd}
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
