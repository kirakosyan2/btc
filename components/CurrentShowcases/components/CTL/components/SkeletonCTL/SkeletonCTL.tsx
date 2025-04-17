import { UIFlex } from '@components/_shared/Flex';
import { Skeleton } from 'antd';
import React from 'react';

export const SkeletonCTL: React.FC = () => {
    return (
        <UIFlex
            gap={5}
            vertical
        >
            <Skeleton.Node
                active
                style={{ width: '100%', height: 46 }}
            />
            <Skeleton.Node
                active
                style={{ width: '100%', height: 46 }}
            />
            <Skeleton.Node
                active
                style={{ width: '100%', height: 46 }}
            />
        </UIFlex>
    );
};
