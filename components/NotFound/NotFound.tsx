import { UIForm } from '@components/_shared/Form';
import React from 'react';
import { NotFoundView } from './NotFound.view';

export const NotFound: React.FC = () => {
    const onSubmit = (data: any) => {
        console.log('onSubmit', data);
    };

    return (
        <UIForm
            onFinish={onSubmit}
            layout="vertical"
        >
            <NotFoundView />
        </UIForm>
    );
};
