import { UITextArea, UITextAreaProps } from '@components/_shared/TextArea';
import { Form, FormItemProps } from 'antd';
import React from 'react';

type Porps = {
    formProps: FormItemProps;
    textAreaProps?: UITextAreaProps;
};

export const FormTextArea: React.FC<Porps> = ({ formProps, textAreaProps }) => {
    return (
        <Form.Item {...formProps}>
            <UITextArea {...textAreaProps} />
        </Form.Item>
    );
};
