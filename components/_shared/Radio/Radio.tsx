import { Radio, RadioProps } from 'antd';
import React from 'react';

type Props = RadioProps;

export const UIRadio: React.FC<Props> = ({ ...props }) => {
    return <Radio {...props} />;
};

export type { Props as UIRadioProps };
