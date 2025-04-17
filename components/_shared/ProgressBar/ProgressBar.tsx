import { Progress, ProgressProps } from 'antd';
import React from 'react';

type Props = ProgressProps;

export const UIProgressBar: React.FC<Props> = ({ ...props }) => {
    return <Progress {...props} />;
};

export type { Props as UIProgressBarProps };
