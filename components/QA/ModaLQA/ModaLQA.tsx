import { Form } from 'antd';
import React, { useEffect, useState } from 'react';

import { UIForm } from '@components/_shared/Form';
import { UIModal } from '@components/_shared/Modal';
import { UITitle } from '@components/_shared/Title';
import { useStyles } from '@hooks/useStyles';
import { useAnswerAdminMutation, useCurrentFAQQuery } from '@src/redux/FAQ/FAQ';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { SkeletonTitleQA } from '../SkeletonTitleQA';
import { ModaLQAView } from './ModaLQA.view';
import styles from './styles.module.scss';

type Props = {
    idQA?: string | number;
    opened: boolean;
    onClose: () => void;
};

type FormProps = {
    answer: string;
};

export const ModaLQA: React.FC<Props> = ({ idQA, opened, onClose }) => {
    const cx = useStyles(styles);
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();

    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: currFAQ, isLoading: isLoadingCurrFAQ } = useCurrentFAQQuery(
        idQA as string,
        {
            skip: !idQA,
        }
    );

    // Mutations
    const [answerAdmin, { isLoading: isLoadingAnswer }] =
        useAnswerAdminMutation();

    useEffect(() => {
        if (currFAQ) {
            form.setFieldsValue({
                answer: currFAQ.answer,
            });
        }
    }, [currFAQ]);

    const onSubmit = async ({ answer }: FormProps) => {
        const res: any = await answerAdmin({
            id: String(idQA),
            answer,
        });

        if (res?.data) {
            notificationEasy({
                content: 'Ответ на вопрос успешно отправлен',
            });

            setEdit(false);
            form.resetFields();
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при отправке ответа',
            });
        }
    };

    const handleClose = () => {
        setEdit(false);
        onClose();
    };

    return (
        <UIModal
            open={opened}
            onClose={handleClose}
            onCancel={handleClose}
            footer={null}
            width={800}
            destroyOnClose
            title={
                isLoadingCurrFAQ ? (
                    <SkeletonTitleQA />
                ) : (
                    <UITitle level={2} className={cx('title')}>{currFAQ?.title}</UITitle>
                )
            }>
            <UIForm layout="vertical" onFinish={onSubmit} form={form}>
                <ModaLQAView
                    data={currFAQ}
                    isLoadingCurrFAQ={isLoadingCurrFAQ}
                    isLoadingAnswer={isLoadingAnswer}
                    edit={edit}
                    role={role}
                    setEdit={setEdit}
                />
            </UIForm>
        </UIModal>
    );
};
