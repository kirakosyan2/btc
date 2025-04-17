import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const devepersApi = createApi({
    reducerPath: 'developersRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    endpoints: (builder) => ({
        developers: builder.query<TransformDevelopersList[], void>({
            query: () => ({
                url: 'developers/',
                method: 'GET',
            }),
            transformResponse: (
                data: DevelopersList[]
            ): TransformDevelopersList[] => {
                return data
                    .filter((item) => item.login_sigma)
                    .map(({ id, full_name }) => ({
                        value: id,
                        label: full_name,
                    }));
            },
        }),
    }),
});

export type DevelopersList = {
    id: number;
    date_joined: string;
    email: string;
    email_omega: string;
    first_name: string;
    full_name: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: string;
    last_name: string;
    login_omega: string;
    login_sigma: string;
    role: number;
    team: number;
    username: string;
};

export type TransformDevelopersList = {
    value: number;
    label: string;
};

export const { useDevelopersQuery } = devepersApi;
