import { debounce } from 'lodash';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { NotificationDrawerView } from './NotificationDrawer.view';
import styles from './styles.module.scss';

import { UIButton } from '@components/_shared/Button';
import { UIDrawer } from '@components/_shared/Drawer';
import { UIFlex } from '@components/_shared/Flex';
import { Icon } from '@components/_shared/Icon';
import { UIInput } from '@components/_shared/Input';
import { UITitle } from '@components/_shared/Title';
import { useStyles } from '@hooks/useStyles';
import {
    TNotificationsPayload,
    useNotificationsQuery,
    useReadAllNotificationMutation,
    useReadNotificationMutation,
} from '@src/redux/notifications/notifications';
import { useAppSelector } from '@src/redux/store';

type Props = {
    isOpened: boolean;
    onClose: () => void;
};

export const NotificationDrawer: React.FC<Props> = ({ isOpened, onClose }) => {
    const cx = useStyles(styles);
    const { authorized } = useAppSelector((store) => store.auth);

    const [params, setParams] = useState({
        search: '',
    });

    // Query
    const {
        data: notificationData,
        isLoading: isLoadingNotifications,
        refetch: refetchNotifications,
    } = useNotificationsQuery(params, {
        skip: !authorized,
    });

    // Mutations
    const [readNotification] = useReadNotificationMutation();
    const [readAllNotifications] = useReadAllNotificationMutation();

    useEffect(() => {
        if (isOpened) {
            refetchNotifications();
        }
    }, [isOpened]);

    const handleReadNotification = async (id: number) => {
        const payload: TNotificationsPayload = {
            id,
            is_read: true,
        };

        await readNotification(payload);
    };

    const handleReadAllNotifications = async () => {
        await readAllNotifications();
    };

    const onSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setParams({
            search: value,
        });
    }, 500);

    return (
        <>
            <UIDrawer
                title={
                    <UIFlex vertical gap={10}>
                        <UITitle level={3}>Уведомления</UITitle>
                        <UIInput
                            placeholder="Поиск"
                            prefix={
                                <Icon
                                    size="xs"
                                    type="search-outlined"
                                    className={cx('icon')}
                                />
                            }
                            onChange={onSearch}
                        />
                    </UIFlex>
                }
                footer={
                    <UIFlex justify="end">
                        <UIButton
                            type="link"
                            onClick={handleReadAllNotifications}>
                            Отметить все прочитанным
                        </UIButton>
                    </UIFlex>
                }
                width={520}
                open={isOpened}
                onClose={onClose}
                destroyOnClose
                closeIcon={false}
                classNames={{
                    body: cx('drawer'),
                }}>
                <NotificationDrawerView
                    notifications={notificationData ?? []}
                    isLoadingNotifications={isLoadingNotifications}
                    readNotification={handleReadNotification}
                />
            </UIDrawer>
        </>
    );
};
