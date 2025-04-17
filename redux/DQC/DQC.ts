import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const DQSApi = createApi({
    reducerPath: 'DQCRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    tagTypes: ['statistics', 'checks', 'sparks'],
    baseQuery: getBaseQuery('/api/v1'),
    endpoints: (builder) => ({
        statistics: builder.query<Statistics[], string>({
            query: (id) => ({
                url: `nodes/${id}/statistic/`,
                method: 'GET',
            }),
            providesTags: ['statistics'],
        }),

        createStatistics: builder.mutation<void, StatisticsCreatePayload>({
            query: (payload) => {
                const { id, ...rest } = payload;
                return {
                    url: `nodes/${id}/statistic/`,
                    method: 'POST',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['statistics'],
        }),

        updateStatistics: builder.mutation<void, StatisticsUpdatePayload>({
            query: (payload) => {
                const { id, ...rest } = payload;
                return {
                    url: `nodes/${id}/statistic/`,
                    method: 'PUT',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['statistics'],
        }),

        checks: builder.query<Checks[], string>({
            query: (id) => ({
                url: `nodes/${id}/checks/`,
                method: 'GET',
            }),
            providesTags: ['checks'],
        }),

        createCheck: builder.mutation<void, string>({
            query: (id) => ({
                url: `nodes/${id}/checks/`,
                method: 'POST',
            }),
            invalidatesTags: ['checks'],
        }),

        updateCheck: builder.mutation<void, CheckUpdatePayload>({
            query: (payload) => {
                const { id, ...rest } = payload;
                return {
                    url: `nodes/${id}/checks/`,
                    method: 'PUT',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['checks'],
        }),

        sparks: builder.query<SparkParams[], string>({
            query: (id) => ({
                url: `nodes/${id}/spark-params/`,
                method: 'GET',
            }),
            providesTags: ['sparks'],
        }),

        updateSpark: builder.mutation<void, SparkParamsPayload>({
            query: (payload) => {
                const { id, ...rest } = payload;
                return {
                    url: `nodes/${id}/spark-params/`,
                    method: 'PUT',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['sparks'],
        }),
    }),
});

export type Statistics = {
    id?: string;
    name?: string;
    value?: string;
    params?: {
        table?: string;
        columns?: string;
        query?: string;
        aggType?: string;
        format?: string;
        excluded_letters?: string;
        check_cyrillic?: boolean;
        primary_keys?: string;
        startdt_enddt?: string;
        default?: number;
    };
    enabled?: boolean;
    category?: string;
};

export type NormStatistics = {
    id?: string;
    name?: string;
    value?: string;
    table?: string;
    columns?: string;
    query?: string;
    aggType?: string;
    enabled?: boolean;
    format?: string;
    excluded_letters?: string;
    check_cyrillic?: boolean;
    primary_keys?: string;
    startdt_enddt?: string;
    default?: number;
    category?: string;
};

export type StatisticsCreatePayload = {
    id: string;
    statistic_type: string;
};

export type StatisticsUpdatePayload = {
    id: string;
    statistics: Statistics[];
};

export type Checks = {
    id?: string;
    enabled: boolean;
    name: string;
    value: string;
    is_blocker?: boolean;
    description?: string;
    is_incident?: boolean;
};

export type CheckUpdatePayload = {
    id: string;
    check_list: Checks[];
};

export type SparkParams = {
    key: string;
    value: string;
};

export type SparkParamsPayload = {
    id: string;
    sparkEngineParams: SparkParams[];
};

export const {
    useStatisticsQuery,
    useCreateStatisticsMutation,
    useUpdateStatisticsMutation,
    useChecksQuery,
    useCreateCheckMutation,
    useUpdateCheckMutation,
    useSparksQuery,
    useUpdateSparkMutation,
} = DQSApi;
