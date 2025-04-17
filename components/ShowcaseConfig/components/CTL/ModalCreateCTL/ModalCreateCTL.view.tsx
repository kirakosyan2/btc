import React from 'react';
import { ConfigsListItems } from '../CardData/CardData';
import { UIFlex } from '@components/_shared/Flex';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { Divider } from 'antd';
import { FormInputNumber } from '@components/_shared/Form/FormInputNumber';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UIButton } from '@components/_shared/Button';

type Props = {
    normalConfigsList: ConfigsListItems[];
    isLoadingCreate: boolean;
};

export const ModalCreateCTLView: React.FC<Props> = ({ normalConfigsList, isLoadingCreate }) => {
    return (
        <UIFlex vertical>
            <FormSelect
                formProps={{
                    name: 'parent',
                    label: 'Родительская CTL сущность',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                selectProps={{
                    placeholder: 'Введите parent',
                    size: 'middle',
                    options: normalConfigsList,
                    style: { width: '100%' },
                }}
            />

            <Divider />

            <FormInputNumber
                formProps={{
                    name: 'ctl_id',
                    label: 'ID CTL сущности',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    placeholder: 'Введите ctl_id',
                    size: 'middle',
                    style: { width: '100%' },
                }}
            />

            <FormInput
                formProps={{
                    name: 'ctl_name',
                    label: 'Имя CTL сущности',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    placeholder: 'Введите ctl_name',
                    size: 'middle',
                }}
            />

            <FormInput
                formProps={{
                    name: 'path',
                    label: 'Путь CTL сущности',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    placeholder: 'Введите path',
                    size: 'middle',
                }}
            />

            <FormInput
                formProps={{
                    name: 'category',
                    label: 'Категория CTL сущности',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    placeholder: 'Введите category',
                    size: 'middle',
                }}
            />

            <UIFlex justify="center">
                <UIButton
                    type="primary"
                    htmlType="submit"
                    disabled={isLoadingCreate}
                    loading={isLoadingCreate}
                >
                    Создать сущность
                </UIButton>
            </UIFlex>
        </UIFlex>
    );
};
