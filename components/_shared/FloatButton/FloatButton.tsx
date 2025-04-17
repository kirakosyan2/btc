import React from 'react';
import { FloatButton, FloatButtonProps } from 'antd';

type Props = FloatButtonProps;

export const UIFloatButton: React.FC<Props> = ({ children, ...props }) => {
    return <FloatButton {...props}>{children}</FloatButton>;
};

export type { Props as UIFloatButtonProps };
