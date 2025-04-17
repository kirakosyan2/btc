import React from 'react';

import {
    useDislikeMutation,
    useFaqQuery,
    useLikeMutation,
} from '@src/redux/FAQ/FAQ';

import { FAQView } from './FAQ.view';

export const FAQ: React.FC = () => {
    // Query
    const { data: FAQList, isLoading: isLoadingFAQList } = useFaqQuery();

    // Mutations
    const [like] = useLikeMutation();
    const [dislike] = useDislikeMutation();

    const likeFAQ = async (id: number) => {
        await like(id);
    };

    const dislikeFAQ = async (id: number) => {
        await dislike(id);
    };

    return (
        <FAQView
            FAQList={FAQList ?? []}
            isLoadingFAQList={isLoadingFAQList}
            likeFAQ={likeFAQ}
            dislikeFAQ={dislikeFAQ}
        />
    );
};
