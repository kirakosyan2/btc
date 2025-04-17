import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const clusterApi = createApi({
    reducerPath: 'clusterRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    endpoints: (builder) => ({
        showcaseClustersNames: builder.query<
            ShowcaseNormalClusterNames[],
            undefined
        >({
            query: (id) => ({
                url: `datamart/${id}/cluster/`,
                method: 'GET',
            }),
            transformResponse: (
                data: ShowcaseClusterNames[]
            ): ShowcaseNormalClusterNames[] => {
                return data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                }));
            },
        }),
        createClusterLine: builder.mutation<void, CreateClusterLine>({
            query: (body) => ({
                url: `create_by_cluster_line`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export type CreateClusterLine = {
    datamart_id: number;
    cluster_line: string;
};

export type ShowcaseNormalClusterNames = {
    value: number;
    label: string;
};

export type ShowcaseClusterNames = {
    id: number;
    name: string;
};

export const { useShowcaseClustersNamesQuery, useCreateClusterLineMutation } =
    clusterApi;
