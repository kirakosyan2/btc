import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query';

import { authApi } from './auth/auth';
import { RootState } from './store';

export const getBaseQuery = (
    url: string
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
    const baseQuery = fetchBaseQuery({
        // baseUrl: `http://b2c-sql-web.sigma.sbrf.ru:85${url}`,
        // baseUrl: `https://b2c-sql-web.sigma.sbrf.ru:85${url}`, // для пред прода / dev
        baseUrl: `http://10.28.128.82:83${url}`, // для ift
        // baseUrl: `http://10.28.128.82${url}`, // для release
        // baseUrl: `https://b2c-sql-web.sigma.sbrf.ru:81${url}`, // для прода

        prepareHeaders: async (headers, { getState }) => {
            const token = (getState() as RootState).auth.access_token;
            const refresh_token = (getState() as RootState).auth.refresh_token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            if (refresh_token) {
                headers.set('refresh-token', refresh_token);
            }

            headers.set('Access-Control-Allow-Origin', '*');
            headers.set('Access-Control-Allow-Headers', '*');

            return headers;
        },
    });

    const baseQueryWithReauth: BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    > = async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 403) {
            await api.dispatch(authApi.endpoints.refresh.initiate());
            result = await baseQuery(args, api, extraOptions);
        }
        return result;
    };

    return baseQueryWithReauth;
};
