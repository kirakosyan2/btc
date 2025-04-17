import { FormInstance } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { UIModal } from '@components/_shared/Modal';
import { UITitle } from '@components/_shared/Title';
import { UITypography } from '@components/_shared/Typography';

import { useStyles } from '@hooks/useStyles';

import { StorageService } from '@services/StorageService';

import { useAppSelector } from '@src/redux/store';

import styles from './styles.module.scss';

type Props = {
    option: string;
    open: boolean;
    form: FormInstance<any>;
    onClose: () => void;
};

const storageService = StorageService.getInstance();
const RELOAD_DELAY_MS = 300;

export const PopupSuccesVersion: React.FC<Props> = ({
    option,
    open,
    form,
    onClose,
}) => {
    const cx = useStyles(styles);
    const location = useLocation();
    const navigate = useNavigate();

    const { authorized } = useAppSelector((store) => store.auth);

    const onSubmit = async () => {
        await storageService.setItem('version', option);

        if (authorized) {
            navigate('/initiative', { replace: true });
        } else {
            navigate(location.pathname, { replace: true });
        }

        setTimeout(() => {
            navigate(0);
        }, RELOAD_DELAY_MS);
    };

    const handleClose = () => {
        const version = storageService.getItem('version');
        form.setFieldValue('version', version);
        onClose();
    };

    return (
        <UIModal
            open={open}
            onClose={handleClose}
            onCancel={handleClose}
            footer={null}>
            <UIFlex vertical>
                <UITitle level={3} className={cx('title')}>
                    Смена версиии
                </UITitle>
                <UITypography className={cx('text')}>
                    При смене версии на более старую некоторый функционал может
                    оказаться недоступен
                </UITypography>

                <UIFlex justify="center" gap={20} className={cx('footer')}>
                    <UIButton className={cx('btn')} onClick={handleClose}>
                        Отмена
                    </UIButton>
                    <UIButton
                        className={cx('btn')}
                        onClick={onSubmit}
                        type="primary">
                        Ок
                    </UIButton>
                </UIFlex>
            </UIFlex>
        </UIModal>
    );
};
