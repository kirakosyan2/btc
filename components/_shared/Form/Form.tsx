import { Form, FormProps } from 'antd';
import React, { ReactNode } from 'react';

type Props = FormProps & {
    children: ReactNode;
};

export const UIForm: React.FC<Props> = ({ children, ...props }): any => {
    return <Form {...props}>{children}</Form>;
};

export type { Props as UIFormProps };
