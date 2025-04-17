import { message, notification } from 'antd';
import { ButtonType } from 'antd/es/button';
import { MessageType } from 'antd/es/message/interface';
import { ReactNode } from 'react';

import { UIButton } from '@components/_shared/Button';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type PropsNotification = {
    type?: NotificationType;
    content: ReactNode;
    duration?: number;
};

type PropsNotificationWithBtn = PropsNotification & {
    title?: string;
    btnText?: string;
    btnType?: ButtonType;
    className?: string;
};

export const notificationEasy = ({
    type = 'success',
    content,
    duration = 3,
}: PropsNotification): MessageType => {
    return message[type](
        {
            content,
        },
        duration
    );
};

export const notificationWithBtn = ({
    type = 'success',
    title,
    btnText,
    content,
    btnType = 'primary',
    className,
}: PropsNotificationWithBtn): void => {
    const btn = (
        <UIButton type={btnType} onClick={() => notification.destroy()}>
            {btnText}
        </UIButton>
    );
    notification[type]({
        message: title,
        description: content,
        btn: btnText ? btn : undefined,
        duration: 9999999,
        onClose: close,
        closeIcon: !!btn,
        className,
    });
};
