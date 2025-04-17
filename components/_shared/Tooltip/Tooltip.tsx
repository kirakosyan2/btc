import React from 'react';
import { Tooltip, TooltipProps } from 'antd';

type Props = TooltipProps;

export const UITooltip: React.FC<Props> = ({ children, ...props }) => (
  <Tooltip {...props}>{children}</Tooltip>
);

export type { Props as UITooltipProps };
