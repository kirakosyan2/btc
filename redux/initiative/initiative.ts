import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const initiativeApi = createApi({
    reducerPath: 'initiativeRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['ininitiatives', 'showcases'],
    endpoints: (builder) => ({
        initiativeList: builder.query<InitiativesList[], void>({
            query: () => ({
                url: 'initiatives/',
                method: 'GET',
            }),
            providesTags: ['ininitiatives'],
        }),

        createInitiative: builder.mutation<void, InitiativePayload>({
            query: (body) => ({
                url: 'initiatives/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['ininitiatives'],
        }),

        updateInitiative: builder.mutation<void, InitiativeUpdatePayload>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `initiatives/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['ininitiatives'],
        }),
        showcasesList: builder.query<ShowcasesList[], string>({
            query: (id) => ({
                url: `initiatives/${id}/datamart_list/`,
                method: 'GET',
            }),
            providesTags: ['showcases'],
        }),

        showcaseCurrent: builder.query<ShowcaseCurrent, string>({
            query: (id) => ({
                url: `initiatives/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export type ShowcasesList = {
    id: number;
    name: string;
    confluence_link: string;
    etl_count_all: number;
    etl_count_active: number;
    is_reference: boolean;
};

export type ShowcaseCurrent = {
    id: number;
    name: string;
    confluence_link: string;
    customer: number;
};

export type InitiativesList = {
    id: number;
    name: string;
    customer: number;
    confluence_link: string;
    is_reference: boolean;
};

export type InitiativePayload = {
    name: string;
    customer: number;
    confluence_link: string;
};

export type InitiativeUpdatePayload = {
    id: number;
    [field: string]: string | number;
};

export const {
    useCreateInitiativeMutation,
    useInitiativeListQuery,
    useUpdateInitiativeMutation,
    useShowcasesListQuery,
    useShowcaseCurrentQuery,
} = initiativeApi;
