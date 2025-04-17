import React from 'react';
import { Spin, SpinProps } from 'antd';

type Props = SpinProps;

export const UISpinner: React.FC<Props> = ({ ...props }) => {
    return <Spin {...props} />;
};

export type { Props as SpinnerProps };
