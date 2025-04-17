import React from 'react'
import { TestResultationView } from './TestResultation.view'
import { useResultsQuery, useStatisticQuery } from '@src/redux/test/test'

export const TestResultation: React.FC = () => {
    // Query
    const { data: statistic } = useStatisticQuery();
    const { data: resultsList } = useResultsQuery()

    return (
        <TestResultationView statistic={statistic} resultsList={resultsList ?? []} />
    )
}


