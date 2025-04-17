import { Form, FormItemProps } from 'antd';
import React from 'react';

import {
    UIJavaEditor,
    UIJavaEditorProps,
} from '@components/_shared/JavaEditor';

type Props = {
    formProps: FormItemProps;
    javaEditorProps?: UIJavaEditorProps;
};

export const FormJavaEditor: React.FC<Props> = ({
    formProps,
    javaEditorProps,
}) => {
    return (
        <Form.Item {...formProps}>
            <UIJavaEditor {...javaEditorProps} />
        </Form.Item>
    );
};
