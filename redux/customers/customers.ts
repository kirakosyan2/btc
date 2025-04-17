import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const customersApi = createApi({
    reducerPath: 'customersRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['customers'],
    endpoints: (builder) => ({
        customers: builder.query<CustomersList[], void>({
            query: () => ({
                url: 'customers/',
                method: 'GET',
            }),
            providesTags: ['customers'],
        }),

        createCustomer: builder.mutation<void, CustomersPayload>({
            query: (body) => ({
                url: 'customers/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['customers'],
        }),

        updateCustomer: builder.mutation<void, CustomerUpdatePayload>({
            query: (payload) => {
                const { id, ...rest } = payload;

                return {
                    url: `customers/${id}/`,
                    method: 'PATCH',
                    body: { ...rest },
                };
            },
            invalidatesTags: ['customers'],
        }),

        deleteCustomer: builder.mutation<void, number>({
            query: (id) => ({
                url: `customers/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['customers'],
        }),
    }),
});

export type CustomersList = {
    id: number;
    name: string;
    code_name: string;
    confluence_link: string;
};

export type CustomersPayload = {
    name: string;
    code_name: string;
    confluence_link: string;
    team?: number;
};

export type CustomerUpdatePayload = {
    id: number;
    [field: string]: string | number;
};

export const {
    useCustomersQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customersApi;
