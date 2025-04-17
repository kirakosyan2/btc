import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const acesApi = createApi({
    reducerPath: 'acesRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['aces'],
    endpoints: (builder) => ({
        aces: builder.query<AcesList[], void>({
            query: () => ({
                url: 'tuz/',
                method: 'GET',
            }),
            providesTags: ['aces'],
        }),
        createAces: builder.mutation<void, AcesPayload>({
            query: (body) => ({
                url: 'tuz/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['aces'],
        }),
        updateAces: builder.mutation<void, AcesUpdatePayload>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `tuz/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['aces'],
        }),

        deleteAces: builder.mutation<void, number>({
            query: (id) => ({
                url: `tuz/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['aces'],
        }),
    }),
});

export type AcesList = {
    id: number;
    dev_prefix: string;
    ift_prefix: string;
    uat_prefix: string;
    pci_prefix: string;
    prom_prefix: string;
    base_prefix: string;
    name: string;
    team: number;
};

export type AcesPayload = {
    dev_prefix: string;
    ift_prefix: string;
    uat_prefix: string;
    pci_prefix: string;
    prom_prefix: string;
    base_prefix: string;
    name: string;
    team?: number;
};

export type AcesUpdatePayload = {
    id: number;
    [field: string]: string | number;
};

export const {
    useCreateAcesMutation,
    useDeleteAcesMutation,
    useUpdateAcesMutation,
    useAcesQuery,
} = acesApi;
