import { UIModal } from '@components/_shared/Modal';
import React from 'react';
import { ClusterItem } from '../ClusterItem';
import { UITitle } from '@components/_shared/Title';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';

type Props = {
    open: boolean;
    currClusterId?: number;
    onClose: () => void;
};
export const ModalDetail: React.FC<Props> = ({ open, currClusterId, onClose }) => {
    const cx = useStyles(styles);

    return (
        <UIModal
            open={open}
            onClose={onClose}
            onCancel={onClose}
            destroyOnClose
            width={1000}
            footer={null}
            title={
                <UITitle
                    className={cx('title')}
                    level={3}
                >
                    Настройка кластера
                </UITitle>
            }
        >
            <ClusterItem
                currClusterId={currClusterId}
                onClose={onClose}
            />
        </UIModal>
    );
};
