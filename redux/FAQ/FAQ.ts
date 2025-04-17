import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const FAQApi = createApi({
    reducerPath: 'FAQRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['faqs', 'faq'],
    endpoints: (builder) => ({
        faq: builder.query<FAQRequest[], void>({
            query: () => ({
                url: 'faq/',
                method: 'GET',
            }),
            providesTags: ['faqs'],
        }),

        createFaq: builder.mutation<void, FAQPayload>({
            query: (body) => ({
                url: 'faq/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['faqs'],
        }),

        currentFAQ: builder.query<FAQRequest, string>({
            query: (id) => ({
                url: `faq/${id}/`,
                method: 'GET',
            }),
            providesTags: ['faq'],
        }),

        answerAdmin: builder.mutation<void, FAQAnswerPayload>({
            query: ({ id, ...rest }) => ({
                url: `faq/${id}/`,
                method: 'PATCH',
                body: { ...rest },
            }),
            invalidatesTags: ['faq', 'faqs'],
        }),

        like: builder.mutation<void, number>({
            query: (id) => ({
                url: `faq/${id}/like/`,
                method: 'POST',
            }),
            invalidatesTags: ['faqs'],
        }),

        dislike: builder.mutation<void, number>({
            query: (id) => ({
                url: `faq/${id}/like/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['faqs'],
        }),
    }),
});

export type FAQRequest = {
    id: number;
    likes: number;
    is_liked: boolean;
    question_author: string;
    answer_author: string;
    answer_date: null;
    question_date: string;
    title: string;
    question: string;
    answer: null;
};

export type FAQPayload = {
    title: string;
    question: string;
};

export type FAQAnswerPayload = {
    id: string;
    answer: string;
};

export const {
    useFaqQuery,
    useCreateFaqMutation,
    useCurrentFAQQuery,
    useAnswerAdminMutation,
    useLikeMutation,
    useDislikeMutation,
} = FAQApi;
