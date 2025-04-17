import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGFM from 'remark-gfm';

import { UIFlex } from '@components/_shared/Flex';
import { UIMarkdown } from '@components/_shared/Markdown';
import { UITypography } from '@components/_shared/Typography';

import { useStyles } from '@hooks/useStyles';

import { MessageProps } from './Chat';
import styles from './styles.module.scss';

type Props = {
    messages: MessageProps[];
    userId?: number;
};

export const ChatView: React.FC<Props> = ({ messages, userId }) => {
    const cx = useStyles(styles);

    return (
        <UIFlex vertical className={cx('container')} gap={10}>
            {messages.map((item) => (
                <UIFlex
                    key={item.timestamp}
                    vertical
                    align={userId === item.sender ? 'flex-end' : 'flex-start'}>
                    <UITypography
                        key={item.timestamp}
                        className={cx(
                            'message',
                            userId === item.sender ? 'sender' : 'consumer'
                        )}>
                        <UIMarkdown
                            children={item.text}
                            rehypePlugins={[remarkGFM, rehypeRaw]}
                            components={{
                                code(props) {
                                    const {
                                        children,
                                        className,
                                        node,
                                        ...rest
                                    } = props;
                                    const match = /language-(\w+)/.exec(
                                        className || ''
                                    );

                                    return match ? (
                                        <SyntaxHighlighter
                                            {...rest}
                                            PreTag="div"
                                            children={String(children).replace(
                                                /\n$/,
                                                ''
                                            )}
                                            language={match[1]}
                                            style={dracula}
                                            ref={undefined}
                                        />
                                    ) : (
                                        <code {...rest} className={className}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        />
                    </UITypography>
                </UIFlex>
            ))}
        </UIFlex>
    );
};
