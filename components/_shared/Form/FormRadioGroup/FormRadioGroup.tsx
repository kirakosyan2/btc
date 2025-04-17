import { Form, FormItemProps } from 'antd';
import React from 'react';

import {
    UIRadioGroup,
    UIRadioGroupProps,
} from '@components/_shared/RadioGroup';

type Props = {
    formProps: FormItemProps;
    radioGroupProps?: Omit<UIRadioGroupProps, 'options'>;
    options?: UIRadioGroupProps['options'];
};

export const FormRadioGroup: React.FC<Props> = ({
    formProps,
    radioGroupProps,
    options,
}) => {
    return (
        <Form.Item {...formProps}>
            <UIRadioGroup {...radioGroupProps} options={options} />
        </Form.Item>
    );
};
