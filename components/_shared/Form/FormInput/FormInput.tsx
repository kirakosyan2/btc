import { UIInput, UIInputProps } from '@components/_shared/Input';
import { Form, FormItemProps } from 'antd';
import React from 'react';

type Porps = {
  formProps: FormItemProps;
  inputProps?: UIInputProps;
};

export const FormInput: React.FC<Porps> = ({ formProps, inputProps }) => {
  return (
    <Form.Item {...formProps}>
      <UIInput {...inputProps} />
    </Form.Item>
  );
};
