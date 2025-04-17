import { Input, InputProps } from 'antd';
import React from 'react';

type Props = InputProps;

export const UIInput: React.FC<Props> = ({ ...props }) => {
    return (
        <Input
            {...props}
            data-testid="input-test"
        />
    );
};

export type { Props as UIInputProps };
