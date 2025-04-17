import { Form } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';
import {
  IRegistrationPayload,
  useRegistrationMutation,
} from '@src/redux/auth/auth';
import { useTeamsQuery } from '@src/redux/teams/teams';
import { notificationEasy } from '@src/utils';

import { RegistrationView } from './Registration.view';

type FormProps = {
  login: string;
  team: number;
  name: string;
  lastName: string;
  sigmaEmail: string;
  omegaEmail: string;
  sigmaLogin: string;
  omegaLogin: string;
  password: string;
  passwordRecovery: string;
};

export const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const password = Form.useWatch('password', form);

  // Mutations
  const [registration, { isLoading }] = useRegistrationMutation();

  // Query
  const { data: teamsList, isLoading: isLoadingTeamsList } = useTeamsQuery();

  const onSubmit = async (data: FormProps) => {
    const payload: IRegistrationPayload = {
      username: data.login,
      team: data.team,
      first_name: data.name,
      last_name: data.lastName,
      email_omega: data.omegaEmail,
      email_sigma: data.sigmaEmail,
      login_omega: data.omegaLogin,
      login_sigma: data.sigmaLogin,
      password: data.password,
    };

    const res: any = await registration(payload);

    if (res?.data) {
      notificationEasy({
        content: 'Регистрация прошла успешно',
      });

      navigate('/user/login');
    } else {
      for (const [key, value] of Object.entries(res?.error?.data)) {
        notificationEasy({
          type: 'error',
          content: `${key !== 'detail' ? key + ':' : ''} ${value}`,
        });
      }
    }
  };

  return (
    <UIForm onFinish={onSubmit} layout="vertical" form={form}>
      <RegistrationView
        password={password}
        isLoading={isLoading}
        teamsList={teamsList ?? []}
        isLoadingTeamsList={isLoadingTeamsList}
      />
    </UIForm>
  );
};
