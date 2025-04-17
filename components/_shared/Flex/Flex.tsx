import React from 'react';
import { Flex, FlexProps } from 'antd';

type Props = FlexProps & {
    ref?: React.RefObject<any>;
};

export const UIFlex: React.FC<Props> = ({ children, ...props }) => {
    return <Flex {...props}>{children}</Flex>;
};

export type { Props as UIFlexProps };
