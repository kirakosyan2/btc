import { Form } from 'antd';
import React from 'react';

import { UIForm } from '@components/_shared/Form';
import { useCreateFaqMutation } from '@src/redux/FAQ/FAQ';
import { notificationEasy } from '@src/utils';

import { AddFAQView } from './AddFAQ.view';

type FromProps = {
  title: string;
  question: string;
};
export const AddFAQ: React.FC = () => {
  const [form] = Form.useForm();

  // Mutations
  const [createFAQ, { isLoading: isLoadingCreate }] = useCreateFaqMutation();

  const onSubmit = async (data: FromProps) => {
    const res: any = await createFAQ(data);

    if (res?.data) {
      notificationEasy({
        content: 'Запись в FAQ успешно добавлена',
      });
      form.resetFields();
    } else {
      notificationEasy({
        type: 'error',
        content:
          res?.error.data.detail ??
          'Произошла ошибка при добавлении записи в FAQ',
      });
    }
  };

  return (
    <UIForm layout="vertical" onFinish={onSubmit} form={form}>
      <AddFAQView isLoadingCreate={isLoadingCreate} />
    </UIForm>
  );
};
