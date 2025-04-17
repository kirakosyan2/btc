import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const blockApi = createApi({
    reducerPath: 'blockRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['blocks'],
    endpoints: (builder) => ({
        blocks: builder.query<TransformBlocksList[], void>({
            query: () => ({
                url: 'blocks/',
                method: 'GET',
            }),
            providesTags: ['blocks'],
            transformResponse: (data: BlocksList[]): TransformBlocksList[] => {
                return data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                }));
            },
        }),
        createBlock: builder.mutation<void, BlockPayoad>({
            query: (body) => ({
                url: 'blocks/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['blocks'],
        }),
    }),
});

export type BlockPayoad = {
    name: string;
    short_name_rus: string;
    short_name_eng: string;
};

export type BlocksList = {
    id: number;
    name: string;
    short_name_rus?: string;
    short_name_eng?: string;
};

export type TransformBlocksList = {
    value: number;
    label: string;
};

export const { useBlocksQuery, useCreateBlockMutation } = blockApi;
