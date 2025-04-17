import React from 'react';

import { UIModal } from '@components/_shared/Modal';

import { GigaCodeResponce } from '@src/redux/gigaCode/gigaCode';

import { GigaCodeResult } from '../GigaCodeResult';

type Props = {
    expansion: string;
    open: boolean;
    gigaCodeData?: GigaCodeResponce;
    file_id: string;
    onClose: () => void;
    updateFile: any;
    getFile: any;
};

export const ModalGigaCode: React.FC<Props> = ({
    expansion,
    open,
    gigaCodeData,
    file_id,
    onClose,
    updateFile,
    getFile,
}) => {
    return (
        <UIModal
            open={open}
            onCancel={onClose}
            onClose={onClose}
            footer={null}
            width={1000}
            destroyOnClose>
            <GigaCodeResult
                expansion={expansion}
                gigaCodeData={gigaCodeData}
                file_id={file_id}
                onClose={onClose}
                updateFile={updateFile}
                getFile={getFile}
            />
        </UIModal>
    );
};
