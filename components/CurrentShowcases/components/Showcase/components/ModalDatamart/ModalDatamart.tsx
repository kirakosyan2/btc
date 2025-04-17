import React from 'react';

import { ModalDatamartView } from './ModalDatamart.view';

import { UIFlex } from '@components/_shared/Flex';
import { UIModal } from '@components/_shared/Modal';
import { UITitle } from '@components/_shared/Title';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const ModalDatamart: React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <UIModal
            open={isOpen}
            onClose={onClose}
            onCancel={onClose}
            destroyOnClose
            footer={null}
            width={1000}
            title={
                <UIFlex justify="center">
                    <UITitle level={2}>Переопределение конфига команды</UITitle>
                </UIFlex>
            }>
            <ModalDatamartView />
        </UIModal>
    );
};
