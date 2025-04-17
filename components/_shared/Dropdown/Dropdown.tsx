import { Dropdown, DropdownProps } from 'antd';
import React from 'react';

type Props = DropdownProps;

export const UIDropdown: React.FC<Props> = ({ children, ...props }) => {
  return <Dropdown {...props}>{children}</Dropdown>;
};

export type { Props as UIDropdownProps };
