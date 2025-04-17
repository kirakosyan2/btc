import { UIInputNumber, UIInputNumberProps } from '@components/_shared/InputNumber';
import { Form, FormItemProps } from 'antd';
import React from 'react';

type Porps = {
    formProps: FormItemProps;
    inputProps?: UIInputNumberProps;
};

export const FormInputNumber: React.FC<Porps> = ({ formProps, inputProps }) => {
    return (
        <Form.Item {...formProps}>
            <UIInputNumber {...inputProps} />
        </Form.Item>
    );
};
