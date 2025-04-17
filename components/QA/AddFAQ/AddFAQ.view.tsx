import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormTextArea } from '@components/_shared/Form/FormTextArea/FormTextArea';
import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
  isLoadingCreate: boolean;
};

export const AddFAQView: React.FC<Props> = ({ isLoadingCreate }) => {
  const cx = useStyles(styles);

  return (
    <UICard style={{ marginTop: 20 }}>
      <FormInput
        formProps={{
          name: 'title',
          label: 'Тема вопроса',
          rules: [
            {
              required: true,
              message: 'Обязательное поле',
            },
          ],
        }}
        inputProps={{
          placeholder: 'Введите тему вопроса',
          size: 'large',
        }}
      />

      <FormTextArea
        formProps={{
          name: 'question',
          label: 'Описание',
          rules: [
            {
              required: true,
              message: 'Обязательное поле',
            },
          ],
        }}
        textAreaProps={{
          placeholder: 'Введите описание',
          className: cx('textarea'),
        }}
      />

      <UIButton
        type="primary"
        htmlType="submit"
        size="large"
        disabled={isLoadingCreate}
        loading={isLoadingCreate}>
        Отправить
      </UIButton>
    </UICard>
  );
};
