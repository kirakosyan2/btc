import React from 'react';

import { UIModal } from '@components/_shared/Modal';

import { useStyles } from '@hooks/useStyles';

import { SQLDetail } from '../SQLDetail';
import styles from './styles.module.scss';

type Props = {
    opened: boolean;
    idDDL?: number;
    onClose: () => void;
};

export const ModalDetailDDL: React.FC<Props> = ({ opened, idDDL, onClose }) => {
    const cx = useStyles(styles);
    const isReference = location.pathname.includes('reference');

    return (
        <UIModal
            open={opened}
            onClose={onClose}
            onCancel={onClose}
            width={1400}
            footer={null}
            destroyOnClose
            className={cx('modal')}>
            <SQLDetail idDDL={idDDL} isReference={isReference} />
        </UIModal>
    );
};
