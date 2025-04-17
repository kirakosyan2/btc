import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';
import { getBaseQuery } from '../utils';

export const authApi = createApi({
    reducerPath: 'authRTK',
    baseQuery: getBaseQuery('/api/v1/auth'),
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, IAuthPayload>({
            queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
                const token: string | null = (_queryApi.getState() as RootState).auth.access_token;
                const result = await fetchWithBQ({
                    url: 'jwt/create/',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: _arg,
                });
                if (result.error) {
                    return { error: result.error as FetchBaseQueryError };
                }
                const resultData = result.data as IAuthResponse;
                return {
                    data: {
                        access: resultData.access,
                        refresh: resultData.refresh,
                        user_role: resultData.user_role,
                    } as IAuthResponse,
                };
            },
        }),

        refresh: builder.mutation<IAuthResponse, void>({
            queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
                const refreshToken: string | null = (_queryApi.getState() as RootState).auth
                    .refresh_token;
                const result = await fetchWithBQ({
                    url: 'jwt/create/refresh',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        token: `Bearer ${refreshToken}`,
                    },
                    body: _arg,
                });
                if (result.error) {
                    return { error: result.error as FetchBaseQueryError };
                }
                const resultData = result.data as IAuthResponse;
                return {
                    data: {
                        access: resultData.access,
                        refresh: resultData.refresh,
                        user_role: resultData.user_role,
                    } as IAuthResponse,
                };
            },
        }),

        registration: builder.mutation<void, IRegistrationPayload>({
            query: (body) => ({
                url: 'users/',
                method: 'POST',
                body,
            }),
        }),

        resetPassword: builder.mutation<void, IPasswordResetPayload>({
            query: (body) => ({
                url: 'users/set_password/',
                method: 'POST',
                body,
            }),
        }),
        resetPasswordConfirm: builder.mutation<void, IPasswordResetConfirmPayload>({
            query: (body) => ({
                url: 'users/reset_password_confirm/',
                method: 'POST',
                body,
            }),
        }),
        resetPasswordEmail: builder.mutation<void, IPasswordResetEmailPayload>({
            query: (body) => ({
                url: 'users/reset_password/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export enum eUserRoles {
    ADMIN = 'admin',
    BUISNESS = 'business',
    ETL_DEVELOPER = 'etl_developer',
}

export type IAuthResponse = {
    access: string;
    refresh: string;
    user_role: eUserRoles;
    username: string;
};

export type IAuthPayload = {
    username: string;
    password: string;
};

export type IVerificationPayload = {
    email: string;
    token?: string;
    password?: string;
};

export type IRegistrationPayload = {
    username: string;
    team: number;
    first_name: string;
    last_name: string;
    email_omega: string;
    email_sigma: string;
    login_omega: string;
    login_sigma: string;
    password: string;
};

export type IEmailPayload = {
    email: string;
};

export type IPasswordRecoveryResponse = {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    phone: string;
    is_verified: boolean;
};

export type IPasswordResetResponse = {
    username: string;
    first_name: string;
    last_name: string;
    id: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    phone: string;
    is_online: boolean;
    hashed_password: string;
};

export type IPasswordResetPayload = {
    current_password: string;
    new_password: string;
};

export type IPasswordRecoveryEmailPayload = {
    email: string;
    password: string;
    token: string;
};

export type IPasswordResetConfirmPayload = {
    uid: string;
    token: string;
    new_password: string;
};

export type IPasswordResetEmailPayload = {
    email: string;
};

export const {
    useLoginMutation,
    useRegistrationMutation,
    useResetPasswordMutation,
    useResetPasswordConfirmMutation,
    useResetPasswordEmailMutation,
} = authApi;
