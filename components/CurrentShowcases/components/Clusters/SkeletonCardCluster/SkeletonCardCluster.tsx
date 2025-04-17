import { UIFlex } from '@components/_shared/Flex';
import { Skeleton } from 'antd';
import React from 'react';

export const SkeletonCardCluster: React.FC = () => {
    return (
        <UIFlex gap={40}>
            <Skeleton.Node
                active
                style={{ width: 248, height: 188 }}
            />
            <Skeleton.Node
                active
                style={{ width: 248, height: 188 }}
            />
            <Skeleton.Node
                active
                style={{ width: 248, height: 188 }}
            />
            <Skeleton.Node
                active
                style={{ width: 248, height: 188 }}
            />
        </UIFlex>
    );
};
