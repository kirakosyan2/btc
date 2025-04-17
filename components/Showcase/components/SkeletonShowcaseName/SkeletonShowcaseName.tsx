import { UIFlex } from '@components/_shared/Flex';
import { Skeleton } from 'antd';
import React from 'react';

export const SkeletonShowcaseName: React.FC = () => {
    return (
        <UIFlex
            justify="center"
            style={{ marginBottom: 20 }}
        >
            <Skeleton.Input
                active
                style={{ width: 400 }}
            />
        </UIFlex>
    );
};
