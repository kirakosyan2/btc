import { Form, FormItemProps } from 'antd';
import React from 'react';

import {
    UIScalaEditor,
    UIScalaEditorProps,
} from '@components/_shared/ScalaEditor';

type Props = {
    formProps: FormItemProps;
    scalaEditorProps?: UIScalaEditorProps;
};

export const FormScalaEditor: React.FC<Props> = ({
    formProps,
    scalaEditorProps,
}) => {
    return (
        <Form.Item {...formProps}>
            <UIScalaEditor {...scalaEditorProps} />
        </Form.Item>
    );
};
