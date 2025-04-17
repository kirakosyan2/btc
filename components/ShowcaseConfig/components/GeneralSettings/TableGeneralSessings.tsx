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
    ShowcaseUpdateConfigGeneral,
    useShowcaseConfigGeneralQuery,
    useUpdateShowcaseConfigGeneralMutation,
} from '@src/redux/config/configs';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';
import { eUserRoles } from '@src/redux/auth/auth';

type DataType = {
    key: string;
    description: React.ReactNode;
    parametr: string;
    meaning: string | number;
};

type SettingDictionary = {
    parametr: string;
    description: React.ReactNode;
};

const SETTINGS_DICTIONARY: Record<string, SettingDictionary> = {
    team: {
        parametr: 'Команда',
        description: 'Название вашей команды',
    },
    repo_prefix: {
        parametr: 'Префикс для репозиториев',
        description: (
            <>
                Префикс, который будет автоматически подставляться к именам всех репозиториев
                команды, созданных через B2C-SQL UI.
                <br />
                <strong>Пример: datamart</strong>
            </>
        ),
    },
    notification_emails: {
        parametr: 'Почтовые адреса',
        description: (
            <>
                Почтовые адреса на которые будут приходить уведомления о создании/изминении витрин.
                <br />
                <strong>Пример: nvtarakanovskiy@sberbank.ru, AYusufNurshinov@sberbank.ru</strong>
            </>
        ),
    },
    bitbucket_workspace: {
        parametr: 'Пространство в BitBucket',
        description: (
            <>
                Пространство в BitBucket, в котором будут создаваться репозитории. Получить можно из
                ссылки: https://stash.delta.sbrf.ru/projects/SQL
                <br />
                <strong>
                    Пример: SQL
                    <br />
                    <br />
                    Убедитесь, что ТУЗ sa-sdvp00000867 добавлен в пространство с правами
                    администратора!
                </strong>
            </>
        ),
    },
};

export const TableGeneralSettings: React.FC = () => {
    const cx = useStyles(styles);
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: configList, isLoading } = useShowcaseConfigGeneralQuery();
    // Mutations
    const [updateConfigList, { isLoading: isLoadingUpdate }] =
        useUpdateShowcaseConfigGeneralMutation();

    const editField = async (field: string, data: any) => {
        const payload: ShowcaseUpdateConfigGeneral = {
            [field]: data,
        };
        const res: any = await updateConfigList(payload);
        if (res?.data) {
            notificationEasy({
                content: 'Настройки успешно обновлены',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при обновлении настроек',
            });
        }
    };

    const normConfigList: DataType[] = useMemo(() => {
        const arr: DataType[] = [];
        if (configList && Object.values(configList).length) {
            for (const [key, value] of Object.entries(configList)) {
                arr.push({
                    key,
                    description: SETTINGS_DICTIONARY[key].description,
                    parametr: SETTINGS_DICTIONARY[key].parametr,
                    meaning: value,
                });
            }
        }
        return arr;
    }, [configList]);

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Параметр',
                dataIndex: 'parametr',
                key: 'key',
                render: (_, row) => (
                    <UITypography className={cx('parametr')}>{row.parametr} </UITypography>
                ),
            },
            {
                title: 'Описание',
                dataIndex: 'description',
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
                        readOnly={row.key === 'team'}
                        onBlur={(e) => {
                            if (row.key !== 'team') {
                                editField(row.key, e.target.value);
                            }
                        }}
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
                Общие настройки
            </UITitle>
            <UITable<DataType>
                columns={columns}
                dataSource={normConfigList}
                bordered
                pagination={false}
                loading={isLoading || isLoadingUpdate}
                locale={{
                    emptyText: 'Нет данных',
                }}
            />
        </UICard>
    );
};
