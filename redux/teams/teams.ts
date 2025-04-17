import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const teamsApi = createApi({
    reducerPath: 'comandsRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    endpoints: (builder) => ({
        teams: builder.query<TransformTeamsList[], void>({
            query: () => ({
                url: 'teams',
                method: 'GET',
            }),
            transformResponse: (data: TeamsList[]): TransformTeamsList[] => {
                return data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                }));
            },
        }),

        createTeam: builder.mutation<void, TeamPayload>({
            query: (body) => ({
                url: 'teams/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export type TeamsList = {
    id: number;
    name: string;
    confluence_link: string;
    block: number;
};

export type TransformTeamsList = {
    value: number;
    label: string;
};

export type TeamPayload = {
    name: string;
    confluence_link: string;
    block: number;
};

export const { useTeamsQuery, useCreateTeamMutation } = teamsApi;
