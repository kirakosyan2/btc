import React from 'react';

import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const streamV2Api = createApi({
    reducerPath: 'streamV2RTK',
    tagTypes: ['streams', 'stream'],
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v2'),
    endpoints: (builder) => ({
        getStreams: builder.query<TStream[], string>({
            query: (ctl_id) => ({
                url: `ctl/${ctl_id}/streams/`,
                method: 'GET',
            }),
            providesTags: ['streams'],
        }),

        createStream: builder.mutation<void, TCreateStreamPayload>({
            query: ({ ctl_id, datamart_id }) => ({
                url: `ctl/${ctl_id}/streams/`,
                method: 'POST',
                body: { datamart_id },
            }),
            invalidatesTags: ['streams'],
        }),

        deleteStream: builder.mutation<void, TDeleteStreamPayload>({
            query: ({ ctl_id, id }) => ({
                url: `ctl/${ctl_id}/streams/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['streams'],
        }),

        getStream: builder.query<TStream, TStreamPayload>({
            query: ({ ctl_id, stream_id }) => ({
                url: `ctl/${ctl_id}/streams/${stream_id}/`,
                method: 'GET',
            }),
            providesTags: ['stream'],
        }),

        updateStream: builder.mutation<void, TUpdateStreamPayload>({
            query: ({ ctl_id, stream_id, ...rest }) => ({
                url: `ctl/${ctl_id}/streams/${stream_id}/`,
                method: 'PATCH',
                body: { ...rest },
            }),
            invalidatesTags: ['streams', 'stream'],
        }),

        getDML: builder.query<StreamList[], string>({
            query: (branch_id) => ({
                url: `branches/${branch_id}/streams/`,
                method: 'GET',
            }),
            providesTags: ['streams'],
        }),
    }),
});

export type StreamList = {
    id: number;
    name: string;
};

export type TStream = {
    id: number;
    created: number;
    updated: number;
    name?: string;
    local_vars?: ListProps[];
    target_tables?: ListProps[];
    stage_tables?: ListProps[];
    hists?: ListProps[];
    entity?: number[];
};

export type TCreateStreamPayload = {
    ctl_id: React.Key;
    datamart_id: string;
};

export type TDeleteStreamPayload = {
    ctl_id: React.Key;
    id: number;
};

export type TStreamPayload = {
    ctl_id: React.Key;
    stream_id: string;
};

export type ListProps = {
    key: string;
    value: string;
};

export type TUpdateStreamPayload = {
    ctl_id: React.Key;
    stream_id: number;
    name?: string;
    local_vars?: ListProps[];
    target_tables?: ListProps[];
    stage_tables?: ListProps[];
    hists?: ListProps[];
};

export const {
    useGetStreamsQuery,
    useCreateStreamMutation,
    useDeleteStreamMutation,
    useGetStreamQuery,
    useUpdateStreamMutation,
    useGetDMLQuery,
} = streamV2Api;
