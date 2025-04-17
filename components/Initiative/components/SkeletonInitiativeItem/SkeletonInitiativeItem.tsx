import { UIFlex } from '@components/_shared/Flex';
import { Skeleton } from 'antd';
import React from 'react';

export const SkeletonInitiativeItem: React.FC = () => {
    return (
        <UIFlex gap={40}>
            <Skeleton.Node
                active
                style={{ width: 364, height: 144.84 }}
            />
            <Skeleton.Node
                active
                style={{ width: 364, height: 144.84 }}
            />
            <Skeleton.Node
                active
                style={{ width: 364, height: 144.84 }}
            />
        </UIFlex>
    );
};
