import { TreeDataNode } from 'antd';
import { Key } from 'react';

import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const etlApi = createApi({
    reducerPath: 'etlRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['ctls', 'devops', 'ctl'],
    endpoints: (builder) => ({
        showcaseConfigGeneral: builder.query<ShowcaseConfigGeneralList, void>({
            query: () => ({
                url: `configs/general/`,
                method: 'GET',
            }),
        }),
        updateShowcaseConfigGeneral: builder.mutation<
            void,
            ShowcaseUpdateConfigGeneral
        >({
            query: (body) => ({
                url: `configs/general/`,
                method: 'PATCH',
                body,
            }),
        }),
        showcaseConfigJira: builder.query<ShowcaseConfigJiralList, void>({
            query: () => ({
                url: `configs/jira/`,
                method: 'GET',
            }),
        }),
        updateShowcaseConfigJira: builder.mutation<
            void,
            ShowcaseUpdateConfigGeneral
        >({
            query: (body) => ({
                url: `configs/jira/`,
                method: 'PATCH',
                body,
            }),
        }),
        showcaseConfigDevops: builder.query<ShowcaseConfigJiralList, void>({
            query: () => ({
                url: `configs/devops/`,
                method: 'GET',
            }),
        }),
        updateShowcaseConfigDevOps: builder.mutation<
            void,
            ShowcaseUpdateConfigGeneral
        >({
            query: (body) => ({
                url: `configs/devops/`,
                method: 'PATCH',
                body,
            }),
        }),
        showcaseConfigS2T: builder.query<ShowcaseConfigJiralList, void>({
            query: () => ({
                url: `configs/s2t/`,
                method: 'GET',
            }),
        }),
        updateShowcaseConfigS2T: builder.mutation<
            void,
            ShowcaseUpdateConfigGeneral
        >({
            query: (body) => ({
                url: `configs/s2t/`,
                method: 'PATCH',
                body,
            }),
        }),

        showcaseConfigCTL: builder.query<ConfigsCTLList[], undefined>({
            query: () => ({
                url: `configs/ctl/`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),

        updateShowcaseConfigCTL: builder.mutation<
            void,
            ShowcaseUpdateConfigGeneral
        >({
            query: (body) => ({
                url: `configs/ctl/`,
                method: 'PATCH',
                body,
            }),
        }),

        devops: builder.query<ShowcaseDevops, void>({
            query: () => ({
                url: `configs/devops/`,
                method: 'GET',
            }),
            providesTags: ['devops'],
        }),

        updateDevops: builder.mutation<void, ShowcaseUpdateDevops>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `configs/devops/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['devops'],
        }),

        ctl: builder.query<CTLConfig, void>({
            query: () => ({
                url: 'configs/ctl_tree/',
                method: 'GET',
            }),
        }),

        currentCtl: builder.mutation<CurrentCTLConfig, Key>({
            query: (id) => ({
                url: `configs/ctl/${id}/`,
                method: 'GET',
            }),
        }),

        changeCurrentCtl: builder.mutation<void, ChangeCurrentCTLConfigPayload>(
            {
                query: (payload) => {
                    const { id, ...rest } = payload;
                    return {
                        url: `configs/ctl/${id}/`,
                        method: 'PATCH',
                        body: { ...rest },
                    };
                },
            }
        ),

        deleteCurrentCtl: builder.mutation<void, DeleteCurrentCTLPayload>({
            query: ({ id, cascade }) => ({
                url: `configs/ctl/${id}/?is_cascade=${cascade}`,
                method: 'DELETE',
            }),
        }),

        createCurrentCtl: builder.mutation<void, CreateConfigCTLPayload>({
            query: (body) => ({
                url: `configs/ctl/`,
                method: 'POST',
                body,
            }),
        }),

        ctlCategory: builder.query<CTLCategory, void>({
            query: () => ({
                url: `configs/ctl_category/`,
                method: 'GET',
            }),
        }),

        updateCtlCategory: builder.mutation<void, CTLCategory>({
            query: (body) => ({
                url: `configs/ctl_category/`,
                method: 'PATCH',
                body,
            }),
        }),
    }),
});

export type ShowcaseList = {
    id: number;
    name: string;
};

export type ShowcaseDevops = {
    ci_subsystem: string;
    sm_name: string;
    sonar_project_key: string;
};

export type ShowcaseUpdateDevops = {
    id: string;
    [field: string]: string | number;
};

export type EntityCTL = {
    datamart: number;
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
    stream: number[];
};

export type CTLList = {
    ase_ctl_entity_id: string;
    base_ctl_entity_path: string;
    secondary_ct_entity_id: string;
    secondary_ctl_entity_name: string;
    secondary_ctl_entity_path: string;
};

export type S2TList = {
    cluster_instance: string;
    base_scheme_prefix: string;
    po_email: string;
};

export type TransformShowcaseList = {
    value: number;
    label: string;
};

export type ShowcaseConfigGeneralList = {
    team: number;
    repo_prefix: string;
    notification_emails: string;
    bitbucket_workspace: string;
};

export type ShowcaseConfigJiralList = {
    jira_project_number: string;
    jira_project_name: string;
};

export type ShowcaseDevOpsList = {
    ci_pkap_as: string;
    mus_code: string;
    mus_name: string;
};

// TODO: объедить в один общий тип
export type ShowcaseUpdateDevOps = {
    [field: string]: string;
};

export type ShowcaseUpdateJira = {
    [field: string]: string;
};

export type ShowcaseUpdateConfigGeneral = {
    [field: string]: string;
};

export type ShowcaseUpdateS2T = {
    [field: string]: string;
};

export type ShowcaseUpdateCTL = {
    [field: string]: string;
};

export type CTLConfig = TreeDataNode[];

export type CurrentCTLConfig = {
    id: number;
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
    datamart: number;
    team: number;
    parent: number;
    parent_id_name: string;
};

export type ChangeCurrentCTLConfigPayload = {
    id: Key;
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
    parent: number;
};

export type ConfigsCTLList = {
    id: number;
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
    team: number;
    parent: number;
    parent_id_name: string;
};

export type DeleteCurrentCTLPayload = {
    id: Key;
    cascade: boolean;
};

export type CreateConfigCTLPayload = {
    entity_id: number;
    entity_name: string;
    entity_path: string;
    entity_category: string;
    parent: number;
};

export type CTLCategory = {
    entity_category: string;
};

export const {
    useShowcaseConfigGeneralQuery,
    useUpdateShowcaseConfigGeneralMutation,
    useShowcaseConfigJiraQuery,
    useUpdateShowcaseConfigJiraMutation,
    useShowcaseConfigDevopsQuery,
    useUpdateShowcaseConfigDevOpsMutation,
    useShowcaseConfigS2TQuery,
    useUpdateShowcaseConfigS2TMutation,
    useShowcaseConfigCTLQuery,
    useUpdateShowcaseConfigCTLMutation,
    useDevopsQuery,
    useUpdateDevopsMutation,
    useCtlQuery,
    useCurrentCtlMutation,
    useChangeCurrentCtlMutation,
    useDeleteCurrentCtlMutation,
    useCreateCurrentCtlMutation,
    useCtlCategoryQuery,
    useUpdateCtlCategoryMutation,
} = etlApi;
