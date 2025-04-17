import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../utils';

export const testApi = createApi({
    reducerPath: 'testRTK',
    keepUnusedDataFor: 2,
    refetchOnMountOrArgChange: 2,
    baseQuery: getBaseQuery('/api/v1'),
    tagTypes: ['results', 'statistic'],
    endpoints: (builder) => ({
        tests: builder.query<TestList[], void>({
            query: () => ({
                url: 'quiz/',
                method: 'GET',
            }),
        }),

        test: builder.query<TestList, string>({
            query: (id) => ({
                url: `quiz/${id}/`,
                method: 'GET',
            }),
        }),

        testSubmit: builder.mutation<void, AnswersUserPayload>({
            query: ({ id, answers }) => ({
                url: `quiz/${id}/submit/`,
                method: 'POST',
                body: [...answers],
            }),
            invalidatesTags: ['results', 'statistic'],
        }),

        statistic: builder.query<Statistic, void>({
            query: () => ({
                url: `quiz_results/statistic/`,
                method: 'GET',
            }),
            providesTags: ['statistic'],
        }),

        results: builder.query<Results[], void>({
            query: () => ({
                url: `quiz_results/`,
                method: 'GET',
            }),
            providesTags: ['results'],
        }),

        currentResults: builder.query<TResultTest, number>({
            query: (id) => ({
                url: `quiz_results/${id}/`,
                method: 'GET',
            }),
        }),
    }),
});

export type TestList = {
    id: number;
    title: string;
    description: string;
    questions: Question[];
};

export type Question = {
    id: number;
    text: string;
    answers: Answer[];
};

export type Answer = {
    id: number;
    text: string;
};

export type AnswersUser = {
    question_id: number;
    selected_answers: number[];
};

export type AnswersUserPayload = {
    id: number;
    answers: AnswersUser[];
};

export type TResultTest = {
    correct_answers: number;
    created_at: string;
    id: number;
    quiz: number;
    score: number;
    total_questions: number;
    correct_questions: string[];
    incorrect_questions: string[];
};

export type Statistic = {
    attemts_cnt: number;
    success_res_cnt: number;
    unsuccessfull_cnt: number;
    best_score: number;
};

export type Results = {
    id: number;
    quiz_name: string;
    created_at: string;
};

export const {
    useTestsQuery,
    useTestQuery,
    useTestSubmitMutation,
    useStatisticQuery,
    useResultsQuery,
    useCurrentResultsQuery,
} = testApi;
