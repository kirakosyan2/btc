import { isEmpty } from 'lodash';

import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const directoriesAndFilesApi = createApi({
    reducerPath: 'directoriesAndFilesRTK',
    tagTypes: ['folders'],
    baseQuery: getBaseQuery('/api/v1'),
    endpoints: (builder) => ({
        getFolders: builder.query<TFolders[], string>({
            query: (id) => ({
                url: `branch/${id}/folders/`,
                method: 'GET',
            }),

            transformResponse: (data: TFolders): TFolders[] => {
                if (isEmpty(data)) {
                    return [];
                }

                return [data];
            },
            providesTags: ['folders'],
        }),

        getFile: builder.mutation<TFolder, TFolderPayload>({
            query: ({ fileId, branchId }) => ({
                url: `branch/${branchId}/files/${fileId}/`,
                method: 'GET',
            }),
        }),

        updateFile: builder.mutation<void, TUpdateFilePayload>({
            query: ({ branch_id, file_id, ...rest }) => ({
                url: `branch/${branch_id}/files/${file_id}/`,
                method: 'PATCH',
                body: { ...rest },
            }),
            invalidatesTags: ['folders'],
        }),

        updateFolder: builder.mutation<void, TUpdateFolderPayload>({
            query: ({ branch_id, folder_id, ...rest }) => ({
                url: `branch/${branch_id}/folders/${folder_id}/`,
                method: 'PATCH',
                body: { ...rest },
            }),
            invalidatesTags: ['folders'],
        }),

        deleteFile: builder.mutation<void, TFileDelete>({
            query: ({ branch_id, file_id }) => ({
                url: `branch/${branch_id}/files/${file_id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['folders'],
        }),

        deleteFolder: builder.mutation<void, TFolderDelete>({
            query: ({ branch_id, folder_id }) => ({
                url: `branch/${branch_id}/folders/${folder_id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['folders'],
        }),

        createFolder: builder.mutation<void, TFolderCreate>({
            query: ({ branch_id, ...rest }) => ({
                url: `branch/${branch_id}/folders/`,
                method: 'POST',
                body: { ...rest },
            }),
            invalidatesTags: ['folders'],
        }),

        createFile: builder.mutation<void, TFileCreate>({
            query: ({ branch_id, ...rest }) => ({
                url: `branch/${branch_id}/files/`,
                method: 'POST',
                body: { ...rest },
            }),
            invalidatesTags: ['folders'],
        }),

        uploadFile: builder.mutation<void, TUploadFile>({
            query: ({ branch_id, formData }) => ({
                url: `branch/${branch_id}/upload/`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['folders'],
        }),

        getExternal: builder.query<TExternalRequest, string>({
            query: (branchId) => ({
                url: `branch/${branchId}/external_conf/`,
                method: 'GET',
            }),
        }),

        updateExternal: builder.mutation<void, TExternalpayload>({
            query: ({ branchId, ...rest }) => ({
                url: `branch/${branchId}/external_conf/`,
                method: 'POST',
                body: { ...rest },
            }),
        }),
    }),
});

export type TFolders = {
    id: string;
    name: string;
    children: TFolders[];
};

export type TFolder = {
    id: number;
    created: string;
    updated: string;
    name: string;
    file_data: string;
    folder: number;
};

export type TFolderPayload = {
    branchId: string;
    fileId: string;
};

export type TUpdateFilePayload = {
    branch_id: string;
    file_id: string;
    name?: string;
    file_data?: string;
    folder?: number;
};

export type TUpdateFolderPayload = {
    branch_id: string;
    folder_id: string;
    name?: string;
    parent?: number;
};

export type TFileDelete = {
    branch_id: string;
    file_id: string;
};

export type TFolderDelete = {
    branch_id: string;
    folder_id: string;
};

export type TFolderCreate = {
    branch_id: string;
    parent: string | null;
};

export type TFileCreate = {
    branch_id: string;
    name: string;
    file_data?: string;
    folder: string | null;
};

export type TUploadFile = {
    branch_id: string;
    formData: FormData;
};

export type TExternal = {
    function_name: string;
    function_path: FormData;
};

export type TExternalRequest = {
    external_conf: TExternal[];
};

export type TExternalpayload = {
    branchId: string;
    external_conf: TExternal[];
};

export const {
    useGetFoldersQuery,
    useGetFileMutation,
    useUpdateFileMutation,
    useUpdateFolderMutation,
    useDeleteFileMutation,
    useDeleteFolderMutation,
    useCreateFolderMutation,
    useCreateFileMutation,
    useUploadFileMutation,
    useGetExternalQuery,
    useUpdateExternalMutation,
} = directoriesAndFilesApi;
