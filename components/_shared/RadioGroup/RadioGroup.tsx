import { Radio, RadioGroupProps } from 'antd';
import React from 'react';

type Props = RadioGroupProps;

export const UIRadioGroup: React.FC<Props> = ({ ...props }) => {
    return <Radio.Group {...props} />;
};

export type { Props as UIRadioGroupProps };
