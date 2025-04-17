import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const statisticsApi = createApi({
    reducerPath: 'statisticRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['statistics'],
    endpoints: (builder) => ({
        statisticsList: builder.query<StatisticsList[], void>({
            query: () => ({
                url: 'statistic/',
                method: 'GET',
            }),
        }),
        graphList: builder.query<GraphList[], void>({
            query: () => ({
                url: 'statistic/graph/',
                method: 'GET',
            }),
        }),
        develop: builder.query<Developer[], void>({
            query: () => ({
                url: 'statistic/top_developers/',
                method: 'GET',
            }),
        }),
    }),
});

export type StatisticItem = {
    id: number;
    name: string;
};

export type StatisticsList = {
    team: StatisticItem;
    branch: StatisticItem;
    customer: StatisticItem;
    initiative: StatisticItem;
    datamart: StatisticItem;
    developer_name: string;
    task_status: number;
    start_date_time: string;
};

export type GraphList = {
    id: number;
    name: string;
    grapg: string;
};

export type Developer = {
    team: StatisticItem;
    developer_name: string;
    active_tasks: string;
    completed_releases: number;
    completed_fixes: number;
    completed_new_releases: number;
    all_tasks: number;
};

export const { useDevelopQuery, useGraphListQuery, useStatisticsListQuery } =
    statisticsApi;
