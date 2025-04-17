import React from 'react';

import { UIModal } from '@components/_shared/Modal';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import { RenderCTLStream } from '../RenderCTLStream';
import styles from './styles.module.scss';

type Props = {
    ctl_id?: React.Key;
    isOpen: boolean;
    onClose: () => void;
};

export const ModalStreams: React.FC<Props> = ({ ctl_id, isOpen, onClose }) => {
    const cx = useStyles(styles);

    return (
        <UIModal
            open={isOpen}
            onClose={onClose}
            onCancel={onClose}
            footer={null}
            width={1200}
            className={cx('modal')}
            destroyOnClose
            title={
                <UITitle level={3} className={cx('title')}>
                    CTL потоки
                </UITitle>
            }>
            <RenderCTLStream ctl_id={ctl_id} />
        </UIModal>
    );
};
