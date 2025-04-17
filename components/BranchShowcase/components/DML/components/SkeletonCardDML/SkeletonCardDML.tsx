import { UIFlex } from '@components/_shared/Flex';
import { Skeleton } from 'antd';
import React from 'react';

export const SkeletonCardDML: React.FC = () => {
    return (
        <UIFlex
            gap={40}
            style={{
                width: '100%',
            }}
        >
            <Skeleton.Node
                active
                style={{ width: 540, height: 196 }}
            />
            <Skeleton.Node
                active
                style={{ width: 540, height: 196 }}
            />
        </UIFlex>
    );
};
