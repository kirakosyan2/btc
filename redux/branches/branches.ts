import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const branchesApi = createApi({
    reducerPath: 'branchesRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['branchList', 'streams'],
    endpoints: (builder) => ({
        branchList: builder.query<Branch, string>({
            query: (id) => ({
                url: `branch/${id}/`,
                method: 'GET',
            }),
            providesTags: ['branchList'],
        }),

        updateBranch: builder.mutation<void, UpdateBranch>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `branch/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['branchList'],
        }),

        createBranch: builder.mutation<void, CreateBranch>({
            query: (body) => ({
                url: `branch/`,
                method: 'POST',
                body,
            }),
        }),

        ddlCurrentBranch: builder.query<DataCurrentBranch[], string>({
            query: (id) => ({
                url: `branch/${id}/ddl/`,
                method: 'GET',
            }),
        }),

        datamartBranchList: builder.mutation<DatamartBranchList[], string>({
            query: (id) => ({
                url: `datamart/${id}/branch-list/`,
                method: 'GET',
            }),
        }),
    }),
});

export type Branch = {
    id: number;
    datamart_name: string;
    developer_name: string;
    name: string;
    upload_date_time: string;
    start_date_time: string;
    datamart_version: string;
    load_status: string;
    ddl_code: string;
    jira_task: string;
    emails: string;
    datamart: number;
    developer: number;
    task_type: number;
    task_status: number;
};

export type DataCurrentBranch = {
    id: number;
    code?: string;
    branch?: number;
    name: string;
    index?: number;
};

export type UpdateBranch = {
    id: string;
    datamart_name?: string;
    developer_name?: string;
    name?: string;
    upload_date_time?: string;
    start_date_time?: string;
    datamart_version?: string;
    load_status?: string;
    ddl_code?: string;
    jira_task?: string;
    emails?: string;
    datamart?: number;
    developer?: number;
    task_type?: number;
    task_status?: number;
};

export type CreateBranch = {
    datamart: string;
    developer: string;
    task_type: number;
    name: string;
};

export type DatamartBranchList = {
    id: number;
    name: string;
    developer_name: string;
    task_type: string;
    task_status: string;
};

export type TBranch = {
    value: string | number;
    label: string;
};

export const {
    useBranchListQuery,
    useUpdateBranchMutation,
    useCreateBranchMutation,
    useDdlCurrentBranchQuery,
    useDatamartBranchListMutation,
} = branchesApi;
