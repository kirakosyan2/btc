import { Statistic, StatisticProps } from 'antd'
import React from 'react'

type Props = StatisticProps

export const UIStatistic: React.FC<Props> = ({ ...props }) => {
    return <Statistic {...props} />
}

export type { Props as UIStatisticProps }