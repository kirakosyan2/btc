import { Divider } from 'antd';
import React, { ReactNode } from 'react';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';

import { useQueryParamAppender } from '@hooks/useQueryParamAppender';
import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
};

export const LayoutMain: React.FC<Props> = ({ children }) => {
    const cx = useStyles(styles);
    useQueryParamAppender();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Header />
                <div className={cx('layoutMainContainer')}>{children}</div>
            </div>
            <Divider
                style={{
                    marginBottom: 0,
                }}
            />
            <Footer />
        </div>
    );
};
