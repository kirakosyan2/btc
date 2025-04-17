import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';
import { TableEditCustomers } from '../TableEditCustomers.tsx';

export const EditCustomers: React.FC = () => {
    const cx = useStyles(styles);

    return (
        <UICard className={cx('container')}>
            <UITitle
                className={cx('title')}
                level={3}
            >
                Редактировать заказчиков
            </UITitle>

            <TableEditCustomers />
        </UICard>
    );
};
