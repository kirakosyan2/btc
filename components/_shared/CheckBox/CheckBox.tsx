import React from 'react';
import { Checkbox, CheckboxProps } from 'antd';

type Props = CheckboxProps;

export const UICheckBox: React.FC<Props> = ({ children, ...props }) => {
  return <Checkbox {...props}>{children}</Checkbox>;
};

export type { Props as UICheckBoxProps };
