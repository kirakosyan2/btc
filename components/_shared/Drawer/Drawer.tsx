import { Drawer, DrawerProps } from 'antd';
import React from 'react';

type Props = DrawerProps;

export const UIDrawer: React.FC<Props> = ({ ...props }) => {
    return <Drawer {...props} />;
};

export type { Props as UIDrawerProps };
