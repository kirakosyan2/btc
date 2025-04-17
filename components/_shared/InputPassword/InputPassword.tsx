import React, { useState } from 'react';
import { UIInput, UIInputProps } from '../Input';
import { Icon } from '../Icon';

export const UIInputPassword: React.FC<UIInputProps> = ({ ...props }) => {
    const [view, setView] = useState(false);

    const toogleView = () => setView((prev) => !prev);

    return (
        <UIInput
            {...props}
            type={view ? 'text' : 'password'}
            suffix={
                <Icon
                    type={view ? 'eye-invisible-outlined' : 'eye-outlined'}
                    onClick={toogleView}
                    size="sm"
                    test_id="icon-pass"
                />
            }
        />
    );
};
