import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';
import { UIModal } from '@components/_shared/Modal';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import {
    ShowcaseUpdateGlobalParams,
    ShowcaseVars,
    useBaseQuery,
    useUpdateBaseMutation,
} from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { ModalGlobalParamsView } from './ModalGlobalParams.view';
import styles from './styles.module.scss';

type Props = {
    opened?: boolean;
    isReference: boolean;
    onClose?: () => void;
};

type FormProps = {
    variables: ShowcaseVars[];
};

export const ModalGlobalParams: React.FC<Props> = ({
    opened,
    isReference,
    onClose,
}) => {
    const cx = useStyles(styles);

    const { id } = useParams();
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: dataBase } = useBaseQuery(id as string, {
        skip: !id,
    });

    // Mutatations
    const [updateGlobalParams, { isLoading: isLoadingUpdate }] =
        useUpdateBaseMutation();

    useEffect(() => {
        if (dataBase) {
            form.setFieldsValue({
                variables: dataBase.vars,
            });
        }
    }, [dataBase]);

    const onSubmit = async ({ variables }: FormProps) => {
        if (isReference) return;

        const payload: ShowcaseUpdateGlobalParams = {
            id: String(id),
            vars: variables,
        };

        const res: any = await updateGlobalParams(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно обновлены',
            });

            onClose?.();
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при обвновлении данных',
            });
        }
    };

    return (
        <UIModal
            open={opened}
            onClose={onClose}
            onCancel={onClose}
            destroyOnClose
            width={1000}
            height={700}
            footer={null}
            className={cx('container')}
            title={
                <UITitle className={cx('title')} level={3}>
                    Пользовательские глобальные перменные
                </UITitle>
            }>
            <UIForm onFinish={onSubmit} form={form}>
                <ModalGlobalParamsView
                    isLoadingUpdate={isLoadingUpdate}
                    role={role}
                />
            </UIForm>
        </UIModal>
    );
};
