import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const streamApi = createApi({
    reducerPath: 'streamRTQ',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['streams', 'stream', 'streamList'],
    endpoints: (builder) => ({
        stream: builder.query<Stream, string>({
            query: (id) => ({
                url: `stream/${id}/`,
                method: 'GET',
            }),
            providesTags: ['stream'],
        }),

        updateStream: builder.mutation<void, UpdateStream>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `stream/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['streams', 'stream'],
        }),

        deleteStreams: builder.mutation<void, number>({
            query: (id) => ({
                url: `stream/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['streamList', 'streams', 'stream'],
        }),

        streamList: builder.query<ShowcaseCTLStreamList[], string>({
            query: (id) => ({
                url: `entities/${id}/streams/`,
                method: 'GET',
            }),
            providesTags: ['streamList'],
        }),

        createStream: builder.mutation<void, CreateStreamPayload>({
            query: (body) => ({
                url: 'stream/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['streamList'],
        }),
        streams: builder.query<StreamList[], string>({
            query: (id) => ({
                url: `branches/${id}/streams/`,
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

export type StreamPayload = {
    id: number;
    name: string;
    local_vars: string;
    target_tables: string;
    stage_tables: string;
    hists: string;
    app_config: string;
    entity: number[];
};

export type ShowcaseCTLSettingUpdate = {
    id: number;
    name: string;
    local_vars?: ListProps[];
    target_tables?: ListProps[];
    stage_tables?: ListProps[];
    hists?: ListProps[];
};

export type PublishStats = {
    StatId: string;
    EntityId: string;
    StatValue: string;
    StatValueType: string;
};

export type BackUp = {
    enabled: boolean;
    publishStats: PublishStats[];
};

export type RollBack = {
    enabled: boolean;
    publishStats: PublishStats[];
};

export type MoveTable = {
    enabled: boolean;
    workMode: string;
    srcSchema: string;
    tgtSchema: string;
    publishStats: PublishStats[];
    s2tTableList: string;
    instanceFilter: string;
    compressionType: string;
    truncateStgFromPa: boolean;
    truncateFilterList: string;
};

export type DmPreStage = {
    enabled: boolean;
    publishStats: PublishStats[];
};

export type Historicity = {
    enabled: boolean;
    snpFilter: string;
    targetName: string;
    hashColumns: string;
    loadingMode: string;
    sourceQuery: string;
    sourceTable: string;
    businessKeys: string;
    publishStats: PublishStats[];
    historyColumns: string;
    customTargetSnp: string;
    customTargetHist: string;
    deletedFlagColumn: string;
    targetHashColName: string;
};

export type Increment = {
    attrConfTable: string;
    bcSizeLimit: string;
    cdcSchemaHist: string;
    cdcSchemaSnp: string;
    createTableSettingsScript: string;
    dmName: string;
    enabled: boolean;
    loadingType: string;
    minLoadingId: string;
    minVfrom: string;
    parallelDegree: string;
    publishStats: PublishStats[];
    settingsExtTable: string;
    settingsMartTable: string;
    settingsReplTable: string;
    settingsTable: string;
    srcSchemaHist: string;
    srcSchemaSnp: string;
    statsTable: string;
    typeArcVal: string;
};

export type CoalesceFiles = {
    enabled: boolean;
    hdfsPaths: string;
    hdfsWorkPath: string;
    publishStats: PublishStats[];
    minFileSizeMB: number;
    parallelDegree: string;
    compressionType: string;
};

export type DataQualityCheck = {
    enabled: boolean;
    publishStats: PublishStats[];
    sparkEngineParams?: ListProps[];
};

export type Stream = {
    app_config: {
        stages: {
            backUp: BackUp;
            rollBack: RollBack;
            moveTable: MoveTable;
            dmPreStage: DmPreStage;
            historicity: Historicity;
            getIncrement: Increment;
            coalesceFiles: CoalesceFiles;
            dataQualityCheck: DataQualityCheck;
        };
    };
};

export type UpdateStream = {
    id: string;
    app_config: {
        stages: {
            getIncrement?: Increment;
            historicity?: Historicity;
            coalesceFiles?: CoalesceFiles;
            moveTable?: MoveTable;
            dataQualityCheck?: DataQualityCheck;
        };
    };
};

export type ListProps = {
    key: string;
    value: string;
};

export type ShowcaseCTLSettingStream = {
    id: number;
    name: string;
    local_vars: ListProps[];
    target_tables: ListProps[];
    stage_tables: ListProps[];
    hists: ListProps[];
};

export type ShowcaseCTLStreamList = {
    id: number;
    name: string;
};

export type CreateStreamPayload = {
    entity: React.Key[];
    datamart_id: string;
};

export const {
    useStreamQuery,
    useUpdateStreamMutation,
    useStreamListQuery,
    useCreateStreamMutation,
    useStreamsQuery,
} = streamApi;
