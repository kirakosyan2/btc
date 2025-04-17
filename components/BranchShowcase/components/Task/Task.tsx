import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { TaskView } from './Task.view';

import { UIForm } from '@components/_shared/Form';
import {
    UpdateBranch,
    useBranchListQuery,
    useUpdateBranchMutation,
} from '@src/redux/branches/branches';
import { useDevelopersQuery } from '@src/redux/developers/developers';
import { useAppSelector } from '@src/redux/store';
import { useTasksQuery } from '@src/redux/types/type';
import { notificationEasy } from '@src/utils';

type Props = {
    isReference: boolean;
};

type FormProps = {
    showcase: string;
    branch: string;
    developer_name: number;
    load_status: number;
    start_date_time: string;
};

export const Task: React.FC<Props> = ({ isReference }) => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const { role } = useAppSelector((store) => store.auth);

    //Query
    const { data: developersList, isLoading: isLoadingDevelopers } =
        useDevelopersQuery();
    const { data: taskStatusList, isLoading: isLoadingStatus } =
        useTasksQuery();

    const { data: branch } = useBranchListQuery(id as string, {
        skip: !id,
    });

    //Mutation
    const [updateTask, { isLoading: isLoadingUpdate }] =
        useUpdateBranchMutation();

    useEffect(() => {
        if (branch) {
            form.setFieldsValue({
                showcase: branch.datamart_name,
                branch: branch.name,
                developer_name: branch.developer,
                load_status: branch.task_status,
                start_date_time: branch.start_date_time,
            });
        }
    }, [branch]);

    const onChangeField = debounce(async (field: FormProps) => {
        if (isReference) return;

        const payload: UpdateBranch = {
            id: String(id),
            datamart_name: field.showcase,
            name: field.branch,
            developer: field.developer_name,
            task_status: field.load_status,
            start_date_time: field.start_date_time,
        };

        const res: any = await updateTask(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно обновлены',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при обновлении данных',
            });
        }
    }, 700);

    return (
        <UIForm
            onValuesChange={(_, allValues) => onChangeField(allValues)}
            layout="vertical"
            form={form}>
            <TaskView
                developersList={developersList ?? []}
                taskStatusList={taskStatusList ?? []}
                isLoadingDevelopers={isLoadingDevelopers}
                isLoadingData={isLoadingUpdate}
                isLoadingStatus={isLoadingStatus}
                role={role}
            />
        </UIForm>
    );
};
