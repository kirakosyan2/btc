import { UIInputProps } from '@components/_shared/Input';
import { UIInputPassword } from '@components/_shared/InputPassword';
import { Form, FormItemProps } from 'antd';
import React from 'react';

type Porps = {
    formProps: FormItemProps;
    inputProps?: UIInputProps;
};

export const FormInputPassword: React.FC<Porps> = ({ formProps, inputProps }) => {
    return (
        <Form.Item {...formProps}>
            <UIInputPassword {...inputProps} />
        </Form.Item>
    );
};
