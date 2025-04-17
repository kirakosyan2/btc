import React from 'react';
import { CreateInitiativeBlock } from './components/CreateInitiativeBlock';
import { UIFlex } from '@components/_shared/Flex';
import { EditInitiativeBlock } from './components/EditInitiativeBlock';

export const CreateInitiative: React.FC = () => {
    return (
        <UIFlex
            vertical
            gap={40}
        >
            <CreateInitiativeBlock />
            <EditInitiativeBlock />
        </UIFlex>
    );
};
