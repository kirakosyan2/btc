import { Tree, TreeProps } from 'antd';
import React from 'react';

type Props = TreeProps;

export const UITree: React.FC<Props> = ({ ...props }) => {
    return <Tree {...props} />;
};

export type { Props as UITreeProps };
