import React, { useEffect, useMemo } from 'react';
import { UIForm } from '@components/_shared/Form';
import { AddCustomersView } from './AddCustomers.view';
import { useTeamsQuery } from '@src/redux/teams/teams';
import { CustomersPayload, useCreateCustomerMutation } from '@src/redux/customers/customers';
import { notificationEasy } from '@src/utils';
import { Form } from 'antd';
import { useMeQuery } from '@src/redux/personalCabinet/personalCabinet';

type FormProps = {
    customerName: string;
    customerCode: string;
    confluence: string;
};
export const AddCustomers: React.FC = () => {
    const [form] = Form.useForm();

    // Query
    const { data: teamsList } = useTeamsQuery();
    const { data: me } = useMeQuery();

    // Mutations
    const [createCustomer, { isLoading: isLoadingCreate }] = useCreateCustomerMutation();

    const currentTeam = useMemo(
        () => (teamsList && me ? teamsList.find((team) => team.value === me?.team) : undefined),

        [teamsList, me],
    );



    useEffect(() => {
        if (teamsList && me) {
            form.setFieldsValue({
                team: currentTeam?.label,
            });
        }
    }, [me, currentTeam]);

    const onSubmit = async ({ confluence, customerCode, customerName }: FormProps) => {
        const payload: CustomersPayload = {
            team: currentTeam?.value,
            code_name: customerCode,
            confluence_link: confluence,
            name: customerName,
        };

        const res: any = await createCustomer(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Заказчик добавлен',
            });

            form.resetFields();

            form.setFieldsValue({
                team: currentTeam?.label,
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при добавлении заказчика',
            });
        }
    };

    return (
        <UIForm
            onFinish={onSubmit}
            layout="vertical"
            form={form}
        >
            <AddCustomersView isLoadingCreate={isLoadingCreate} />
        </UIForm>
    );
};
