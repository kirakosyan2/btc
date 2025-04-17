import React from 'react';
import { Virtuoso } from 'react-virtuoso';

import { NotificationCard } from './components/NotificationCard';
import styles from './styles.module.scss';

import { useStyles } from '@hooks/useStyles';
import { TNotifications } from '@src/redux/notifications/notifications';

type Props = {
    notifications: TNotifications[];
    isLoadingNotifications: boolean;
    readNotification: (id: number) => void;
};

export const NotificationDrawerView: React.FC<Props> = ({
    notifications,
    readNotification,
}) => {
    const cx = useStyles(styles);

    // TODO: доработать с лоадером и анимацией загрузки
    return (
        <Virtuoso
            data={notifications}
            className={cx('virtuoso')}
            totalCount={notifications.length}
            itemContent={(index, notification) => (
                <NotificationCard
                    key={index}
                    data={notification}
                    onClick={() => readNotification(notification.id)}
                />
            )}
        />
    );
};
