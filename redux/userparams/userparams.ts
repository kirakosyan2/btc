import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const userparamsApi = createApi({
    reducerPath: 'userparamsRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    endpoints: (builder) => ({
        uservars: builder.query<string[], string>({
            query: (id) => ({
                url: `branch/${id}/user_vars/`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useUservarsQuery } = userparamsApi;
