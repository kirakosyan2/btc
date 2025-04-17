import React from 'react';
import { ModalAutorizeSuccessView } from './ModalAutorizeSuccess.view';
import { UIModal } from '@components/_shared/Modal';

type Props = {
    onClose: () => void;
    open: boolean;
};

export const ModalAutorizeSuccess: React.FC<Props> = ({ onClose, open }) => {
    return (
        <UIModal
            width={1110}
            open={open}
            onClose={onClose}
            onCancel={onClose}
            footer={null}
        >
            <ModalAutorizeSuccessView />
        </UIModal>
    );
};
