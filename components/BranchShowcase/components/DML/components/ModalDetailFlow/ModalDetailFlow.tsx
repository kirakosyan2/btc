import { UIModal } from '@components/_shared/Modal';
import { UITitle } from '@components/_shared/Title';
import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UIFlow } from '@components/_shared/Flow';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@src/redux/store';

type Props = {
    open: boolean;
    idDML?: number;
    onClose: () => void;
};

export const ModalDetailFlow: React.FC<Props> = ({ open, idDML, onClose }) => {
    const cx = useStyles(styles);
    const { id: branchId } = useParams();
    const { role } = useAppSelector((store) => store.auth);

    return (
        <UIModal
            open={open}
            onCancel={onClose}
            onClose={onClose}
            footer={null}
            destroyOnClose
            width={'100%'}
            height={'100vh'}
            style={{
                top: 10,
                height: '100vh',
            }}
            title={
                <UITitle
                    level={3}
                    className={cx('title')}
                >
                    Настройки графа
                </UITitle>
            }
            className={cx('modal')}
        >
            <UIFlow
                idDML={idDML}
                branchId={branchId}
                role={role}
            />
        </UIModal>
    );
};
