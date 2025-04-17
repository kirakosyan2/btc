import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const deployApi = createApi({
    reducerPath: 'deployRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    endpoints: (builder) => ({
        bitbucket: builder.mutation<void, TBitBucketPayload>({
            query: ({ id, project_version }) => ({
                url: `branches/${id}/upload_to_git/`,
                method: 'POST',
                body: { project_version },
            }),
        }),

        repository: builder.mutation<void, string>({
            query: (id) => ({
                url: `datamart/${id}/create_repo/`,
                method: 'POST',
            }),
        }),

        deploy: builder.mutation<void, DeployPayload>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `datamart/${id}/deploy/`,
                    method: 'POST',
                    body: { ...rest },
                };
            },
        }),

        uploadVars: builder.mutation<void, UploadVarsPayload>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `datamart/${id}/upload_vars/`,
                    method: 'POST',
                    body: { ...rest },
                };
            },
        }),
    }),
});

export type DeployPayload = {
    id: string;
    branch_name: string;
};

export type UploadVarsPayload = {
    id: string;
    branch_name: string;
};

export type TBitBucketPayload = {
    id: string;
    project_version: string;
};

export const {
    useBitbucketMutation,
    useRepositoryMutation,
    useDeployMutation,
    useUploadVarsMutation,
} = deployApi;
