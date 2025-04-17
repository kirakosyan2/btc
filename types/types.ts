import { MarkerType } from '@xyflow/react';

export type UUID = string;

export type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'ms';

export type TaskT = {
    etl_name: string;
    etl_id: number;
    etl_url: string;
    branch_name: string;
    developer: TDeveloper;
    status: string;
    start_date: string;
    end_date: string;
    end_date_fact: null;
    list_of_developers: TDevelopersList[];
    list_of_statuses: string[];
};

export type TDeveloper = {
    name: string;
    id: number;
};

export type TDevelopersList = {
    name: string;
    id: number;
};

export type StreamT = {
    ctl_entity_id: number;
    stream_name: string;
    stream_id: number;
    relations: TRelations[];
    stream_nodes: StreamNode[];
};

export type TMarker = {
    type: MarkerType;
    width: number;
    height: number;
    color: string;
};

export type TRelations = {
    source: string;
    target: string;
    id: number;
    markerEnd?: TMarker;
    style?: {};
};

export type BitbucketT = {
    branch_name: string;
    list_of_branches: [string];
    developer_email: string;
    jira: string;
    block_type: string;
    cron: string;
    developers_emails: [string, string];
    list_of_block_types: [string];
};

export type StreamNode = {
    id: string;
    position: {
        x: string;
        y: string;
    };
    type: string;
    data: StreamNodesDataT;
};

export type StreamNodesDataT = {
    name: string;
    branch: number;
    stream: number;
    rollBack: RollBackT;
    getIncrement: GetIncrementT;
    dmPreStage: DmPreStageT;
    historisity: HistorisityT;
    dataQualityCheck: DataQualityCheckT;
    coalesceFiles: CoalesceFilesT;
    backUp: BackUpT;
    moveTable: MoveTableT;
    relation_to: Relation_toT;
};

export type RollBackT = {
    name: string;
    config: {};
    enabled: string;
};
export type GetIncrementT = {
    name: string;
    config: {
        dmName: string;
        minVfrom: string;
        statsTable: string;
        typeArcVal: string;
        bcSizeLimit: string;
        loadingType: string;
        cdcSchemaSnp: string;
        minLoadingId: string;
        srcSchemaSnp: string;
        attrConfTable: string;
        cdcSchemaHist: string;
        settingsTable: string;
        srcSchemaHist: string;
        parallelDegree: string;
        settingsExtTable: string;
        settingsMartTable: string;
        settingsReplTable: string;
        sparkEngineParams: {};
        createTableSettingsScript: string;
    };
    enabled: string;
};

export type DmPreStageT = {
    name: string;
    config: {
        sql_script: string;
        sparkEngineParams: {};
    };
    enabled: string;
};

export type HistorisityT = {
    name: string;
    config: {
        targetName: string;
        sourceTable: string;
        sourceQuery: string;
        loadingMode: string;
        businessKeys: string;
        hashColumns: string;
        targetHashColName: string;
        historyColumns: string;
        deletedFlagColumn: string;
        snpFilter: string;
        customTargetSnp: string;
        customTargetHist: string;
        sparkEngineParams: {};
    };
    enabled: string;
};

export type DataQualityCheckT = {
    data: any;
    name: string;
    config: {
        dq: {
            stats: [
                {
                    string: {
                        value: string;
                        params: {
                            table?: string;
                            columns?: string;
                            aggType?: string;
                            column?: string;
                            query?: string;
                        };
                        enabled: false;
                    };
                },
            ];
            checks: [
                {
                    string: {
                        value: string;
                        enabled: false;
                    };
                },
            ];
        };
        sparkEngineParams: [null];
    };
    enabled: ['false'];
    statistic_types: [
        'Custom',
        'CountNulls',
        'CountRows',
        'CountDistincs',
        'CheckActuality',
        'CheckAggregate',
        'CountDuplicates',
        'CountCategories',
    ];
};

export type CoalesceFilesT = {
    name: string;
    config: {
        hdfsPaths: string;
        hdfsWorkPath: string;
        minFileSizeMB: number;
        parallelDegree: string;
        compressionType: string;
        sparkEngineParams: {};
    };
    enabled: string;
};

export type BackUpT = {
    name: string;
    config: {
        sparkEngineParams: {};
    };
    enabled: string;
};

export type MoveTableT = {
    name: string;
    config: {
        workMode: string;
        srcSchema: string;
        tgtSchema: string;
        s2tTableList: string;
        instanceFilter: string;
        compressionType: string;
        sparkEngineParams: {};
        truncateStgFromPa: string;
        truncateFilterList: string;
    };
    enabled: string;
};

export type Relation_toT = [
    {
        to: string;
        from: string;
    },
];

export type modalFields =
    | 'Модуль восстановления данных'
    | 'Модуль извлечения инкремента'
    | 'Модуль формирования STG'
    | 'Модуль формирования историчности'
    | 'Модуль проверки качества данных'
    | 'Модуль склейки файлов'
    | 'Модуль бэкапирования'
    | 'Модуль перемещения данных в PA';

export type modalFieldsData =
    | { type: 'Модуль восстановления данных'; data: RollBackT }
    | { type: 'Модуль извлечения инкремента'; data: GetIncrementT }
    | { type: 'Модуль формирования STG'; data: DmPreStageT }
    | { type: 'Модуль формирования историчности'; data: HistorisityT }
    | { type: 'Модуль проверки качества данных'; data: DataQualityCheckT }
    | { type: 'Модуль склейки файлов'; data: CoalesceFilesT }
    | { type: 'Модуль бэкапирования'; data: BackUpT }
    | { type: 'Модуль перемещения данных в PA'; data: MoveTableT };

export type RepositoryT = {
    repo_link: string;
    branch_name: string;
    branch_status: string;
    branch_upload_at: string;
};

export type PropsTooltipText = {
    column?: string;
    table: string;
    format?: string;
    aggType?: string;
    excluded_letters?: string;
    startdt_enddt?: string;
    default?: string;
    check_cyrillic?: string;
    primary_keys?: string;
    query?: string;
};
