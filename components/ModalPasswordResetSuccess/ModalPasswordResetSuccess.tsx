import React from 'react';
import { UIModal } from '@components/_shared/Modal';
import { UITitle } from '@components/_shared/Title';
import { UITypography } from '@components/_shared/Typography';
import { UIButton } from '@components/_shared/Button';
import { useNavigate } from 'react-router-dom';
import { useStyles } from '@hooks/useStyles';
import styles from './styles.module.scss';

type Props = {
    onClose: () => void;
    open: boolean;
};

export const ModalPasswordResetSuccess: React.FC<Props> = ({ onClose, open }) => {
    const cx = useStyles(styles);
    const navigate = useNavigate();

    const toLoginPage = () => navigate('/user/login');

    return (
        <UIModal
            width={800}
            open={open}
            onClose={onClose}
            closeIcon={false}
            footer={
                <UIButton
                    className={cx('btn')}
                    type="primary"
                    size="large"
                    onClick={toLoginPage}
                >
                    Вернуться к авторизации
                </UIButton>
            }
        >
            <UITitle className={cx('title')} level={3}>Заявка на сброс пароля создана</UITitle>
            <UITypography className={cx('text')}>
                На вашу электронную почту направлено письмо с дальнейшими инструкциями
            </UITypography>
        </UIModal>
    );
};
