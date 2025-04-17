import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UIFlex } from '@components/_shared/Flex';
import { AddCustomers } from './components/AddCustomers';
import { EditCustomers } from './components/EditCustomers';

export const Customers: React.FC = () => {
    const cx = useStyles(styles);

    return (
        <UIFlex
            className={cx('container')}
            vertical
            gap={40}
        >
            <AddCustomers />
            <EditCustomers />
        </UIFlex>
    );
};
