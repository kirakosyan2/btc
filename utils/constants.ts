import { PropsTooltipText } from '@src/types/types';

export const DEFAULT_PRESETS = [
    {
        id: '0',
        label: 'Для простых вычислений',
        description: `--conf spark.sql.shuffle.partitions=80
--conf spark.driver.memory=1G
--conf spark.driver.cores=1
--conf spark.dynamicAllocation.minExecutors=0
--conf spark.dynamicAllocation.maxExecutors=1
--conf spark.executor.memory=1G
--conf spark.executor.cores=1`,
    },
    {
        id: '1',
        label: 'Для средних вычислений',
        description: `--conf spark.sql.shuffle.partitions=80
--conf spark.driver.memory=2G
--conf spark.driver.cores=1
--conf spark.dynamicAllocation.minExecutors=0
--conf spark.dynamicAllocation.maxExecutors=2
--conf spark.executor.memory=2G
--conf spark.executor.cores=2
        `,
    },
    {
        id: '2',
        label: 'Для сложных вычислений',
        description: `--conf spark.sql.shuffle.partitions=120
--conf spark.driver.memory=2G
--conf spark.driver.cores=1
--conf spark.dynamicAllocation.minExecutors=0
--conf spark.dynamicAllocation.maxExecutors=8
--conf spark.executor.memory=2G
--conf spark.executor.cores=2`,
    },
    {
        id: '3',
        label: 'Для очень сложных вычислений',
        description: `--conf spark.sql.shuffle.partitions=120
--conf spark.driver.memory=8G
--conf spark.driver.cores=4
--conf spark.dynamicAllocation.minExecutors=0
--conf spark.dynamicAllocation.maxExecutors=16
--conf spark.executor.memory=4G
--conf spark.executor.cores=4`,
    },
];

export const OPTIONS_STAT_TYPES = [
    { label: 'constant', value: 'constant' },
    { label: 'variable', value: 'variable' },
];

export const OPTIONS_BOOLEANS = [
    { label: 'True', value: 'true' },
    { label: 'False', value: 'false' },
];

export const OPTIONS_DQC = [
    {
        value: 'Custom',
        label: 'Custom',
    },
    {
        value: 'CountNulls',
        label: 'CountNulls',
    },
    {
        value: 'CountRows',
        label: 'CountRows',
    },
    {
        value: 'CountDistincs',
        label: 'CountDistincs',
    },
    {
        value: 'CheckActuality',
        label: 'CheckActuality',
    },
    {
        value: 'CheckAggregate',
        label: 'CheckAggregate',
    },
    {
        value: 'CountDuplicates',
        label: 'CountDuplicates',
    },
    // {
    //     value: 'CountCategories',
    //     label: 'CountCategories',
    // },
    {
        value: 'CountSkew',
        label: 'CountSkew',
    },
    {
        value: 'CountEmpty',
        label: 'CountEmpty',
    },
    {
        value: 'CheckFormat',
        label: 'CheckFormat',
    },
    {
        value: 'CheckIntervals',
        label: 'CheckIntervals',
    },
    {
        value: 'CountDefaultValues',
        label: 'CountDefaultValues',
    },
];

export const CONFLUENCE_LINK = [
    {
        module: 'Модуль извлечения инкремента',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=(1.009)-,%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%20%D0%B8%D0%B7%D0%B2%D0%BB%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B8%D0%BD%D0%BA%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0,-%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BB(%D0%B0)',
    },
    {
        module: 'Модуль формирования STG',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221148#:~:text=(1.009)-,%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%20%D1%84%D0%BE%D1%80%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20STG,-%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BB(%D0%B0)',
    },
    {
        module: 'Модуль формирования историчности',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#:~:text=(1.009)-,%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%20%D1%84%D0%BE%D1%80%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D1%87%D0%BD%D0%BE%D1%81%D1%82%D0%B8,-%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%20%D0%A9%D0%B5%D1%80%D0%B1%D0%B8%D1%86%D0%BA%D0%B8%D0%B9%20%D0%91%D0%BE%D1%80%D0%B8%D1%81',
    },
    {
        module: 'Модуль проверки качества данных',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221150#:~:text=(1.009)-,%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B8%20%D0%BA%D0%B0%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B0%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85,-%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BB(%D0%B0)',
    },
    {
        module: 'Модуль склейки файлов',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221153#:~:text=(1.009)-,%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%20%D1%81%D0%BA%D0%BB%D0%B5%D0%B9%D0%BA%D0%B8%20%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2,-%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BB(%D0%B0)',
    },
    {
        module: 'Модуль перемещения данных в PA',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221155#:~:text=(1.009)-,%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B2%20PA,-%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BB(%D0%B0)',
    },
];

export const INCREMENT_LINK = [
    {
        label: 'Путь к инициализационному скрипту создания и заполнения таблиц настроек модуля',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%B6%D0%B8%D0%BC%D0%B0%20%D0%B0%D1%80%D1%85%D0%B8%D0%B2%D0%B0%D1%86%D0%B8%D0%B8-,createTableSettingsScript,-%D0%9F%D1%83%D1%82%D1%8C%20%D0%BA%20%D0%B8%D0%BD%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%BE%D0%BC%D1%83',
    },

    {
        label: 'Название необязательной таблицы с настройками',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=settingsReplTable-,%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B5%D0%BE%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%20%D1%81%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0%D0%BC%D0%B8,-typeArcVal',
    },
    {
        label: 'Название необязательной таблицы с настройками',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=settingsReplTable-,%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B5%D0%BE%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%20%D1%81%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0%D0%BC%D0%B8,-typeArcVal',
    },
    {
        label: 'Название необязательной таблицы с настройками',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-:~:text=settingsExtTable-,%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B5%D0%BE%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%20%D1%81%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0%D0%BC%D0%B8,-settingsMartTable',
    },
    {
        label: 'Степень параллелизма',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%A1%D1%82%D0%B5%D0%BF%D0%B5%D0%BD%D1%8C%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BB%D0%BB%D0%B5%D0%BB%D0%B8%D0%B7%D0%BC%D0%B0',
    },
    {
        label: 'Схема хранения хиста целевой таблицы',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%A1%D1%85%D0%B5%D0%BC%D0%B0%20%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%85%D0%B8%D1%81%D1%82%D0%B0%20%D1%86%D0%B5%D0%BB%D0%B5%D0%B2%D0%BE%D0%B9%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B',
    },
    {
        label: 'Название таблицы с настройками подсчета инкремента',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%20%D1%81%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%B4%D1%81%D1%87%D0%B5%D1%82%D0%B0%20%D0%B8%D0%BD%D0%BA%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0',
    },
    {
        label: 'Схема хиста результата',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%A1%D1%85%D0%B5%D0%BC%D0%B0%20%D1%85%D0%B8%D1%81%D1%82%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0',
    },
    {
        label: 'Название таблицы с атрибутным составом используемых при расчете страниц',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%20%D1%81%20%D0%B0%D1%82%D1%80%D0%B8%D0%B1%D1%83%D1%82%D0%BD%D1%8B%D0%BC%20%D1%81%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BE%D0%BC%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D0%BC%D1%8B%D1%85%20%D0%BF%D1%80%D0%B8%20%D1%80%D0%B0%D1%81%D1%87%D0%B5%D1%82%D0%B5%20%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86',
    },
    {
        label: 'Схема хранения снепшота целевой таблицы',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%A1%D1%85%D0%B5%D0%BC%D0%B0%20%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%81%D0%BD%D0%B5%D0%BF%D1%88%D0%BE%D1%82%D0%B0%20%D1%86%D0%B5%D0%BB%D0%B5%D0%B2%D0%BE%D0%B9%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B',
    },
    {
        label: 'Схема хранения снепшота целевой таблицы',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%A1%D1%85%D0%B5%D0%BC%D0%B0%20%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%81%D0%BD%D0%B5%D0%BF%D1%88%D0%BE%D1%82%D0%B0%20%D1%86%D0%B5%D0%BB%D0%B5%D0%B2%D0%BE%D0%B9%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B',
    },
    {
        label: 'Минимальный loading id',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%9C%D0%B8%D0%BD%D0%B8%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20loading%20id',
    },
    {
        label: 'Схема снепшота результата',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%A1%D1%85%D0%B5%D0%BC%D0%B0%20%D1%81%D0%BD%D0%B5%D0%BF%D1%88%D0%BE%D1%82%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0',
    },
    {
        label: 'Режим подсчета инкремента',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%A0%D0%B5%D0%B6%D0%B8%D0%BC%20%D0%BF%D0%BE%D0%B4%D1%81%D1%87%D0%B5%D1%82%D0%B0%20%D0%B8%D0%BD%D0%BA%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0',
    },
    {
        label: 'Максимальный размер инкремента, при котором все еще используется broadcast join',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%20%D0%B8%D0%BD%D0%BA%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%2C%20%D0%BF%D1%80%D0%B8%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BE%D0%BC%20%D0%B2%D1%81%D0%B5%20%D0%B5%D1%89%D0%B5%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D1%82%D1%81%D1%8F%20broadcast%20join',
    },
    {
        label: 'Максимальный размер инкремента, при котором все еще используется broadcast join',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%20%D0%B8%D0%BD%D0%BA%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%2C%20%D0%BF%D1%80%D0%B8%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BE%D0%BC%20%D0%B2%D1%81%D0%B5%20%D0%B5%D1%89%D0%B5%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D1%82%D1%81%D1%8F%20broadcast%20join',
    },
    {
        label: 'Название режима архивации',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%B6%D0%B8%D0%BC%D0%B0%20%D0%B0%D1%80%D1%85%D0%B8%D0%B2%D0%B0%D1%86%D0%B8%D0%B8',
    },
    {
        label: '',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%9F%D1%83%D1%82%D1%8C%20%D0%B4%D0%BE%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%20%D1%81%D0%BE%20%D1%81%D1%82%D0%B0%D1%82%D0%B8%D1%81%D1%82%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8',
    },
    {
        label: 'Минимальная временная отсечка для обрезки лишней истории',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%9C%D0%B8%D0%BD%D0%B8%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F%20%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F%20%D0%BE%D1%82%D1%81%D0%B5%D1%87%D0%BA%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D0%B1%D1%80%D0%B5%D0%B7%D0%BA%D0%B8%20%D0%BB%D0%B8%D1%88%D0%BD%D0%B5%D0%B9%20%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D0%B8',
    },
    {
        label: 'Названия витрин, для которых нужно посчитать инкремент, через ";"',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221147#expand-JSON:~:text=%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%B2%D0%B8%D1%82%D1%80%D0%B8%D0%BD%2C%20%D0%B4%D0%BB%D1%8F%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D1%85%20%D0%BD%D1%83%D0%B6%D0%BD%D0%BE%20%D0%BF%D0%BE%D1%81%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C%20%D0%B8%D0%BD%D0%BA%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%2C%20%D1%87%D0%B5%D1%80%D0%B5%D0%B7%20%22%3B%22',
    },
];

export const HISTORY_LINK = [
    {
        label: 'Название поля с хешем (посчитанном по колонкам hashColumns)',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F%20%D1%81%20%D1%85%D0%B5%D1%88%D0%B5%D0%BC%20(%D0%BF%D0%BE%D1%81%D1%87%D0%B8%D1%82%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC%20%D0%BF%D0%BE%20%D0%BA%D0%BE%D0%BB%D0%BE%D0%BD%D0%BA%D0%B0%D0%BC%20hashColumns)',
    },
    {
        label: 'Нужно только для инкрементальных режимов, определяет название поля источника с индикатором удаленной записи',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%D0%9D%D1%83%D0%B6%D0%BD%D0%BE%20%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%B4%D0%BB%D1%8F%20%D0%B8%D0%BD%D0%BA%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85%20%D1%80%D0%B5%D0%B6%D0%B8%D0%BC%D0%BE%D0%B2%2C%20%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D1%8F%D0%B5%D1%82%20%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F%20%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%20%D1%81%20%D0%B8%D0%BD%D0%B4%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%D0%BE%D0%BC%20%D1%83%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B8',
    },
    {
        label: 'customTargetHist',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%E2%9A%99%EF%B8%8F-,%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20JSON,-%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80',
    },
    {
        lable: 'customTargetSnp',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%E2%9A%99%EF%B8%8F-,%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20JSON,-%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80',
    },
    {
        label: 'Список полей, задающих бизнес-историю в таблице-источнике',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%BF%D0%BE%D0%BB%D0%B5%D0%B9%2C%20%D0%B7%D0%B0%D0%B4%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%2D%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D1%8E%20%D0%B2%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B5%2D%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B5',
    },
    {
        label: 'Список бизнес-ключей таблицы-источника через запятую',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%2D%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B9%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%2D%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%20%D1%87%D0%B5%D1%80%D0%B5%D0%B7%20%D0%B7%D0%B0%D0%BF%D1%8F%D1%82%D1%83%D1%8E',
    },
    {
        label: 'Название таблицы-источника (может содержать как полный срез, так и инкремент)',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%2D%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%20(%D0%BC%D0%BE%D0%B6%D0%B5%D1%82%20%D1%81%D0%BE%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D1%82%D1%8C%20%D0%BA%D0%B0%D0%BA%20%D0%BF%D0%BE%D0%BB%D0%BD%D1%8B%D0%B9%20%D1%81%D1%80%D0%B5%D0%B7%2C%20%D1%82%D0%B0%D0%BA%20%D0%B8%20%D0%B8%D0%BD%D0%BA%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%82)',
    },
    {
        label: 'sourceQuery',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%2D%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B9%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%2D%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%20%D1%87%D0%B5%D1%80%D0%B5%D0%B7%20%D0%B7%D0%B0%D0%BF%D1%8F%D1%82%D1%83%D1%8E',
    },
    {
        label: 'Режим загрузки: архивный (arc) или инкрементальный (inc)',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%D0%A0%D0%B5%D0%B6%D0%B8%D0%BC%20%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B8%3A%20%D0%B0%D1%80%D1%85%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9%20(arc)%20%D0%B8%D0%BB%D0%B8%20%D0%B8%D0%BD%D0%BA%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20(inc)',
    },
    {
        label: 'Название поля с хешем (посчитанном по колонкам hashColumns)',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F%20%D1%81%20%D1%85%D0%B5%D1%88%D0%B5%D0%BC%20(%D0%BF%D0%BE%D1%81%D1%87%D0%B8%D1%82%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC%20%D0%BF%D0%BE%20%D0%BA%D0%BE%D0%BB%D0%BE%D0%BD%D0%BA%D0%B0%D0%BC%20hashColumns)',
    },
    {
        label: 'targetName',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%2D%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B9%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%2D%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%20%D1%87%D0%B5%D1%80%D0%B5%D0%B7%20%D0%B7%D0%B0%D0%BF%D1%8F%D1%82%D1%83%D1%8E',
    },
    {
        label: 'snpFilter',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221149#expand-JSON:~:text=%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%2D%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B9%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B%2D%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%20%D1%87%D0%B5%D1%80%D0%B5%D0%B7%20%D0%B7%D0%B0%D0%BF%D1%8F%D1%82%D1%83%D1%8E',
    },
];

export const DQC_LINK = [
    {
        label: 'Модуль проверки качества данных',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221150#expand-JSON:~:text=(1.009)-,%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B8%20%D0%BA%D0%B0%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B0%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85,-%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BB(%D0%B0)',
    },
];

export const FIELS_LINK = [
    {
        label: 'Тип Сжатия',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221153#expand-JSON:~:text=(%D0%BD%D0%B5%D0%BE%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80)-,%D0%A2%D0%B8%D0%BF%20%D0%A1%D0%B6%D0%B0%D1%82%D0%B8%D1%8F,-gz%2C%20snappy',
    },
    {
        label: 'parallelDegree',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221153#expand-JSON:~:text=%C2%A0%22parallelDegree%22%3A%20%221%22',
    },
    {
        label: 'Минимальный размер файла в мб. Если после склейки файлов больше одного, то все файлы имеют размер больше MinFileSizeMB',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221153#expand-JSON:~:text=%D0%9C%D0%B8%D0%BD%D0%B8%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%20%D1%84%D0%B0%D0%B9%D0%BB%D0%B0%20%D0%B2%20%D0%BC%D0%B1.%20%D0%95%D1%81%D0%BB%D0%B8%20%D0%BF%D0%BE%D1%81%D0%BB%D0%B5%20%D1%81%D0%BA%D0%BB%D0%B5%D0%B9%D0%BA%D0%B8%20%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%20%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B5%20%D0%BE%D0%B4%D0%BD%D0%BE%D0%B3%D0%BE%2C%20%D1%82%D0%BE%20%D0%B2%D1%81%D0%B5%20%D1%84%D0%B0%D0%B9%D0%BB%D1%8B%20%D0%B8%D0%BC%D0%B5%D1%8E%D1%82%20%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%20%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B5%20MinFileSizeMB',
    },
    {
        label: 'Директория, используемая для промежуточных вычислений. Удаляется после завершения работы алгоритма',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221153#expand-JSON:~:text=%D0%94%D0%B8%D1%80%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D1%8F%2C%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D0%BC%D0%B0%D1%8F%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D1%80%D0%BE%D0%BC%D0%B5%D0%B6%D1%83%D1%82%D0%BE%D1%87%D0%BD%D1%8B%D1%85%20%D0%B2%D1%8B%D1%87%D0%B8%D1%81%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9.%20%D0%A3%D0%B4%D0%B0%D0%BB%D1%8F%D0%B5%D1%82%D1%81%D1%8F%20%D0%BF%D0%BE%D1%81%D0%BB%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B5%D1%80%D1%88%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B%20%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC%D0%B0',
    },
    {
        label: 'Перечень путей, к которым будет применена процедура склейки файлов',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221153#expand-JSON:~:text=%D0%9F%D0%B5%D1%80%D0%B5%D1%87%D0%B5%D0%BD%D1%8C%20%D0%BF%D1%83%D1%82%D0%B5%D0%B9%2C%20%D0%BA%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%BC%20%D0%B1%D1%83%D0%B4%D0%B5%D1%82%20%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B0%20%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D0%B4%D1%83%D1%80%D0%B0%20%D1%81%D0%BA%D0%BB%D0%B5%D0%B9%D0%BA%D0%B8%20%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2',
    },
];

export const RA_LINK = [
    {
        label: 'Перечисление партиций из PA, которые будут предварительно удалены перед перемещением партиций из STG',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221155#expand-JSON:~:text=%D0%9F%D0%B5%D1%80%D0%B5%D1%87%D0%B8%D1%81%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%B0%D1%80%D1%82%D0%B8%D1%86%D0%B8%D0%B9%20%D0%B8%D0%B7%20PA%2C%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5%20%D0%B1%D1%83%D0%B4%D1%83%D1%82%20%D0%BF%D1%80%D0%B5%D0%B4%D0%B2%D0%B0%D1%80%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%20%D1%83%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D1%8B%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%20%D0%BF%D0%B0%D1%80%D1%82%D0%B8%D1%86%D0%B8%D0%B9%20%D0%B8%D0%B7%20STG',
    },
    {
        label: 'Флаг удаления данных из PA перед перемещением.',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221155#expand-JSON:~:text=%D0%A4%D0%BB%D0%B0%D0%B3%20%D1%83%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B8%D0%B7%20PA%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC',
    },
    {
        label: 'Алгоритм сжатия паркет-файлов',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221155#expand-JSON:~:text=%D0%90%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC%20%D1%81%D0%B6%D0%B0%D1%82%D0%B8%D1%8F%20%D0%BF%D0%B0%D1%80%D0%BA%D0%B5%D1%82%2D%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2',
    },
    {
        label: 'Условие для предварительной фильтрации партиций, к которым будет применен truncateFilterList',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221155#expand-JSON:~:text=%D0%A3%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D0%B5%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D1%80%D0%B5%D0%B4%D0%B2%D0%B0%D1%80%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9%20%D1%84%D0%B8%D0%BB%D1%8C%D1%82%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D0%BF%D0%B0%D1%80%D1%82%D0%B8%D1%86%D0%B8%D0%B9%2C%20%D0%BA%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%BC%20%D0%B1%D1%83%D0%B4%D0%B5%D1%82%20%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%C2%A0truncateFilterList',
    },
    {
        label: 'Перечисление таблиц через точку с запятой в формате "ТаблицаИсточник->ТаблицаПриемник"',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221155#expand-JSON:~:text=%D0%9F%D0%B5%D1%80%D0%B5%D1%87%D0%B8%D1%81%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%20%D1%87%D0%B5%D1%80%D0%B5%D0%B7%20%D1%82%D0%BE%D1%87%D0%BA%D1%83%20%D1%81%20%D0%B7%D0%B0%D0%BF%D1%8F%D1%82%D0%BE%D0%B9%20%D0%B2%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B5%20%22%D0%A2%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%D0%98%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%2D%3E%D0%A2%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%D0%9F%D1%80%D0%B8%D0%B5%D0%BC%D0%BD%D0%B8%D0%BA%22',
    },

    {
        label: 'Название схемы приемника в hive',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221155#expand-JSON:~:text=%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%81%D1%85%D0%B5%D0%BC%D1%8B%20%D0%BF%D1%80%D0%B8%D0%B5%D0%BC%D0%BD%D0%B8%D0%BA%D0%B0%20%D0%B2%20hive',
    },
    {
        label: 'Название схемы источника в hive',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221155#expand-JSON:~:text=%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%81%D1%85%D0%B5%D0%BC%D1%8B%20%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%20%D0%B2%20hive',
    },
    {
        label: 'Режим работы алгоритма перезаписи',
        link: 'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=13508221155#expand-JSON:~:text=%D0%A0%D0%B5%D0%B6%D0%B8%D0%BC%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B%20%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC%D0%B0%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B8',
    },
];

export const TOOLTIP_TEXTS: Record<string, PropsTooltipText> = {
    CountNulls: {
        column: 'Например, ints',
        table: 'Например, custom_b2c_sql_fw.dqc_test',
    },
    CountEmpty: {
        column: 'Например, strings',
        table: 'Например, custom_b2c_sql_fw.dqc_test',
    },
    CountRows: {
        table: 'Например, custom_b2c_sql_fw.dqc_test',
    },
    CountDistincs: {
        column: 'Например, duplicates',
        table: 'Например, custom_b2c_sql_fw.dqc_test',
    },
    CheckActuality: {
        column: 'Например, valid_from',
        table: 'Например, custom_b2c_sql_fw.dqc_test',
        format: 'Например, yyyy-MM-dd',
    },
    CheckAggregate: {
        column: 'Например, no_nulls',
        aggType: 'Например, MAX',
        table: 'Например, custom_b2c_sql_fw.dqc_test',
    },
    CountDuplicates: {
        column: 'Например, duplicates',
        table: 'Например, custom_b2c_sql_fw.dqc_test',
    },
    CountSkew: {
        column: 'Например, ints',
        table: 'Например, custom_b2c_sql_fw.dqc_test',
    },
    CheckFormat: {
        column: 'Например, strings',
        excluded_letters: 'Например, !+&\\(',
        check_cyrillic: 'Например, false',
        table: 'Например, custom_b2c_sql_fw.dqc_test_format',
    },
    CheckIntervals: {
        column: 'Например, strings',
        table: 'Например, custom_b2c_sql_fw.dqc_test',
        primary_keys: 'Например, samies',
        startdt_enddt:
            'Указать 2 колонки через запятую, например: valid_from, valid_to',
    },
    CountDefaultValues: {
        column: 'Например, duplicates',
        default: 'Например, 8',
        table: 'Например, custom_b2c_sql_fw.dqc_test',
    },
    Custom: {
        query: 'Например, 2 + 4',
        table: 'Например, custom_b2c_sql_fw.dqc_test',
    },
};

export const DEFAULT_DATAMART_STATUS = [
    {
        value: 'Опытная эксплуатация',
        label: 'Опытная эксплуатация',
    },
    {
        value: 'Промышленная эксплуатация',
        label: 'Промышленная эксплуатация',
    },
    {
        value: 'Выведена из эксплуатации',
        label: 'Выведена из эксплуатации',
    },
];
