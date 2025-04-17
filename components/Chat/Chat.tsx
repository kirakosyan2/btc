import moment from 'moment';

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { UIDrawer } from '@components/_shared/Drawer';
import { UIFlex } from '@components/_shared/Flex';
import { Icon } from '@components/_shared/Icon';
import { UISpinner } from '@components/_shared/Spinner';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import { useMeQuery } from '@src/redux/personalCabinet/personalCabinet';
import { useAppSelector } from '@src/redux/store';

import { ChatView } from './Chat.view';
import styles from './styles.module.scss';

type Props = {
    isOpened: boolean;
    onClose: () => void;
};

export type MessageProps = {
    text: string;
    sender?: number;
    timestamp: string;
};

const URL_WS = import.meta.env.VITE_URL_WS;
const DEFAULT_WIDTH = '50%';
const FULL_WIDTH = '100%';
const MAX_SOCKET_CONNECTION_ATTEMPTS = 10;
const SOCKET_CONNECTION_INTERVAL = 200;

export const Chat: React.FC<Props> = memo(({ isOpened, onClose }) => {
    const cx = useStyles(styles);
    const { authorized, access_token } = useAppSelector((store) => store.auth);

    const socketRef = useRef<WebSocket | null>(null);
    const messageInputRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [width, setWidth] = useState<number | string>(DEFAULT_WIDTH);

    const isNotLoadingUploadMess = messages.length % 2 === 0;

    // Query
    const { data: me } = useMeQuery(undefined, {
        skip: !authorized,
    });

    useEffect(() => {
        if (me?.id && access_token) {
            const wsUrl = `${URL_WS}/ws/chat/user_${me?.id}/?token=${access_token}`;
            socketRef.current = new WebSocket(wsUrl);

            const handleMessage = (event: MessageEvent) => {
                try {
                    const receivedMessage = JSON.parse(
                        event.data
                    ) as MessageProps;
                    setMessages((prev) => [...prev, receivedMessage]);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            };

            socketRef.current.onopen = () => {
                socketRef.current?.addEventListener('message', handleMessage);
            };

            return () => {
                socketRef.current?.removeEventListener(
                    'message',
                    handleMessage
                );
                socketRef.current?.close();
                socketRef.current = null;
            };
        }
    }, [messages, me]);

    useEffect(() => {
        const element = document.querySelector('.ant-drawer-body');

        if (element !== null) {
            element.scrollTo({
                top: element.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    useEffect(() => {
        if (isNotLoadingUploadMess) {
            const listener = async (event: KeyboardEvent) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    await sendMessage();
                }
            };
            document.addEventListener('keydown', listener);
            return () => {
                document.removeEventListener('keydown', listener);
            };
        }
    }, [messageInput, isNotLoadingUploadMess]);

    const waitForOpenConnection = async (socket: WebSocket) => {
        for (
            let attempt = 0;
            attempt < MAX_SOCKET_CONNECTION_ATTEMPTS;
            attempt++
        ) {
            if (socket.readyState === WebSocket.OPEN) return;
            await new Promise((resolve) =>
                setTimeout(resolve, SOCKET_CONNECTION_INTERVAL)
            );
        }
        throw new Error('Maximum number of connection attempts exceeded');
    };

    const handleInput = () => {
        if (messageInputRef.current) {
            setMessageInput(messageInputRef.current.innerText);
        }
    };

    const handleSendMessage = async (socket: WebSocket | null) => {
        if (messageInputRef?.current && socket && messageInput.trim() !== '') {
            const payload: MessageProps = {
                text: messageInput.trim(),
                sender: me?.id,
                timestamp: moment().toISOString(),
            };

            await socket.send(JSON.stringify(payload));
            setMessageInput('');
            messageInputRef.current.innerHTML = '';
        }
    };

    const sendMessage = async () => {
        if (
            socketRef.current &&
            socketRef.current?.readyState !== socketRef.current?.OPEN
        ) {
            try {
                await waitForOpenConnection(socketRef.current);
                handleSendMessage(socketRef.current);
            } catch (err) {
                console.error(err);
            }
        } else {
            handleSendMessage(socketRef.current);
        }
    };

    const toggleWidth = useCallback(() => {
        setWidth((prev) =>
            prev === DEFAULT_WIDTH ? FULL_WIDTH : DEFAULT_WIDTH
        );
    }, []);

    const isEmptyInput = !messageInput.trim();

    return (
        <UIDrawer
            open={isOpened}
            onClose={onClose}
            destroyOnClose
            closeIcon={false}
            className={cx('chat')}
            width={width}
            title={
                <UIFlex align="baseline" gap={20}>
                    <Icon
                        type={
                            width === DEFAULT_WIDTH
                                ? 'arrows-alt-outlined'
                                : 'shrink-outlined'
                        }
                        size="sm"
                        className={cx('iconSize')}
                        onClick={toggleWidth}
                    />
                    <UITitle className={cx('title')} level={3}>
                        Ассистент B2C-SQL
                    </UITitle>
                </UIFlex>
            }
            footer={
                <UIFlex align="center" gap={10}>
                    <div
                        ref={messageInputRef}
                        className={cx(
                            'messageInput',
                            width === FULL_WIDTH && 'fullWidth',
                            `${isEmptyInput ? 'empty' : ''}`
                        )}
                        contentEditable
                        onInput={handleInput}
                        onPaste={(e) => {
                            e.preventDefault();
                            const text = e.clipboardData.getData('text/plain');
                            document.execCommand('insertText', false, text);
                        }}
                        data-placeholder="Написать..."
                        suppressContentEditableWarning
                    />
                    {isNotLoadingUploadMess ? (
                        <Icon
                            type="arrowUpOutlined"
                            size="sm"
                            className={cx(
                                'icon',
                                !isEmptyInput ? '' : 'disabled'
                            )}
                            onClick={!isEmptyInput ? sendMessage : () => {}}
                        />
                    ) : (
                        <UISpinner className={cx('spinner')} size="large" />
                    )}
                </UIFlex>
            }>
            <ChatView messages={messages} userId={me?.id} />
        </UIDrawer>
    );
});
