import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

// TODO перенести все DDL в один файл
export const DDLApi = createApi({
    reducerPath: 'DDLRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['ddl'],
    endpoints: (builder) => ({
        createDDL: builder.mutation<void, string>({
            query: (id) => ({
                url: `branch/${id}/ddl/`,
                method: 'POST',
            }),
        }),

        deleteDDL: builder.mutation<void, DeleteDDLPayload>({
            query: (payload) => ({
                url: `branch/${payload.branch_id}/ddl/${payload.ddl_id}/`,
                method: 'DELETE',
            }),
        }),

        saveDDL: builder.mutation<void, SaveDDLPayload>({
            query: (payload) => {
                const { branch_id, ddl_id, ...rest } = payload;

                return {
                    url: `branch/${branch_id}/ddl/${ddl_id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['ddl'],
        }),

        currentDDL: builder.query<DataCurrentBranch, CurrentDDLRequest>({
            query: (props) => ({
                url: `branch/${props.branch_id}/ddl/${props.id}/`,
                method: 'GET',
            }),
            providesTags: ['ddl'],
        }),

        updateQueueDDL: builder.mutation<void, UpdateQueueDDLPayload>({
            query: (payload) => {
                const { branch_id, ...rest } = payload;
                return {
                    url: `branch/${branch_id}/ddl/queue/`,
                    method: 'POST',
                    body: { ...rest },
                };
            },
        }),
    }),
});

export type DeleteDDLPayload = {
    branch_id: string;
    ddl_id: string;
};

export type SaveDDLPayload = {
    branch_id: string;
    ddl_id: string;
    code?: string;
    name?: string;
};

export type DataCurrentBranch = {
    id: number;
    code: string;
    branch: number;
    name: string;
};

export type CurrentDDLRequest = {
    branch_id: string;
    id: string;
};

export type UpdateQueueDDLPayload = {
    branch_id: string;
    data: number[];
};

export const {
    useCreateDDLMutation,
    useDeleteDDLMutation,
    useSaveDDLMutation,
    useCurrentDDLQuery,
    useUpdateQueueDDLMutation,
} = DDLApi;
