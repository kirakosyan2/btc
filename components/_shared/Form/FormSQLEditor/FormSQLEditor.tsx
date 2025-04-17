import { Form, FormItemProps } from 'antd';
import React from 'react';

import { UISqlEditor, UISqlEditorProps } from '@components/_shared/SqlEditor';

type Props = {
    formProps: FormItemProps;
    sqlEditorProps?: UISqlEditorProps;
};

export const FormSQLEditor: React.FC<Props> = ({
    formProps,
    sqlEditorProps,
}) => {
    return (
        <Form.Item {...formProps}>
            <UISqlEditor {...sqlEditorProps} />
        </Form.Item>
    );
};
