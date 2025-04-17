import React from 'react';

import { StreamLanguage } from '@codemirror/language';
import { java } from '@codemirror/legacy-modes/mode/clike';
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

export const UIJavaEditor: React.FC<Props> = ({
    code,
    maxHeight,
    maxWidth,
    minHeight,
    ...props
}) => {
    const extensions = [
        StreamLanguage.define(java),
        EditorView.lineWrapping, // Перенос строк
    ];

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
            extensions={extensions}
        />
    );
};

export type { Props as UIJavaEditorProps };
