import { UIFlex } from '@components/_shared/Flex';
import { Skeleton } from 'antd';
import React from 'react';

export const SkeletonDDLCard: React.FC = () => {
    return (
        <UIFlex
            gap={40}
            vertical
            style={{
                width: '100%',
            }}
        >
            <Skeleton.Node
                active
                style={{ width: '100%', height: 188 }}
            />
            <Skeleton.Node
                active
                style={{ width: '100%', height: 188 }}
            />
        </UIFlex>
    );
};
