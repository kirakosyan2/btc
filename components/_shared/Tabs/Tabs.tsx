import React from 'react';
import { Tabs, TabsProps } from 'antd';

type Props = TabsProps;

export const UITabs: React.FC<Props> = ({ children, ...props }) => {
    return <Tabs {...props}>{children}</Tabs>;
};

export type { Props as UITabsProps };
