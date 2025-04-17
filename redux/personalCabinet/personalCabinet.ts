import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const personalCabinetApi = createApi({
    reducerPath: 'personalCabinetRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['personalCabinet'],
    endpoints: (builder) => ({
        personalCabinetList: builder.query<PersonalCabinetList[], void>({
            query: () => ({
                url: 'user_profile/',
                method: 'GET',
            }),
        }),

        me: builder.query<Me, void>({
            query: () => ({
                url: 'auth/users/me/',
                method: 'GET',
            }),
        }),
    }),
});

export type PersonalCabinetList = {
    customer_id: number;
    customer_name: string;
    initiative_id: number;
    initiative_name: string;
    datamart_id: number;
    datamart_name: string;
    branch_id: number;
    branch_name: string;
    developer_name: string;
    task_status: string;
    start_date_time: string;
    username: string;
};

export type Me = {
    team: number;
    id: number;
    username: string;
};

export const { usePersonalCabinetListQuery, useMeQuery } = personalCabinetApi;
