import { UISelect, UISelectProps } from '@components/_shared/Select';
import { Form, FormItemProps } from 'antd';
import React from 'react';

type Porps = {
  formProps: FormItemProps;
  selectProps?: UISelectProps;
};

export const FormSelect: React.FC<Porps> = ({ formProps, selectProps }) => {
  return (
    <Form.Item {...formProps}>
      <UISelect {...selectProps} />
    </Form.Item>
  );
};
