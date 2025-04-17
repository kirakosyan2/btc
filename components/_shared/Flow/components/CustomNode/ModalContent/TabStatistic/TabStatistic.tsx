import React from 'react';
import { UIFlex } from '@components/_shared/Flex';
import { StaticContent } from './StaticContent';

type Props = {
    threadId: string;
    onClose: () => void;
};

export const TabStatistic: React.FC<Props> = ({ threadId, onClose }) => {
    return (
        <UIFlex
            vertical
            gap={40}
        >
            <StaticContent
                threadId={threadId}
                onClose={onClose}
            />
        </UIFlex>
    );
};
