import { Card, CardProps } from 'antd';
import React from 'react';

type Props = CardProps;

export const UICard: React.FC<Props> = ({ children, ...props }) => {
  return <Card {...props}>{children}</Card>;
};

export type { Props as UICardProps };
