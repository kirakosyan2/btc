import React from 'react';

import { xml } from '@codemirror/lang-xml';
import CodeMirror, {
    EditorView,
    ReactCodeMirrorProps,
} from '@uiw/react-codemirror';

type Props = ReactCodeMirrorProps & {
    code?: string;
    minHeight?: string;
    maxHeight?: string;
    userParams?: string[] | undefined;
};

export const UIXMLEditor: React.FC<Props> = ({
    minHeight = '13rem',
    maxHeight = '60rem',
    userParams,
    ...props
}) => {
    return (
        <CodeMirror
            {...props}
            style={{
                borderRadius: '4px',
                outline: '0px !important',
                whiteSpace: 'pre-wrap',
            }}
            minHeight={minHeight}
            maxHeight={maxHeight}
            theme={EditorView.theme({
                '&.cm-focused': {
                    outline: 'none',
                },
            })}
            extensions={[xml()]}
        />
    );
};

export type { Props as UIXMLEditorProps };
