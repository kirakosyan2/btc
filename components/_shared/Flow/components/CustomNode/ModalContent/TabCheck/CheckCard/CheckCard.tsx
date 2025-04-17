import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { Icon } from '@components/_shared/Icon';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormTextArea } from '@components/_shared/Form/FormTextArea/FormTextArea';
import { FormSwitch } from '@components/_shared/Form/FormSwitch';
import { UITitle } from '@components/_shared/Title';
import { eUserRoles } from '@src/redux/auth/auth';
import { Checks } from '@src/redux/DQC/DQC';
import { UICollapse } from '@components/_shared/Collapse';
import { CollapseProps } from 'antd';
import { UICheckBox } from '@components/_shared/CheckBox';


type Props = {
    field: Checks;
    role: eUserRoles | null;
    remove: () => void;
    onChangeField: (id: string, value: string | boolean, field: string) => void;
};

export const CheckCard: React.FC<Props> = ({ field, role, remove, onChangeField }) => {
    const cx = useStyles(styles);


    const items: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <UITitle level={5}>Опциональные поля</UITitle>,
                children: <UIFlex vertical gap={10}>
                    <UIFlex vertical gap={10}>
                        <UICheckBox
                            defaultChecked={field.is_blocker}
                            onChange={(e) => onChangeField(field.id as string, e.target.checked, 'is_blocker')}
                        >Блокировать CTL поток?</UICheckBox>
                        <UICheckBox
                            defaultChecked={field.is_incident}
                            onChange={(e) => onChangeField(field.id as string, e.target.checked, 'is_incident')}
                        >Создавать инцидент?</UICheckBox>
                    </UIFlex>
                    <FormInput
                        formProps={{
                            label: <UITitle level={5}>Описание</UITitle>,
                        }}
                        inputProps={{
                            defaultValue: field.description,
                            size: 'large',
                            placeholder: 'Добавьте описание',
                            onBlur: (e) => onChangeField(field.id as string, e.target.value, 'description'),
                        }}
                    />
                </UIFlex>
            }

        ],
        [field]
    )

    return (
        <UICard className={cx('container')}>
            <UIFlex justify="flex-end">
                <Icon
                    type="delete-outlined"
                    className={cx('delete-icon')}
                    onClick={
                        ![eUserRoles.BUISNESS].includes(role as eUserRoles) ? remove : () => { }
                    }
                />
            </UIFlex>

            <FormInput
                formProps={{
                    label: <UITitle level={5}>Название проверки</UITitle>,
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    defaultValue: field.name,
                    size: 'large',
                    placeholder: 'Введите название проверки',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    onBlur: (e) => onChangeField(field.id as string, e.target.value, 'name'),
                }}
            />

            <FormTextArea
                formProps={{
                    label: (
                        <div>
                            <UITitle level={5}>Значение</UITitle>
                        </div>
                    ),
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                textAreaProps={{
                    defaultValue: field.value,
                    size: 'large',
                    placeholder: 'Введите значение',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    onBlur: (e) => onChangeField(field.id as string, e.target.value, 'value'),
                }}
            />
            <UIFlex
                gap={10} align='center' style={{
                    marginBottom: 10
                }}>
                <FormSwitch
                    formProps={{
                        style: {
                            marginBottom: 0
                        }
                    }}
                    switchProps={{
                        defaultChecked: field.enabled,
                        disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                        onChange: (e) => onChangeField(field.id as string, e, 'enabled'),

                    }}

                />
                {field.enabled ? 'Включено' : 'Выключено'}
            </UIFlex>

            <UICollapse items={items} />
        </UICard>
    );
};
