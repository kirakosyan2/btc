import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { DDLApi } from './DDL/DDL';
import { DQSApi } from './DQC/DQC';
import DQCReducer from './DQC/DQC.slice';
import DQCCheckReducer from './DQC/DQCCheck.slice';
import { FAQApi } from './FAQ/FAQ';
import { acesApi } from './aces/aces';
import { authApi } from './auth/auth';
import authReducer from './auth/auth.slice';
import { blockApi } from './block/block';
import { branchesApi } from './branches/branches';
import { clusterApi } from './clusters/clusters';
import { etlApi } from './config/configs';
import { customersApi } from './customers/customers';
import { deployApi } from './deploy/deploy';
import { devepersApi } from './developers/developers';
import { directoriesAndFilesApi } from './directoriesAndFiles/directoriesAndFiles';
import { formatApi } from './format/format';
import { initiativeApi } from './initiative/initiative';
import { nodesApi } from './nodes/nodes';
import { notificationsApi } from './notifications/notifications';
import { personalCabinetApi } from './personalCabinet/personalCabinet';
import { referenceApi } from './reference/reference';
import { s2tApi } from './s2t/s2t';
import { showcasesApi } from './showcases/showcase';
import { statisticsApi } from './statistic/statistics';
import { streamApi } from './stream/stream';
import { streamV2Api } from './streamV2/streamV2';
import { teamsApi } from './teams/teams';
import { testApi } from './test/test';
import { taskStatusApi } from './types/type';
import { unauthenticatedMiddleware } from './unauthenticatedMiddleware';
import { userparamsApi } from './userparams/userparams';

const store = configureStore({
    reducer: {
        auth: authReducer,
        DQC: DQCReducer,
        DQCCheck: DQCCheckReducer,
        [authApi.reducerPath]: authApi.reducer,
        [teamsApi.reducerPath]: teamsApi.reducer,
        [blockApi.reducerPath]: blockApi.reducer,
        [customersApi.reducerPath]: customersApi.reducer,
        [initiativeApi.reducerPath]: initiativeApi.reducer,
        [showcasesApi.reducerPath]: showcasesApi.reducer,
        [acesApi.reducerPath]: acesApi.reducer,
        [formatApi.reducerPath]: formatApi.reducer,
        [etlApi.reducerPath]: etlApi.reducer,
        [personalCabinetApi.reducerPath]: personalCabinetApi.reducer,
        [devepersApi.reducerPath]: devepersApi.reducer,
        [streamApi.reducerPath]: streamApi.reducer,
        [deployApi.reducerPath]: deployApi.reducer,
        [FAQApi.reducerPath]: FAQApi.reducer,
        [branchesApi.reducerPath]: branchesApi.reducer,
        [taskStatusApi.reducerPath]: taskStatusApi.reducer,
        [statisticsApi.reducerPath]: statisticsApi.reducer,
        [nodesApi.reducerPath]: nodesApi.reducer,
        [DQSApi.reducerPath]: DQSApi.reducer,
        [DDLApi.reducerPath]: DDLApi.reducer,
        [s2tApi.reducerPath]: s2tApi.reducer,
        [clusterApi.reducerPath]: clusterApi.reducer,
        [testApi.reducerPath]: testApi.reducer,
        [userparamsApi.reducerPath]: userparamsApi.reducer,
        [referenceApi.reducerPath]: referenceApi.reducer,
        [notificationsApi.reducerPath]: notificationsApi.reducer,
        [directoriesAndFilesApi.reducerPath]: directoriesAndFilesApi.reducer,
        [streamV2Api.reducerPath]: streamV2Api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat([
            authApi.middleware,
            teamsApi.middleware,
            blockApi.middleware,
            customersApi.middleware,
            initiativeApi.middleware,
            showcasesApi.middleware,
            acesApi.middleware,
            formatApi.middleware,
            etlApi.middleware,
            personalCabinetApi.middleware,
            devepersApi.middleware,
            streamApi.middleware,
            deployApi.middleware,
            branchesApi.middleware,
            taskStatusApi.middleware,
            statisticsApi.middleware,
            nodesApi.middleware,
            DQSApi.middleware,
            DDLApi.middleware,
            s2tApi.middleware,
            clusterApi.middleware,
            FAQApi.middleware,
            testApi.middleware,
            userparamsApi.middleware,
            referenceApi.middleware,
            notificationsApi.middleware,
            directoriesAndFilesApi.middleware,
            streamV2Api.middleware,

            unauthenticatedMiddleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
