import { UUID } from '@src/types/types';

import { createApi } from '@reduxjs/toolkit/query/react';

import { TStoryKey } from '../showcases/showcase';
import { getBaseQuery } from '../utils';

export const taskStatusApi = createApi({
    reducerPath: 'taskStatusRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['checkList'],
    endpoints: (builder) => ({
        tasks: builder.query<TransformOptionsList[], void>({
            query: () => ({
                url: 'types/tasks_statuses/',
                method: 'GET',
            }),
            transformResponse: (
                data: OptionsList[]
            ): TransformOptionsList[] => {
                return data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                }));
            },
        }),

        typesCheckLists: builder.query<TransformOptionsList[], void>({
            query: () => ({
                url: 'types/check_lists/',
                method: 'GET',
            }),
            transformResponse: (
                data: OptionsList[]
            ): TransformOptionsList[] => {
                return data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                }));
            },
        }),

        checkListTypes: builder.query<ShowcaseChecklistTypes[], string>({
            query: () => ({
                url: `types/check_lists/`,
                method: 'GET',
            }),
        }),

        typeCheckList: builder.query<ShowcaseCheckList, void>({
            query: () => ({
                url: `types/check_lists/`,
                method: 'GET',
            }),
            providesTags: ['checkList'],
        }),

        saveCheckList: builder.mutation<void, ShowcaseCheckListPayload>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `types/check_lists/`,
                    method: 'POST',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['checkList'],
        }),

        clusterNames: builder.query<NormalClustersList[], void>({
            query: () => ({
                url: 'types/clusters/',
                method: 'GET',
            }),
            transformResponse: (data: ClustersList[]): NormalClustersList[] => {
                return data.map(({ id, name, stand }) => ({
                    value: id,
                    label: name,
                    meta: stand,
                }));
            },
        }),
        checkList: builder.query<ReleaseList[], void>({
            query: () => ({
                url: `check_list/`,
                method: 'GET',
            }),
        }),
        releaseList: builder.query<ReleaseList, string>({
            query: (id) => ({
                url: `check_list/${id}/`,
                method: 'GET',
            }),
        }),
        updateReleaseList: builder.mutation<void, UpdateReleaseList>({
            query: (payload) => {
                const { id, ...rest } = payload;
                return {
                    url: `check_list/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
        }),
        createRelease: builder.mutation<void, string>({
            query: (id) => ({
                url: `check_list/${id}/create_release/`,
                method: 'POST',
            }),
        }),
        sendCheckList: builder.mutation<void, string>({
            query: (id) => ({
                url: `check_list/${id}/send_mail/`,
                method: 'POST',
            }),
        }),
        clusterLines: builder.query<TransformOptionsLine[], void>({
            query: () => ({
                url: `get_cluster_lines`,
                method: 'GET',
            }),
            transformResponse: (data: string[]): TransformOptionsLine[] => {
                return data.map((item) => ({
                    value: item,
                    label: item,
                }));
            },
        }),

        typesTasks: builder.query<TransformOptionsList[], void>({
            query: () => ({
                url: `types/tasks/`,
                method: 'GET',
            }),
            transformResponse: (
                data: OptionsList[]
            ): TransformOptionsList[] => {
                return data.map((item) => ({
                    value: item.id,
                    label: item.name,
                }));
            },
        }),
    }),
});

export type UpdateReleaseList = {
    id: string;
    summary?: string;
    release_type?: string;
    ci_subsystem?: string;
    ci_pkap_as?: string;
    nexus_distributive_link?: string;
    target_of_pci?: string;
    story_key?: TStoryKey[] | string;
    special_condition?: string;
    result_of_pci?: string;
    description?: string;
    product_owner?: string;
    architector_dka_sigma_login?: string;
    release_manager?: string;
    release_2ls?: string;
    release_approuver?: string;
    receiver_email?: string;
    comment?: string;
};

export type ReleaseList = {
    id: string;
    created: string;
    receiver_email: string;
    comment: string;
    summary: string;
    ci_subsystem: string;
    ci_pkap_as: string;
    nexus_distributive_link: string;
    target_of_pci: string;
    place_of_pci: string;
    story_key: string;
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

export type NormalClustersList = {
    value: number;
    label: string;
    meta?: string;
};

export type ClustersList = {
    id: number;
    name: string;
    stand: string;
};

export type ShowcaseCheckList = {
    id: string;
    receiver_email: string;
    created?: string;
    description: string;
    nexus_distributive_link: string;
    rrm: string;
    comment: string;
    story_key: string;
    datamart_version: string;
    developer_login: number;
    architector_dka_sigma_login: string;
    author?: number;
    datamart?: number;
    release_type: number;
};

export type ShowcaseCheckListPayload = ShowcaseCheckList;

export type OptionsList = {
    id: number;
    name: string;
};

export type TransformOptionsList = {
    value: number;
    label: string;
};

export type ShowcaseChecklistTypes = {
    id: UUID;
    receiver_email: string;
    created: string;
    description: string;
    nexus_distributive_link: string;
    rrm: string;
    comment: string;
    story_key: string;
    datamart_version: string;
    developer_login: string;
    architector_dka_sigma_login: string;
    author: number;
    datamart: number;
    release_type: number;
};

export type TransformOptionsLine = {
    value: string;
    label: string;
};

export const {
    useTasksQuery,
    useTypesCheckListsQuery,
    useCheckListTypesQuery,
    useTypeCheckListQuery,
    useSaveCheckListMutation,
    useClusterNamesQuery,
    useCheckListQuery,
    useReleaseListQuery,
    useUpdateReleaseListMutation,
    useCreateReleaseMutation,
    useSendCheckListMutation,
    useClusterLinesQuery,
    useTypesTasksQuery,
} = taskStatusApi;
