import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BitBucketView } from './BitBucket.view';

import { UIForm } from '@components/_shared/Form';
import {
    UpdateBranch,
    useBranchListQuery,
    useUpdateBranchMutation,
} from '@src/redux/branches/branches';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

type Props = {
    isReference: boolean;
};

type FormProps = {
    branch: string;
    email: string;
    jira: string;
};

export const BitBucket: React.FC<Props> = ({ isReference }) => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const { role } = useAppSelector((store) => store.auth);

    //Query
    const { data: branch } = useBranchListQuery(id as string, {
        skip: !id,
    });

    //Mitation
    const [updateBitbucket, { isLoading: isLoadingUpdate }] =
        useUpdateBranchMutation();

    useEffect(() => {
        if (branch) {
            form.setFieldsValue({
                branch: branch.name,
                email: branch.emails,
                jira: branch.jira_task,
            });
        }
    }, [branch]);

    const onChangeField = debounce(async (field: FormProps) => {
        if (isReference) return;

        const payload: UpdateBranch = {
            id: String(id),
            name: field.branch,
            emails: field.email,
            jira_task: field.jira,
        };

        const res: any = await updateBitbucket(payload);

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
            <BitBucketView isLoadingUpdate={isLoadingUpdate} role={role} />
        </UIForm>
    );
};
