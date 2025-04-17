import React, { useEffect } from 'react';

import { UIFlex } from '@components/_shared/Flex';

import { useStyles } from '@hooks/useStyles';

import { BitBucket } from './components/BItBucket';
import { DDL } from './components/DDL';
import { DML } from './components/DML';
import { Repositories } from './components/Repositories';
import { Task } from './components/Task/Task';
import { UserFuncBlock } from './components/UserFunc/ModalUserFunc';
import { RegisterUserFunc } from './components/UserFunc/RegisterUserFunc';
import styles from './styles.module.scss';

export const BranchShowcases: React.FC = () => {
    const cx = useStyles(styles);

    const isReference = location.pathname.includes('reference');

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <UIFlex className={cx('container')} vertical gap={40}>
            <Task isReference={isReference} />
            <BitBucket isReference={isReference} />
            <DDL isReference={isReference} />
            <DML />
            <UserFuncBlock />
            <RegisterUserFunc />
            <Repositories isReference={isReference} />
        </UIFlex>
    );
};
