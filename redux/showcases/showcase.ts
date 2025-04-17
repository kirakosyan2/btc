import { Key } from 'react';

import { UUID } from '@src/types/types';

import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const showcasesApi = createApi({
    reducerPath: 'showcasesRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: [
        'showcases',
        'base',
        'clusters',
        'cluster',
        'ctl',
        'checkList',
        'ctls',
    ],
    endpoints: (builder) => ({
        createShowcase: builder.mutation<void, ShowcasePayload>({
            query: (body) => ({
                url: 'datamart/create/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['showcases'],
        }),

        base: builder.query<ShowcaseBase, string>({
            query: (id) => ({
                url: `datamart/${id}/`,
                method: 'GET',
            }),
            providesTags: ['base'],
        }),

        updateBase: builder.mutation<void, ShowcaseUpdateBase>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `datamart/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['base'],
        }),

        currentBranches: builder.query<ShowcaseCurrentBranches[], string>({
            query: (id) => ({
                url: `datamart/${id}/branches/`,
                method: 'GET',
            }),
        }),

        clusters: builder.query<ShowcaseCluster[], string>({
            query: (id) => ({
                url: `datamart/${id}/cluster/`,
                method: 'GET',
            }),
            providesTags: ['clusters'],
        }),

        createClusters: builder.mutation<void, ShowcaseCreateCluster>({
            query: (payload) => ({
                url: `datamart/${payload.etl}/cluster/`,
                method: 'POST',
                body: { ...payload },
            }),
            invalidatesTags: ['clusters'],
        }),

        deleteCluster: builder.mutation<void, ShowcaseDeleteCluster>({
            query: (payload) => ({
                url: `datamart/${payload.etl_id}/cluster/${payload.id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['clusters'],
        }),

        currentCluster: builder.query<
            ShowcaseCurrentCluster,
            ShowcaseCurrentClusterPayload
        >({
            query: (payload) => ({
                url: `datamart/${payload.etl_id}/cluster/${payload.id}/`,
                method: 'GET',
            }),
            providesTags: ['cluster'],
        }),

        updateCurrentClusters: builder.mutation<void, ShowcaseCreateCluster>({
            query: (payload) => {
                const { etl, cluster_type, ...rest } = payload;
                return {
                    url: `datamart/${etl}/cluster/${cluster_type}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['cluster'],
        }),

        deleteCtl: builder.mutation<void, ShowcaseCTLDeletePayload>({
            query: (payload) => ({
                url: `datamart/${payload.etl_id}/ctl/${payload.id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ctls'],
        }),

        updateCtl: builder.mutation<void, ShowcaseCTLUpdatePayload>({
            query: (payload) => {
                const { etl_id, id, ...rest } = payload;
                return {
                    url: `datamart/${etl_id}/ctl/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['ctl'],
        }),

        jenkins: builder.query<ShowcaseJenkins, string>({
            query: (id) => ({
                url: `datamart/${id}/jenkins/`,
                method: 'GET',
            }),
        }),

        ctlList: builder.query<ShowcaseCTLList[], string>({
            query: (id) => ({
                url: `datamart/${id}/ctl/`,
                method: 'GET',
            }),
            providesTags: ['ctls'],
        }),

        createEntityCtl: builder.mutation<void, string>({
            query: (id) => ({
                url: `datamart/${id}/ctl/`,
                method: 'POST',
            }),
            invalidatesTags: ['ctls'],
        }),

        checkList: builder.query<CheckList, string>({
            query: (id) => ({
                url: `datamart/${id}/check_list/`,
                method: 'GET',
            }),
            providesTags: ['checkList'],
        }),

        saveCheckList: builder.mutation<void, CheckListPayload>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `datamart/${id}/check_list/`,
                    method: 'POST',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['checkList'],
        }),

        ctlTree: builder.query<TCTLTreeRequest[], string>({
            query: (id) => ({
                url: `datamart/${id}/config/ctl_tree/`,
                method: 'GET',
            }),
        }),

        ctlTreeCurrConfig: builder.mutation<
            TCTLTreeCurrConfigRequest,
            TCTLTreeCurrConfigPayload
        >({
            query: (params) => ({
                url: `datamart/${params.datamartId}/config/ctl/${params.treeId}/`,
                method: 'GET',
            }),
        }),

        configsTree: builder.query<TConfigsTree[], string>({
            query: (id) => ({
                url: `datamart/${id}/config/ctl/`,
                method: 'GET',
            }),
        }),

        createConfigsTree: builder.mutation<void, TCreateConfigsTreePayload>({
            query: ({ datamartId, ...rest }) => ({
                url: `datamart/${datamartId}/config/ctl/`,
                method: 'POST',
                body: { ...rest },
            }),
        }),

        ctlTreeUpdateCurrConfig: builder.mutation<
            void,
            TCTLTreeUpdateCurrConfigPayload
        >({
            query: ({ datamartId, ctlId, ...rest }) => ({
                url: `datamart/${datamartId}/config/ctl/${ctlId}/`,
                method: 'PATCH',
                body: { ...rest },
            }),
        }),

        deleteConfigTree: builder.mutation<void, TDeleteCurrConfigPayload>({
            query: ({ datamartId, treeId, cascade }) => ({
                url: `datamart/${datamartId}/config/ctl/${treeId}/?is_cascade=${cascade}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export type ShowcaseCTLList = {
    id: string;
    datamart: number;
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
};

export type ShowcasePayload = {
    initiative: number;
    name: string;
    confluence_link: string;
    format: number;
};

export type ShowcaseBase = {
    id: number;
    name: string;
    kibana_app_id: string;
    kibana_app_name: string;
    vars: ShowcaseVars[];
    ci_subsystem: string;
    sm_name: string;
    sonar_project_key: string;
    repo_name: string;
    repo_link: string;
    repo_ssh_link: string;
    repo_create_status: string;
    base_ctl_entity_id: number;
    base_ctl_entity_name: string;
    base_ctl_entity_path: string;
    end_ctl_entity_id: number;
    confluence_link: string;
    format: number;
    tuz: number;
    initiative: number;
    owner_email: string;
    cluster_line: string;
    entity_category: string;
};

export type ShowcaseUpdateBase = {
    id?: string;
    name?: string;
    kibana_app_id?: string;
    kibana_app_name?: string;
    vars?: ShowcaseVars[];
    ci_subsystem?: string;
    sm_name?: string;
    sonar_project_key?: string;
    repo_name?: string;
    repo_link?: string;
    repo_ssh_link?: string;
    repo_create_status?: string;
    base_ctl_entity_id?: number;
    base_ctl_entity_name?: string;
    base_ctl_entity_path?: string;
    end_ctl_entity_id?: number;
    confluence_link?: string;
    format?: number;
    tuz?: number;
    initiative?: number;
    cluster_line?: string;
    entity_category?: string;
};

export type ShowcaseBitbacket = {
    repo_link: string;
    repo_name: string;
    repo_create_status: string;
};

export type ShowcaseUpdateBitbucket = {
    id: string;
    repo_name: string;
};

export type ShowcaseVars = {
    key: string;
    value: string;
};

export type ShowcaseGlobalParams = {
    tuz: number;
    vars: ShowcaseVars[];
    base_ctl_entity_id: number;
    base_ctl_entity_name: string;
    base_ctl_entity_path: string;
    end_ctl_entity_id: number;
};

export type ShowcaseUpdateGlobalParams = {
    id: string;
    tuz?: number;
    vars?: ShowcaseVars[];
    base_ctl_entity_id?: number;
    base_ctl_entity_name?: string;
    base_ctl_entity_path?: string;
    end_ctl_entity_id?: number;
};

export type ShowcaseKibana = {
    kibana_app_id: string;
    kibana_app_name: string;
};

export type ShowcaseKibanaUpdate = {
    id: string;
    kibana_app_id: string;
    kibana_app_name: string;
};

export type ShowcaseCurrentBranches = {
    id: number;
    name: string;
    developer: number;
    developer_name: string;
    task_type: string;
    task_type_name: string;
    task_status: string;
    task_status_name: string;
};

export type ShowcaseCluster = {
    id: number;
    name: string;
    stand: string;
    source_tables: string;
    spark_conf: string;
    ctl_profile: string;
    yarn_queue: string;
    realm: string;
    etl: number;
    cluster_type: number;
};

export type ShowcaseCreateCluster = {
    etl: number;
    cluster_type: number;
};

export type ListProps = {
    key: string;
    value: string;
};

export type SparkConf = {
    spark_submit_cmd_main: string;
    spark_submit_cmd_additional: string;
};

export type ShowcaseCurrentCluster = {
    id: number;
    etl: number;
    name: string;
    source_tables: ListProps[];
    spark_conf: SparkConf;
    ctl_profile: string;
    default_ctl_profile: string;
    yarn_queue: string;
    default_yarn_queue: string;
    realm: string;
    default_realm: string;
    cluster_type: number;
    tuz_prefix: string;
};

export type ShowcaseCurrentClusterPayload = {
    id: string;
    etl_id: string;
};

export type ShowcaseUpdateCurrentCluster = {
    name?: string;
    source_tables: ListProps[];
    spark_conf: SparkConf;
    ctl_profile: string;
    yarn_queue: string;
    realm: string;
    etl: number;
    cluster_type: number;
    tuz_prefix: string;
};

export type ShowcaseCTLDeletePayload = {
    etl_id: string;
    id: string;
};

export type ShowcaseCTLUpdatePayload = {
    id: string;
    etl_id: string;
    [field: string]: string | number;
};

// TODO: разобраться с типами
export type ShowcaseCTLSettingUpdate = {
    id: string;
    local_vars?: ListProps[];
    target_tables?: ListProps[];
    stage_tables?: ListProps[];
    hists?: ListProps[];
};

export type ShowcaseDeleteCluster = {
    etl_id: string;
    id: string;
};

export type ShowcaseJenkins = {
    job_name: string;
    job_link: string;
    branch: string[];
};

export type CheckList = {
    id: UUID;
    created: string;
    receiver_email: string;
    comment: string;
    summary: string;
    ci_subsystem: string;
    ci_pkap_as: string;
    nexus_distributive_link: string;
    target_of_pci: string;
    place_of_pci: string;
    story_key: TStoryKey[];
    special_conditions: string;
    result_of_pci: string;
    description: string;
    datamart_version: string;
    rrm_link: string;
    product_owner: string;
    release_manager: string;
    release_2ls: string;
    release_approuver: string;
    architector_dka_sigma_login: string;
    datamart: number;
    author: number;
    release_type: number;
};

export type CheckListPayload = {
    id: string;
    created?: string;
    receiver_email?: string;
    comment?: string;
    summary?: string;
    ci_subsystem?: string;
    ci_pkap_as?: string;
    nexus_distributive_link: string;
    target_of_pci?: string;
    place_of_pci?: string;
    story_key?: TStoryKey[];
    special_conditions?: string;
    result_of_pci?: string;
    description?: string;
    datamart_version?: string;
    rrm_link?: string;
    product_owner?: string;
    release_manager?: string;
    release_2ls?: string;
    release_approuver?: string;
    architector_dka_sigma_login?: string;
    datamart?: number;
    author?: number;
    release_type?: number;
};

export type TStoryKey = {
    key: string;
    value: string;
};

export type TCTLTreeRequest = {
    key: string;
    title: string;
};

export type TCTLTreeCurrConfigPayload = {
    datamartId: string;
    treeId: Key;
};

export type TCTLTreeCurrConfigRequest = {
    id: number;
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
    parent: number;
    parent_id_name: string;
};

export type TConfigsTree = TCTLTreeCurrConfigRequest;

export type TCTLTreeUpdateCurrConfigPayload = {
    datamartId: string;
    ctlId: string;
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
    parent: number;
};

export type TDeleteCurrConfigPayload = TCTLTreeCurrConfigPayload & {
    cascade: boolean;
};

export type TCreateConfigsTreePayload = {
    datamartId: string;
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
    parent: number;
};

export const {
    useCreateShowcaseMutation,
    useBaseQuery,
    useUpdateBaseMutation,
    useCurrentBranchesQuery,
    useClustersQuery,
    useCreateClustersMutation,
    useCurrentClusterQuery,
    useUpdateCurrentClustersMutation,
    useDeleteCtlMutation,
    useUpdateCtlMutation,
    useDeleteClusterMutation,
    useJenkinsQuery,
    useCtlListQuery,
    useCreateEntityCtlMutation,
    useCheckListQuery,
    useSaveCheckListMutation,
    useCtlTreeQuery,
    useCtlTreeCurrConfigMutation,
    useConfigsTreeQuery,
    useCtlTreeUpdateCurrConfigMutation,
    useDeleteConfigTreeMutation,
    useCreateConfigsTreeMutation,
} = showcasesApi;
