import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

type Props = TextAreaProps;

const { TextArea } = Input;

export const UITextArea: React.FC<Props> = ({ ...props }) => {
    return <TextArea {...props} />;
};

export type { Props as UITextAreaProps };
