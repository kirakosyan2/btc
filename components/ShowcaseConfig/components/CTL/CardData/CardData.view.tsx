import { Divider } from 'antd';
import React from 'react';

import { ConfigsListItems } from './CardData';
import styles from './styles.module.scss';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormInputNumber } from '@components/_shared/Form/FormInputNumber';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { UIPopconfirm } from '@components/_shared/Popconfirm';
import { useStyles } from '@hooks/useStyles';

type Props = {
    parent?: number;
    normalConfigsList: ConfigsListItems[];
    isLoadingDelete: boolean;
    handleDeleteCurrCTL: (cascade: boolean) => void;
};

export const CardDataView: React.FC<Props> = ({
    normalConfigsList,
    parent,
    isLoadingDelete,
    handleDeleteCurrCTL,
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

            <FormInput
                formProps={{
                    name: 'category',
                    label: 'Категория CTL сущности',
                }}
                inputProps={{
                    placeholder: 'Введите category',
                    size: 'middle',
                }}
            />

            <UIFlex justify="center">
                <UIPopconfirm
                    destroyTooltipOnHide
                    title="Удалить дочерние сущности (каскадно)?"
                    okText="Да"
                    cancelText="Нет"
                    okButtonProps={{
                        onClick: () => {
                            handleDeleteCurrCTL(true);
                        },
                        loading: isLoadingDelete,
                        disabled: isLoadingDelete || !parent,
                    }}
                    cancelButtonProps={{
                        onClick: () => {
                            handleDeleteCurrCTL(false);
                        },
                        loading: isLoadingDelete,
                        disabled: isLoadingDelete || !parent,
                    }}>
                    <UIButton danger disabled={!parent}>
                        Удалить сущность
                    </UIButton>
                </UIPopconfirm>
            </UIFlex>
        </div>
    );
};
