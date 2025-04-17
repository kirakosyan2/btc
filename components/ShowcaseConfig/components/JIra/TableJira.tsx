import { UITable } from '@components/_shared/Table';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UIInput } from '@components/_shared/Input';
import { UITypography } from '@components/_shared/Typography';
import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';
import {
    ShowcaseUpdateJira,
    useShowcaseConfigJiraQuery,
    useUpdateShowcaseConfigJiraMutation,
} from '@src/redux/config/configs';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';
import { eUserRoles } from '@src/redux/auth/auth';
import { UIAlert } from '@components/_shared/Alert';

type DataType = {
    key: string;
    description: React.ReactNode;
    parametr: string;
    meaning: string;
};

type JiraDictionary = {
    parametr: string;
    description: React.ReactNode;
};

const JIRA_DICTIONARY: Record<string, JiraDictionary> = {
    jira_project_name: {
        parametr: 'Номер проекта Jira',
        description: (
            <>
                Получить из ссылки на Requirements в настройках проекта Jira
                https://jira.delta.sbrf.ru/secure/requirements-main!edit.jspa?projectId=123456
                <br />
                <strong>Пример: 123456</strong>
            </>
        ),
    },
    jira_project_number: {
        parametr: 'Название проекта Jira',
        description: (
            <>
                <a></a>
                Получить из ссылки на проект https://jira.delta.sbrf.ru/projects/PKAPB2C/summary
                <br />
                <strong>Пример: PKAPB2C</strong>
            </>
        ),
    },
};

export const TableJira: React.FC = () => {
    const cx = useStyles(styles);
    const { role } = useAppSelector((store) => store.auth);

    //Query
    const { data: jiraList, isLoading } = useShowcaseConfigJiraQuery();

    //Mutation
    const [updateJiralist, { isLoading: isLoadingUpdate }] = useUpdateShowcaseConfigJiraMutation();

    const editField = async (field: string, data: any) => {
        const payload: ShowcaseUpdateJira = {
            [field]: data,
        };

        const res: any = await updateJiralist(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Jira успешно обновлена',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при обновлении Jira',
            });
        }
    };

    const normJiraList: DataType[] = useMemo(() => {
        const arr: DataType[] = [];

        if (jiraList && Object.values(jiraList).length) {
            for (const [key, value] of Object.entries(jiraList)) {
                arr.push({
                    key,
                    description: JIRA_DICTIONARY[key].description,
                    parametr: JIRA_DICTIONARY[key].parametr,
                    meaning: value,
                });
            }
        }

        return arr;
    }, [jiraList]);

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
                Jira
            </UITitle>
            <UIAlert className={cx('aletr')}
                message={
                    <UITypography strong>
                        В пространстве должна быть роль РМК
                    </UITypography>
                }
            />
            <UITable<DataType>
                columns={columns}
                dataSource={normJiraList}
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
