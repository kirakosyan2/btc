import { Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';

import {
    DeployPayload,
    useDeployMutation,
    useUploadVarsMutation,
} from '@src/redux/deploy/deploy';
import { useJenkinsQuery } from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { JenkinsView } from './Jenkins.view';

type Props = {
    isReference: boolean;
};

export type OptionsSelect = {
    value: string;
    label: string;
};

export type FormProps = {
    branch: string;
    job: string;
};

export const Jenkins: React.FC<Props> = ({ isReference }) => {
    const { id: id_etl } = useParams();
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    const [jobLinkParams, setJobLinkParams] = useState('');
    const [jobLinkVariables, setJobLinkVariables] = useState('');

    // Query
    const { data: jenkins, isLoading: isLoadingJenkins } = useJenkinsQuery(
        id_etl as string,
        {
            skip: !id_etl,
        }
    );

    // Mutations
    const [deploy, { isLoading: isLoadingDeploy }] = useDeployMutation();
    const [uploadVars, { isLoading: isLoadingUploadVars }] =
        useUploadVarsMutation();

    const normBranch: OptionsSelect[] = useMemo(
        () =>
            jenkins?.branch.length
                ? jenkins.branch.map((item) => ({
                      value: item,
                      label: item,
                  }))
                : [],
        [jenkins?.branch]
    );

    useEffect(() => {
        if (jenkins) {
            form.setFieldsValue({
                job: jenkins?.job_name,
                branch: normBranch?.[0]?.value,
            });
        }
    }, [jenkins]);

    const onSubmit = async ({ branch }: FormProps) => {
        if (isReference) return;

        const payload: DeployPayload = {
            id: String(id_etl),
            branch_name: branch,
        };

        const res: any = await deploy(payload);
        setJobLinkParams(res.data?.job_link);

        if (res?.data) {
            notificationEasy({
                content: 'Развертывание успешно запущено',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: 'Произошла ошибка при запуске развертывания',
            });
        }
    };

    const handleUploadVars = async () => {
        if (isReference) return;

        await form.validateFields().then(async (date: FormProps) => {
            const payload: DeployPayload = {
                id: String(id_etl),
                branch_name: date.branch,
            };

            const res: any = await uploadVars(payload);
            setJobLinkVariables(res.data?.job_link);

            if (res?.data) {
                notificationEasy({
                    content: 'Развертывание успешно запущено',
                });
            } else {
                notificationEasy({
                    type: 'error',
                    content: 'Произошла ошибка при запуске развертывания',
                });
            }
        });
    };

    return (
        <UIForm onFinish={onSubmit} layout="vertical" form={form}>
            <JenkinsView
                linkJob={jenkins?.job_link}
                options={normBranch}
                jobLinkParams={jobLinkParams}
                jobLinkVariables={jobLinkVariables}
                isLoadingJenkins={isLoadingJenkins}
                isLoadingDeploy={isLoadingDeploy}
                isLoadingUploadVars={isLoadingUploadVars}
                role={role}
                handleUploadVars={handleUploadVars}
            />
        </UIForm>
    );
};
