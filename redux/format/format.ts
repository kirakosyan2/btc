import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const formatApi = createApi({
    reducerPath: 'formatRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    endpoints: (builder) => ({
        formatsList: builder.query<NormalFormatsList[], void>({
            query: () => ({
                url: 'datamart/formats/',
                method: 'GET',
            }),
            transformResponse: (data: FormatsList[]): NormalFormatsList[] => {
                return data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                }));
            },
        }),
    }),
});

export type FormatsList = {
    id: number;
    name: string;
};

export type NormalFormatsList = {
    value: number;
    label: string;
};

export const { useFormatsListQuery } = formatApi;
