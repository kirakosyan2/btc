import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const notificationsApi = createApi({
    reducerPath: 'notificationsRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['notifications'],
    endpoints: (builder) => ({
        notifications: builder.query<TNotifications[], TNotificationsParams>({
            query: (params) => ({
                url: 'notifications/',
                method: 'GET',
                params,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['notifications'],
        }),

        readNotification: builder.mutation<void, TNotificationsPayload>({
            query: ({ id, ...rest }) => ({
                url: `notifications/${id}/`,
                method: 'PATCH',
                body: { ...rest },
            }),
            invalidatesTags: ['notifications'],
        }),

        readAllNotification: builder.mutation<void, void>({
            query: () => ({
                url: 'notifications/all_read/',
                method: 'POST',
            }),
            invalidatesTags: ['notifications'],
        }),

        countNotifications: builder.query<
            TUnreadNotificationsRequest,
            undefined
        >({
            query: () => ({
                url: `notifications/unread/`,
                method: 'GET',
                keepUnusedDataFor: 5,
            }),
        }),
    }),
});

export type TNotifications = {
    id: number;
    type: string;
    title: string;
    text: string;
    is_read: true;
    created: string;
};

export type TNotificationsParams = {
    search: string;
};

export type TNotificationsPayload = {
    id: number;
    is_read: boolean;
};

export type TUnreadNotificationsRequest = {
    unread_notifications: number;
};

export const {
    useNotificationsQuery,
    useReadNotificationMutation,
    useCountNotificationsQuery,
    useReadAllNotificationMutation,
} = notificationsApi;
