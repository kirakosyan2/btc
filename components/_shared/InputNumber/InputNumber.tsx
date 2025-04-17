import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';

type Props = InputNumberProps;

export const UIInputNumber: React.FC<Props> = ({ ...props }) => {
    return (
        <InputNumber
            {...props}
            data-testid="inputNumber-test"
        />
    );
};

export type { Props as UIInputNumberProps };
