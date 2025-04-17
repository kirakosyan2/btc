import React from 'react';
import Markdown, { Options } from 'react-markdown';

type Props = Readonly<Options>;

export const UIMarkdown: React.FC<Props> = ({ ...props }) => {
    return <Markdown {...props} />;
};

export type { Props as UIMarkdownProps };
