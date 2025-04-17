import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import React from 'react';

type Props = CollapseProps;

export const UICollapse: React.FC<Props> = ({ ...props }) => {
  return <Collapse {...props} />;
};

export type { Props as UICollapseProps };
