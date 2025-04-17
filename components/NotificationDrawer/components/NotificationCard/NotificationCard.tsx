import React from 'react';

import styles from './styles.module.scss';

import other from '@assets/images/bell.png';
import counseling from '@assets/images/counseling.png';
import refresh from '@assets/images/refresh.png';
import { UIFlex } from '@components/_shared/Flex';
import { UITitle } from '@components/_shared/Title';
import { UITypography } from '@components/_shared/Typography';
import { useStyles } from '@hooks/useStyles';
import { TNotifications } from '@src/redux/notifications/notifications';

type Props = {
    data: TNotifications;
    onClick: () => void;
};

export const NotificationCard: React.FC<Props> = ({ data, onClick }) => {
    const cx = useStyles(styles);

    const getIcon = () => {
        switch (data.type) {
            case 'other':
                return <img src={other} />;

            case 'news':
                return <img src={refresh} />;

            case 'consultation':
                return <img src={counseling} />;

            default:
                return <img src={other} />;
        }
    };

    return (
        <UIFlex
            align="center"
            gap={20}
            className={cx('container')}
            onClick={onClick}>
            <UIFlex
                align="center"
                gap={5}
                className={cx('notificationContainer')}>
                {!data.is_read && <div className={cx('point')} />}
                <div className={cx('image')}>{getIcon()}</div>
            </UIFlex>
            <div className={cx('content')}>
                <UITitle level={4} className={cx('title')}>
                    {data.title}
                </UITitle>
                <UITypography>{data.text}</UITypography>
            </div>
        </UIFlex>
    );
};
