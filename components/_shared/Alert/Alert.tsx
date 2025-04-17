import { Alert, AlertProps } from 'antd';
import React from 'react';

type Props = AlertProps;

export const UIAlert: React.FC<Props> = ({ ...props }) => {
    return <Alert {...props} />;
};

export type { Props as UIAlertProps };
