import React from 'react';
import { Popconfirm, PopconfirmProps } from 'antd';

type Props = PopconfirmProps;

export const UIPopconfirm: React.FC<Props> = ({ ...props }) => {
    return <Popconfirm {...props} />;
};

export type { Props as UIPopconfirmProps };
