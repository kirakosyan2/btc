import React from 'react';
import { Modal, ModalProps } from 'antd';

type Props = ModalProps;

export const UIModal: React.FC<Props> = ({ children, ...props }) => {
    return <Modal {...props}>{children}</Modal>;
};

export type { Props as UIModalProps };
