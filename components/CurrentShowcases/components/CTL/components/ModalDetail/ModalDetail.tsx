import React from 'react';

import { UIModal } from '@components/_shared/Modal';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import { CTLContentDetail } from '../CTLContentDetail';
import styles from './styles.module.scss';

type Props = {
    isOpened: boolean;
    stream_id?: number;
    ctl_id?: React.Key;
    onClose: () => void;
};
export const ModalDetail: React.FC<Props> = ({
    isOpened,
    stream_id,
    ctl_id,
    onClose,
}) => {
    const cx = useStyles(styles);

    return (
        <UIModal
            open={isOpened}
            footer={null}
            onCancel={onClose}
            onClose={onClose}
            width={1300}
            destroyOnClose
            title={
                <UITitle level={2} className={cx('title')}>
                    Параметры потока
                </UITitle>
            }>
            <CTLContentDetail stream_id={stream_id} ctl_id={ctl_id} />
        </UIModal>
    );
};
