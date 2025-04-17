import { Form } from 'antd';
import React from 'react';

import { StaticContentView } from './StaticContent.view';

import { UIForm } from '@components/_shared/Form';
import {
    NormStatistics,
    Statistics,
    StatisticsUpdatePayload,
    useStatisticsQuery,
    useUpdateStatisticsMutation,
} from '@src/redux/DQC/DQC';
import { addDQC, changeDQC, removeDQC } from '@src/redux/DQC/DQC.slice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';
import { convertStrUnderscores } from '@src/utils/common';

type Props = {
    threadId: string;
    onClose: () => void;
};

type FormProps = {
    type: string;
};

export const StaticContent: React.FC<Props> = ({ threadId }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const { role } = useAppSelector((store) => store.auth);
    const { data } = useAppSelector((store) => store.DQC);

    // Query
    useStatisticsQuery(threadId, {
        skip: !threadId,
    });

    // Mutations
    const [updateStatistics, { isLoading: isLoadingUpdate }] =
        useUpdateStatisticsMutation();

    const addStatistic = ({ type }: FormProps) => {
        const payload: NormStatistics = {
            id: `${new Date().getMilliseconds() + Math.random()}`,
            name: undefined,
            value: type,
            query: undefined,
            columns: undefined,
            table: undefined,
            aggType: undefined,
            enabled: false,
            format: undefined,
            excluded_letters: undefined,
            check_cyrillic: type === 'CheckFormat' ? false : undefined,
            primary_keys: undefined,
            startdt_enddt: undefined,
            default: undefined,
            category: undefined,
        };

        dispatch(addDQC(payload));
    };

    const removeStatistic = (id: string) => {
        dispatch(removeDQC(id));
    };

    const onChangeFieldStatistic = (
        id: string,
        value: string | boolean,
        field: string
    ) => {
        dispatch(
            changeDQC({
                id,
                value,
                field,
            })
        );
    };

    const onSubmit = async () => {
        const normalStatistic: Statistics[] = data.map((item) => ({
            id: item.id,
            name: convertStrUnderscores(item.name) as string,
            value: item.value,
            params: {
                table: item.table,
                columns: item.columns,
                query: item.query,
                aggType: item.aggType,
                format: item.format,
                excluded_letters: item.excluded_letters,
                check_cyrillic: item.check_cyrillic,
                primary_keys: item.primary_keys,
                startdt_enddt: item.startdt_enddt,
                default: item.default,
            },
            enabled: item.enabled,
            category: item.name,
        }));

        const payload: StatisticsUpdatePayload = {
            id: threadId,
            statistics: normalStatistic,
        };

        const res: any = await updateStatistics(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные сохранены',
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
        <UIForm form={form} layout="vertical" onFinish={addStatistic}>
            <StaticContentView
                data={data}
                role={role}
                isLoadingUpdate={isLoadingUpdate}
                removeStatistic={removeStatistic}
                onChangeField={onChangeFieldStatistic}
                onSubmit={onSubmit}
            />
        </UIForm>
    );
};
