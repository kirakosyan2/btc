import { Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import { UIForm } from '@components/_shared/Form';

import {
    TBranch,
    useDatamartBranchListMutation,
} from '@src/redux/branches/branches';
import {
    MakePayload,
    TSourceTable,
    TTargetTable,
    useDatamartListQuery,
    useMakeS2TBranchMutation,
    useParseBranchMutation,
} from '@src/redux/s2t/s2t';
import { notificationEasy } from '@src/utils';

import { S2TView } from './S2T.view';

type FormProps = {
    datamart: string;
    branch: string;
    datamart_code: string;
    datamart_description: string;
    datamart_business_name: string;
    datamart_status: string;
    target_table: TTargetTable[];
    source_table: TSourceTable[];
    ctl_target: TTargetTable[];
    ctls: {
        ctl: string;
    }[];
};

export const S2T: React.FC = () => {
    const [form] = Form.useForm();
    const [link, setLink] = useState('');

    const currDatamart = Form.useWatch('datamart', form);
    const currBranch = Form.useWatch('branch', form);

    // Query
    const { data: datamartList, isLoading: isLoadingDatamart } =
        useDatamartListQuery();

    // Mutations
    const [
        getDatamartBranchList,
        { data: branchList, isLoading: isLoadingBranchList },
    ] = useDatamartBranchListMutation();

    const [makeS2T, { isLoading: isLoadingMakeS2T }] =
        useMakeS2TBranchMutation();

    const [getParseBranch, { data: parseBranch }] = useParseBranchMutation();

    useEffect(() => {
        if (currDatamart) {
            getDatamartBranchList(currDatamart);
        }
    }, [currDatamart]);

    useEffect(() => {
        if (currBranch) {
            getParseBranch(currBranch);
        }
    }, [currBranch]);

    const normBranchList: TBranch[] = useMemo(
        () =>
            branchList?.length
                ? branchList.map((item) => ({
                      value: item.id,
                      label: item.name,
                  }))
                : [],
        [branchList]
    );

    const onSubmit = async (data: FormProps) => {
        const params: MakePayload = {
            datamart_id: data.datamart,
            branch_id: data.branch,
            datamart_code: data.datamart_code,
            datamart_description: data.datamart_description,
            datamart_business_name: data.datamart_business_name,
            datamart_status: data.datamart_status,
            source_to_target: [
                { target_table: data.target_table },
                { source_table: data.source_table },
            ],
            ctl_to_target: [
                { target_table: data.ctl_target },
                { ctl_id: data.ctls.map((item) => item.ctl) },
            ],
        };

        const res = await makeS2T(params);

        if (res?.data?.s2t_link) {
            notificationEasy({
                content: 'Успешно создано',
            });

            setLink(res?.data?.s2t_link);
        } else {
            notificationEasy({
                content: 'Произошла ошибка при создании',
                type: 'error',
            });
        }
    };

    return (
        <UIForm layout="vertical" form={form} onFinish={onSubmit}>
            <S2TView
                datamartList={datamartList ?? []}
                isLoadingDatamart={isLoadingDatamart}
                branchList={normBranchList}
                isLoadingBranchList={isLoadingBranchList}
                currDatamart={currDatamart}
                dateS2T={parseBranch}
                currBranch={currBranch}
                link={link}
                isLoadingMakeS2T={isLoadingMakeS2T}
            />
        </UIForm>
    );
};
