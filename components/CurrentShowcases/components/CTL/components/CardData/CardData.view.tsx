import { Divider } from 'antd';
import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormInputNumber } from '@components/_shared/Form/FormInputNumber';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { UIPopconfirm } from '@components/_shared/Popconfirm';
import { UITypography } from '@components/_shared/Typography';

import { useStyles } from '@hooks/useStyles';

import { ConfigsListItems } from './CardData';
import styles from './styles.module.scss';

type Props = {
    parent?: number;
    normalConfigsList: ConfigsListItems[];
    isLoadingDelete: boolean;
    ctlCategory?: string;
    handleDelete: (cascade: boolean) => void;
    openedModalSteam: () => void;
};

export const CardDataView: React.FC<Props> = ({
    normalConfigsList,
    parent,
    isLoadingDelete,
    ctlCategory,
    handleDelete,
    openedModalSteam,
}) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('container')}>
            <FormSelect
                formProps={{
                    name: 'parent',
                    label: 'Родительская CTL сущность',
                }}
                selectProps={{
                    placeholder: 'Введите parent',
                    size: 'middle',
                    disabled: !parent,
                    options: normalConfigsList,
                    style: { width: '100%', marginBottom: '20px' },
                }}
            />

            <Divider />

            <FormInputNumber
                formProps={{
                    name: 'ctl_id',
                    label: 'ID CTL сущности',
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
                }}
                inputProps={{
                    placeholder: 'Введите path',
                    size: 'middle',
                }}
            />

            <UIFlex align="center" gap={10}>
                <UITypography className={cx('ctlPrefix')}>
                    {ctlCategory}/
                </UITypography>
                <FormInput
                    formProps={{
                        name: 'category',
                        label: 'Категория CTL сущности',
                        style: { width: '100%' },
                    }}
                    inputProps={{
                        placeholder: 'Введите category',
                        size: 'middle',
                    }}
                />
            </UIFlex>

            <UIFlex justify="center" gap={40}>
                <UIButton
                    type="primary"
                    className={cx('btn')}
                    onClick={openedModalSteam}>
                    Конфигурировать потоки
                </UIButton>

                <UIPopconfirm
                    destroyTooltipOnHide
                    title="Удалить дочерние сущности (каскадно)?"
                    okText="Да"
                    cancelText="Нет"
                    okButtonProps={{
                        onClick: () => {
                            handleDelete(true);
                        },
                        loading: isLoadingDelete,
                        disabled: isLoadingDelete || !parent,
                    }}
                    cancelButtonProps={{
                        onClick: () => {
                            handleDelete(false);
                        },
                        loading: isLoadingDelete,
                        disabled: isLoadingDelete || !parent,
                    }}>
                    <UIButton danger disabled={!parent} className={cx('btn')}>
                        Удалить сущность
                    </UIButton>
                </UIPopconfirm>
            </UIFlex>
        </div>
    );
};
