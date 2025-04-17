import { Switch, SwitchProps } from 'antd';
import React from 'react';

type Props = SwitchProps;

export const UISwitch: React.FC<Props> = ({ ...props }) => {
  return <Switch {...props} />;
};

export type { Props as UISwitchProps };
