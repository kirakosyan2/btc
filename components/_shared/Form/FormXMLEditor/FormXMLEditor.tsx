import { Form, FormItemProps } from 'antd';
import React from 'react';

import { UIXMLEditor, UIXMLEditorProps } from '@components/_shared/XMLEditor';

type Props = {
    formProps: FormItemProps;
    xmlEditorProps?: UIXMLEditorProps;
};

export const FormXMLEditor: React.FC<Props> = ({
    formProps,
    xmlEditorProps,
}) => {
    return (
        <Form.Item {...formProps}>
            <UIXMLEditor {...xmlEditorProps} />
        </Form.Item>
    );
};
