import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UIButton } from '@components/_shared/Button';

type Props = {
    isLoadingCreate: boolean;
};
export const AddCustomersView: React.FC<Props> = ({ isLoadingCreate }) => {
    const cx = useStyles(styles);

    return (
        <UICard className={cx('container')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Добавить заказчика
            </UITitle>
            <div className={cx('content')}>
                <UIFlex
                    justify="space-between"
                    gap={20}
                >
                    <FormInput
                        formProps={{
                            name: 'team',
                            label: <UITitle level={5}>Команда</UITitle>,
                            rules: [
                                {
                                    required: true,
                                    message: 'Обязательное поле',
                                },
                            ],
                            className: cx('contentItem'),
                        }}
                        inputProps={{
                            size: 'large',
                            readOnly: true,
                        }}
                    />
                    <FormInput
                        formProps={{
                            name: 'customerName',
                            label: <UITitle level={5}>Название заказчика</UITitle>,
                            rules: [
                                {
                                    required: true,
                                    message: 'Обязательное поле',
                                },
                            ],
                            className: cx('contentItem'),
                        }}
                        inputProps={{
                            placeholder: 'Название заказчика',
                            size: 'large',
                        }}
                    />
                    <FormInput
                        formProps={{
                            name: 'customerCode',
                            label: <UITitle level={5}>Краткий код заказчика</UITitle>,
                            rules: [
                                {
                                    required: true,
                                    message: 'Обязательное поле',
                                },
                                {
                                    max: 10,
                                    message: 'Максимально 10 символов',
                                },
                            ],
                            className: cx('contentItem'),
                        }}
                        inputProps={{
                            placeholder: 'Код команды',
                            size: 'large',
                        }}
                    />
                </UIFlex>
                <FormInput
                    formProps={{
                        name: 'confluence',
                        label: <UITitle level={5}>Confluence</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        placeholder: 'Ссылка в Confluence на заказчика',
                        size: 'large',
                        className: cx('contentItem'),
                    }}
                />
                <UIFlex justify='center'>
                    <UIButton
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className={cx('btn')}
                        loading={isLoadingCreate}
                        disabled={isLoadingCreate}
                    >
                        Создать
                    </UIButton>
                </UIFlex>
            </div>
        </UICard>
    );
};
