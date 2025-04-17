import { UIFlex } from '@components/_shared/Flex';
import React from 'react';
import { CreateAcesBlock } from './components/CreateAcesBlock';
import { EditAcesBlock } from './components/EditAcesBlock';

export const CreateAces: React.FC = () => {
    return (
        <UIFlex
            vertical
            gap={40}
        >
            <CreateAcesBlock />
            <EditAcesBlock />
        </UIFlex>
    );
};
