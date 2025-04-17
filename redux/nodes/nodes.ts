import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const nodesApi = createApi({
    reducerPath: 'nodesRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['nodes', 'thread', 'HDFS2KAFKA', 'KAFKA2HDFS'],
    endpoints: (builder) => ({
        nodes: builder.query<Nodes[], NodeRequestPayload>({
            query: (payload) => ({
                url: `branches/${payload.branchId}/streams/${payload.streamId}/threads/`,
                method: 'GET',
            }),
            providesTags: ['nodes'],
        }),

        currDataNode: builder.query<Threads, string>({
            query: (id) => ({
                url: `threads/${id}/`,
                method: 'GET',
            }),
            providesTags: ['thread'],
        }),

        updateCurrDataNode: builder.mutation<
            void,
            | ThreadsGetIncrementPayload
            | ThreadsDmPreStagePayload
            | ThreadsHistoricityPayload
            | ThreadsDataQualityCheckPayload
            | ThreadsRAPayload
            | ThreadsCoalesceFilesPayload
        >({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `threads/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['thread'],
        }),

        deleteNode: builder.mutation<void, string>({
            query: (id) => ({
                url: `threads/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['nodes'],
        }),

        createNode: builder.mutation<void, CreateNodePaylaod>({
            query: (body) => ({
                url: 'threads/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['nodes'],
        }),

        updateNode: builder.mutation<void, UpdateNodePaylaod>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `threads/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['nodes'],
        }),

        deleteEdge: builder.mutation<void, DeleteEdgePaylaod>({
            query: (payload) => {
                const { sourse, ...rest } = payload;

                return {
                    url: `threads/relation/destroy/${sourse}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['nodes'],
        }),

        updateActiveNodeitem: builder.mutation<void, UpdateActiveNodeItem>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `threads/params/is_active/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['nodes'],
        }),

        getHDFS2KAFKA: builder.query<THDFS2KAFKARequst, string>({
            query: (id) => ({
                url: `threads/${id}/hdfs2kafka/`,
                method: 'GET',
            }),
            providesTags: ['HDFS2KAFKA'],
        }),

        updateHDFS2KAFKA: builder.mutation<void, THDFS2KAFKAPayload>({
            query: ({ id, ...rest }) => ({
                url: `threads/${id}/hdfs2kafka/`,
                method: 'PATCH',
                body: { ...rest },
            }),
            invalidatesTags: ['HDFS2KAFKA'],
        }),

        getKAFKA2HDFS: builder.query<KAFKA2THDFSRequst, string>({
            query: (id) => ({
                url: `threads/${id}/kafka2hdfs/`,
                method: 'GET',
            }),
            providesTags: ['KAFKA2HDFS'],
        }),

        updateKAFKA2HDFS: builder.mutation<void, KAFKA2THDFSPayload>({
            query: ({ id, ...rest }) => ({
                url: `threads/${id}/kafka2hdfs/`,
                method: 'PATCH',
                body: { ...rest },
            }),
            invalidatesTags: ['KAFKA2HDFS'],
        }),
        typeToKAFKA2HDFS: builder.query<string[], string>({
            query: (id) => ({
                url: `threads/${id}/terminationStrategy_types/`,
                method: 'GET',
            }),
            providesTags: ['KAFKA2HDFS'],
        }),
    }),
});

export type NodeRequestPayload = {
    branchId: string;
    streamId: string;
};

export type Position = {
    x: number;
    y: number;
};

export type SettingItem = {
    name: string;
    enabled: string;
};

export type Nodes = {
    id: number;
    name: string;
    position: Position;
    type: string;
    branch: number;
    stream: number;
    thread_relations: number[];
    rollBack: SettingItem;
    getIncrement: SettingItem;
    dmPreStage: SettingItem;
    historicity: SettingItem;
    dataQualityCheck: SettingItem;
    coalesceFiles: SettingItem;
    backUp: SettingItem;
    moveTable: SettingItem;
    hdfs2kafka: SettingItem;
};

export type NodeMeta = {
    rollBack: SettingItem;
    getIncrement: SettingItem;
    dmPreStage: SettingItem;
    historicity: SettingItem;
    dataQualityCheck: SettingItem;
    coalesceFiles: SettingItem;
    backUp: SettingItem;
    moveTable: SettingItem;
    hdfs2kafka: SettingItem;
    kafka2hdfs: SettingItem;
};

export type CreateNodePaylaod = {
    name: string;
    position: Position;
    type: string;
    branch: string;
    stream: string;
    thread_relations: number[];
};

export type UpdateNodePaylaod = {
    id: string;
    name?: string;
    position?: Position;
    branch?: string;
    stream?: string;
    thread_relations?: number[];
};

export type DeleteEdgePaylaod = {
    sourse: string;
    target: string;
};

export type UpdateActiveNodeItem = {
    id: string;
    get_increment?: boolean;
    dm_preStage?: boolean;
    history?: boolean;
    data_qualityCheck?: boolean;
    coalesce_files?: boolean;
    back_up?: boolean;
    move_table?: boolean;
};

export type Spark = {
    key: string;
    value: string;
};

export type ThreadsGetIncrement = {
    attrConfTable: string;
    settingsTable: string;
    loadingType: string;
    minVfrom: string;
    minLoadingId: string;
    dmName: string;
    parallelDegree: string;
    srcSchemaSnp: string;
    srcSchemaHist: string;
    cdcSchemaSnp: string;
    cdcSchemaHist: string;
    settingsExtTable: string;
    settingsMartTable: string;
    settingsReplTable: string;
    typeArcVal: string;
    createTableSettingsScript: string;
    statsTable: string;
    bcSizeLimit: string;
    sparkEngineParams: Spark[];
};

export type ThreadsGetIncrementRequest = {
    config: ThreadsGetIncrement;
};

export type ThreadsGetIncrementPayload = {
    id: string;
    getIncrement: {
        config: ThreadsGetIncrement;
    };
};

export type ThreadsDmPreStage = {
    sql_script: string;
    sparkEngineParams: Spark[];
};

export type ThreadsDmPreStageRequest = {
    config: ThreadsDmPreStage;
};

export type ThreadsDmPreStagePayload = {
    id: string;
    dmPreStage: {
        config: ThreadsDmPreStage;
    };
};

export type ThreadsHistoricity = {
    snpFilter: string;
    targetName: string;
    hashColumns: string;
    loadingMode: string;
    sourceQuery: string;
    sourceTable: string;
    businessKeys: string;
    historyColumns: string;
    customTargetSnp: string;
    customTargetHist: string;
    deletedFlagColumn: string;
    sparkEngineParams: Spark[];
};

export type ThreadsHistoricityRequest = {
    config: ThreadsHistoricity;
};

export type ThreadsHistoricityPayload = {
    id: string;
    historicity: {
        config: ThreadsHistoricity;
    };
};

export type ThreadsDataQualityCheck = {
    snpFilter: string;
    targetName: string;
    hashColumns: string;
    loadingMode: string;
    sourceQuery: string;
    sourceTable: string;
    businessKeys: string;
    historyColumns: string;
    customTargetSnp: string;
    customTargetHist: string;
    deletedFlagColumn: string;
    sparkEngineParams: Spark[];
};

export type ThreadsDataQualityCheckRequest = {
    config: ThreadsDataQualityCheck;
};

export type ThreadsDataQualityCheckPayload = {
    id: string;
    dataQualityCheck: {
        config: ThreadsHistoricity;
    };
};

export type ThreadsCoalesceFiles = {
    hdfsPaths: string;
    hdfsWorkPath: string;
    minFileSizeMB: string;
    parallelDegree: string;
    compressionType: string;
    sparkEngineParams: Spark[];
};

export type ThreadsCoalesceFilesRequest = {
    config: ThreadsCoalesceFiles;
};

export type ThreadsCoalesceFilesPayload = {
    id: string;
    coalesceFiles: {
        config: ThreadsCoalesceFiles;
    };
};

export type ThreadsRA = {
    compressionType: string;
    instanceFilter: string;
    s2tTableList: string;
    srcSchema: string;
    tgtSchema: string;
    truncateFilterList: string;
    truncateStgFromPa: boolean;
    workMode: string;
    sparkEngineParams: Spark[];
};

export type ThreadsRARequest = {
    config: ThreadsRA;
};

export type ThreadsRAPayload = {
    id: string;
    moveTable: {
        config: ThreadsRA;
    };
};

export type TKafka = {
    type: string;
    params: {
        msgPerSecond: number;
        secmanConfigPath: string;
        topic: string;
    };
};

export type TLogging = {
    type: string;
    params: {
        kafkaLogComment: string;
        logSchemaName: string;
        logTableName: string;
        shouldRecreateTable: boolean;
    };
};

export type TSource = {
    type: string;
    params: {
        sourceJsonValueColumn: string;
        sourceKeyColumn: string;
        sourceSql: string;
    };
};

export type THDFS2KAFKARequst = {
    config: {
        kafka?: TKafka;
        logging?: TLogging;
        source?: TSource;
    };
};

export type THDFS2KAFKAPayload = {
    id: string;
    kafka?: TKafka;
    logging?: TLogging;
    source?: TSource;
};

export type THDFS = {
    type: string;
    params: {
        kafkaConfigPath: number;
        msgPerSecond?: string;
        topic: string;
        secmanConfigPath: string;
    };
};

export type THDFS2 = {
    type: string;
    params: {
        tableName: string;
        schemaName: string;
        tableFormat: string;
        checkPointLocation: string;
        columnNameWithDate: string;
        columnNameForPartition: string;
    };
};

export type TKAFKA2 = {
    type: string;
    params: {
        topic: string;
        msgPerSecond: number;
        kafkaConfigPath: string;
        awaitTermination: boolean;
        secmanConfigPath: string;
    };
};

export type TGeneral = {
    processingTime: number;
    awaitTermination: boolean;
    deleteCheckPointLocation: boolean;
    timeoutSec: number;
};

export type TGeneral2 = {
    terminationStrategy: {
        type: string;
        params: {
            timeoutSec: number;
        };
    };
    processingTime: number;
};

export type TLogging2 = {
    type: string;
    params: {
        modeKafkaLogging: string;
    };
};

export type KAFKA2THDFSRequst = {
    config: {
        hdfs?: THDFS2;
        kafka?: TKAFKA2;
        logging?: TLogging2;
        source?: TSource;
        general?: TGeneral2;
    };
};

export type KAFKA2THDFSPayload = {
    id: string;
    hdfs?: THDFS2;
    kafka?: TKAFKA2;
    logging?: TLogging2;
    source?: TSource;
    general?: TGeneral2;
};

export type Threads = {
    rollBack: SettingItem;
    getIncrement: ThreadsGetIncrementRequest;
    dmPreStage: ThreadsDmPreStageRequest;
    historicity: ThreadsHistoricityRequest;
    dataQualityCheck: ThreadsDataQualityCheckRequest;
    coalesceFiles: ThreadsCoalesceFilesRequest;
    backUp: SettingItem;
    moveTable: ThreadsRARequest;
    hdfs2kafka: THDFS2KAFKARequst;
};

export const {
    useNodesQuery,
    useDeleteNodeMutation,
    useCreateNodeMutation,
    useUpdateNodeMutation,
    useDeleteEdgeMutation,
    useUpdateActiveNodeitemMutation,
    useCurrDataNodeQuery,
    useUpdateCurrDataNodeMutation,
    useGetHDFS2KAFKAQuery,
    useUpdateHDFS2KAFKAMutation,
    useGetKAFKA2HDFSQuery,
    useUpdateKAFKA2HDFSMutation,
    useTypeToKAFKA2HDFSQuery,
} = nodesApi;
