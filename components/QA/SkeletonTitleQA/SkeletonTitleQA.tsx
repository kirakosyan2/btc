import { Skeleton } from 'antd';
import React from 'react';

import { UIFlex } from '@components/_shared/Flex';

export const SkeletonTitleQA: React.FC = () => {
  return (
    <UIFlex gap={40} justify="center">
      <Skeleton.Node active style={{ width: 350, height: 40 }} />
    </UIFlex>
  );
};
