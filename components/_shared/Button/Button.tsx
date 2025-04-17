import { Button, ButtonProps } from 'antd';
import React from 'react';

type Props = ButtonProps;

export const UIButton: React.FC<Props> = ({ children, ...props }) => {
    return <Button {...props}>{children}</Button>;
};

export type { Props as UIButtonProps };
