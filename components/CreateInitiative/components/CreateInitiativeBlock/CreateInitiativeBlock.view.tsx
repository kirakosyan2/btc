import { UICard } from '@components/_shared/Card';
import React, { useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UITitle } from '@components/_shared/Title';
import { UIFlex } from '@components/_shared/Flex';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UIButton } from '@components/_shared/Button';
import { CustomersList } from '@src/redux/customers/customers';

type Props = {
    customersList: CustomersList[];
    isLoadingCustomersList: boolean;
    isLoadingCreate: boolean;
};
export const CreateInitiativeBlockView: React.FC<Props> = ({
    customersList,
    isLoadingCustomersList,
    isLoadingCreate,
}) => {
    const cx = useStyles(styles);

    const normalCustomersList = useMemo(
        () =>
            customersList.length
                ? customersList.map((team) => ({
                      value: team.id,
                      label: team.name,
                  }))
                : [],
        [customersList],
    );

    const onSearch = useCallback(
        (input: string, option: any) =>
            ((option?.label as string) ?? '').toLowerCase().includes(input.toLowerCase()),
        [],
    );

    return (
        <UICard className={cx('container')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Создание новой инициативы
            </UITitle>

            <UIFlex
                className={cx('content')}
                gap={40}
            >
                <FormSelect
                    formProps={{
                        label: <UITitle level={5}>Заказчик</UITitle>,
                        name: 'customer',
                        className: cx('contentItem'),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    selectProps={{
                        placeholder: 'Выберите заказчика',
                        size: 'large',
                        options: normalCustomersList,
                        loading: isLoadingCustomersList,
                        showSearch: true,
                        filterOption: onSearch,
                    }}
                />

                <FormInput
                    formProps={{
                        label: <UITitle level={5}>Название инициативы</UITitle>,
                        name: 'name',
                        className: cx('contentItem'),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        placeholder: 'Введите название инициативы',
                        size: 'large',
                    }}
                />
            </UIFlex>

            <FormInput
                formProps={{
                    label: <UITitle level={5}>Ссылка на инициативу в Confluence</UITitle>,
                    name: 'link',
                    className: cx('contentItem'),
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    placeholder: 'Введите ссылку на инициативу в Confluence',
                    size: 'large',
                }}
            />

            <UIFlex justify="center">
                <UIButton
                    htmlType="submit"
                    type="primary"
                    className={cx('btn')}
                    size="large"
                    disabled={isLoadingCreate}
                    loading={isLoadingCreate}
                >
                    Создать
                </UIButton>
            </UIFlex>
        </UICard>
    );
};
