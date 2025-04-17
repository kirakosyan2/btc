import React from 'react';

import { UIFlex } from '@components/_shared/Flex';

import { TableCTL } from '../TableCTL';
import { TableDevOps } from '../TableDevOps';

export const ModalDatamartView: React.FC = () => {
    return (
        <UIFlex vertical gap={40}>
            <TableDevOps />
            <TableCTL />
        </UIFlex>
    );
};
