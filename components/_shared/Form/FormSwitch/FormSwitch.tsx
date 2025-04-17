import { UISwitch, UISwitchProps } from '@components/_shared/Switch';
import { Form, FormItemProps } from 'antd';
import React from 'react';

type Porps = {
    formProps: FormItemProps;
    switchProps?: UISwitchProps;
};

export const FormSwitch: React.FC<Porps> = ({ formProps, switchProps }) => {
    return (
        <Form.Item {...formProps}>
            <UISwitch {...switchProps} />
        </Form.Item>
    );
};
