import React from 'react';
import { ShowcaseView } from './Showcase.view';
import { useParams } from 'react-router-dom';
import { useShowcaseCurrentQuery, useShowcasesListQuery } from '@src/redux/initiative/initiative';

export const Showcase: React.FC = () => {
    const { id } = useParams();

    // Query
    const { data: showcasesList, isLoading: isLoadingShowcaseList } = useShowcasesListQuery(
        id as string,
        {
            skip: !id,
        },
    );

    const { data: showcase, isLoading: isLoadingShowcase } = useShowcaseCurrentQuery(id as string, {
        skip: !id,
    });

    return (
        <ShowcaseView
            showcasesList={showcasesList ?? []}
            showcase={showcase}
            isLoadingShowcase={isLoadingShowcase}
            isLoadingShowcaseList={isLoadingShowcaseList}
        />
    );
};
