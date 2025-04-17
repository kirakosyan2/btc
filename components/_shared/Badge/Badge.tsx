import { Badge, BadgeProps } from 'antd';
import React from 'react';

type Props = BadgeProps;

export const UIBadge: React.FC<Props> = ({ ...props }) => {
    return <Badge {...props} />;
};

export type { Props as UIBadgeProps };
