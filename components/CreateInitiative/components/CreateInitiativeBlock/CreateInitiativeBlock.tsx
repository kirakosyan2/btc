import { UIForm } from '@components/_shared/Form';
import React from 'react';
import { CreateInitiativeBlockView } from './CreateInitiativeBlock.view';
import { useCustomersQuery } from '@src/redux/customers/customers';
import { InitiativePayload, useCreateInitiativeMutation } from '@src/redux/initiative/initiative';
import { notificationEasy } from '@src/utils';
import { Form } from 'antd';

type FormProps = {
    customer: number;
    link: string;
    name: string;
};

export const CreateInitiativeBlock: React.FC = () => {
    const [form] = Form.useForm();

    // Query
    const { data: customersList, isLoading: isLoadingCustomersList } = useCustomersQuery();
    // Mutation
    const [createIniative, { isLoading: isLoadingCreateInitiative }] =
        useCreateInitiativeMutation();

    const onSubmit = async ({ customer, link, name }: FormProps) => {
        const payload: InitiativePayload = {
            name,
            confluence_link: link,
            customer,
        };
        const res: any = await createIniative(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Инициатива успешно добавлена',
            });

            form.resetFields();
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при обновлении инициативы',
            });
        }
    };

    return (
        <UIForm
            onFinish={onSubmit}
            layout="vertical"
            form={form}
        >
            <CreateInitiativeBlockView
                customersList={customersList ?? []}
                isLoadingCustomersList={isLoadingCustomersList}
                isLoadingCreate={isLoadingCreateInitiative}
            />
        </UIForm>
    );
};
