import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const referenceApi = createApi({
    reducerPath: 'referenceRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    endpoints: (builder) => ({
        reference: builder.query<TReference, void>({
            query: () => ({
                url: 'reference_initiative/',
                method: 'GET',
            }),
        }),
    }),
});

export type TReference = {
    id: number;
    created: string;
    updated: string;
    name: string;
    confluence_link: string;
    is_reference: true;
    customer: number;
};

export const { useReferenceQuery } = referenceApi;
