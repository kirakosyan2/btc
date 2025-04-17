import { UIFlex } from '@components/_shared/Flex';
import { Skeleton } from 'antd';
import React from 'react';

export const SkeletonBranchShowcase: React.FC = () => {
    return (
        <UIFlex gap={40}>
            <Skeleton.Node
                active
                style={{ width: 338, height: 188 }}
            />
            <Skeleton.Node
                active
                style={{ width: 338, height: 188 }}
            />
        </UIFlex>
    );
};
