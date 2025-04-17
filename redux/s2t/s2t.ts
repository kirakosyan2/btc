import { UUID } from '@src/types/types';

import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const s2tApi = createApi({
    reducerPath: 's2tRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    endpoints: (builder) => ({
        showcases: builder.query<TransformShowcaseList[], void>({
            query: () => ({
                url: 'team/datamart_list/',
                method: 'GET',
            }),
            transformResponse: (
                data: ShowcaseList[]
            ): TransformShowcaseList[] => {
                return data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                }));
            },
        }),

        dataMart: builder.mutation<DataMart, string>({
            query: (id) => ({
                url: `s2t/${id}/get_datamart/`,
                method: 'GET',
            }),
        }),

        parseRepo: builder.mutation<ParseRepo, ParseRepoPayload>({
            query: (body) => ({
                url: `s2t/parse_repository/`,
                method: 'POST',
                body,
            }),
        }),

        makeS2T: builder.mutation<void, MakeS2TPayload>({
            query: (body) => ({
                url: `s2t/make_s2t/`,
                method: 'POST',
                body,
            }),
        }),

        datamartList: builder.query<TransformDatamartList[], void>({
            query: () => ({
                url: 'team/datamart_list/',
                method: 'GET',
            }),
            transformResponse: (
                data: DatamartList[]
            ): TransformDatamartList[] => {
                return data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                }));
            },
        }),

        parseBranch: builder.mutation<ParseBranch, string>({
            query: (id) => ({
                url: `s2t/${id}/parse_branch/`,
                method: 'GET',
            }),
        }),

        makeS2TBranch: builder.mutation<MakeRequest, MakePayload>({
            query: (body) => ({
                url: `s2t/make_s2t/`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export type TransformDatamartList = {
    value: number;
    label: string;
};

export type DatamartList = {
    id: number;
    name: string;
};

export type TTargetTable = {
    scheme: string;
    name: string;
    description?: string;
};

export type TSourceTable = {
    platform: string;
    instance: string;
    scheme: string;
    name: string;
};

export type SourceToTarget = {
    target_table: TTargetTable;
    source_table: TSourceTable;
};

export type CTLToTarget = {
    target_table: TTargetTable;
    ctl_id: UUID;
};

export type ParseBranch = {
    branch_id: UUID;
    source_to_target: SourceToTarget[];
    ctl_to_target: CTLToTarget[];
};

export type MakePayload = {
    datamart_id: string;
    branch_id: string;
    datamart_code: string;
    datamart_description: string;
    datamart_business_name: string;
    datamart_status: string;
    source_to_target: [
        { target_table: TTargetTable[] },
        { source_table: TSourceTable[] },
    ];
    ctl_to_target: [{ target_table: TTargetTable[] }, { ctl_id: string[] }];
};

export type MakeRequest = {
    s2t_link: string;
};

// TODO: Нижнее можно убрать после реализации нового S2T

export type TransformShowcaseList = {
    value: number;
    label: string;
};

export type ShowcaseList = {
    id: number;
    name: string;
};

export type DataMart = {
    confluence_link: string;
    ctl_entity_id: string;
    datamart_name: string;
    repo_branches: string[];
    repo_ssh_link: string;
    tuz: number;
};

export type SourceTableSchemes = {
    scheme_name: string;
    new_scheme_name: string;
};

export type SourceTablesInstances = {
    table: string;
    instance: string;
};

export type SourceTablesNames = {
    table_name: string;
    new_table_name: string;
};

export type ParseRepo = {
    datamart_id: number;
    repo_link: string;
    repo_branch: string;
    parse_data: {
        source_tables_schemas: SourceTableSchemes[];
        target_tables_names: SourceTablesNames[];
        source_tables_instances: SourceTablesInstances[];
    };
};

export type ParseRepoPayload = {
    datamart_id: number;
    repo_link: string;
    repo_branch: string;
};

export type MakeS2TPayload = {
    datamart_id: number;
    datamart_code: string;
    datamart_technical_account: string;
    datamart_description: string;
    datamart_confluence_link: string;
    datamart_repo_link: string;
    datamart_ctl_entity_id: string;
    datamart_repo_branch: string;
    datamart_name: string;
    src_data: SourceTableSchemes[];
    src_inst_data: SourceTablesInstances[];
    trg_data: SourceTablesNames[];
};

export const {
    useShowcasesQuery,
    useDataMartMutation,
    useParseRepoMutation,
    useMakeS2TMutation,

    useDatamartListQuery,
    useParseBranchMutation,
    useMakeS2TBranchMutation,
} = s2tApi;
