import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { TabNames } from './CTLContentTab';
import { UIFormList } from '@components/_shared/Form/FormList';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITitle } from '@components/_shared/Title';
import { UIButton } from '@components/_shared/Button';
import { eUserRoles } from '@src/redux/auth/auth';

type Props = {
    name: TabNames;
    role: eUserRoles | null;
};
export const CTLContentTabView: React.FC<Props> = ({ name, role }) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <UIFlex
                    align="center"
                    justify="space-between"
                    className={cx('contentTitles')}
                >
                    <UITitle
                        level={3}
                        className={cx('title')}
                    >
                        Ключ
                    </UITitle>
                    <UITitle
                        level={3}
                        className={cx('title')}
                    >
                        Значение
                    </UITitle>
                </UIFlex>

                <UIFormList
                    name={name}
                    className={cx('formList')}
                    classNameAddIcon={cx('formListAddIcon')}
                    initialValue={[]}
                    disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                    renderData={(field) => (
                        <UIFlex
                            gap={40}
                            className={cx('formListContent')}
                        >
                            <FormInput
                                formProps={{
                                    name: [field.name, 'key'],
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Обязательное поле',
                                        },
                                        {
                                            transform: (value: string) => value?.trim(),
                                        },
                                    ],
                                    className: cx('formListItem'),
                                }}
                                inputProps={{
                                    placeholder: 'Введите ключ',
                                    size: 'large',
                                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                                    defaultValue: '',
                                }}
                            />

                            <FormInput
                                formProps={{
                                    name: [field.name, 'value'],
                                    className: cx('formListItem'),
                                    rules: [
                                        {
                                            transform: (value: string) => value?.trim(),
                                        },
                                    ],
                                }}
                                inputProps={{
                                    placeholder: 'Введите значение',
                                    size: 'large',
                                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                                    defaultValue: '',
                                }}
                            />
                        </UIFlex>
                    )}
                />
            </div>

            <UIFlex
                justify="center"
                className={cx('footer')}
            >
                <UIButton
                    htmlType="submit"
                    className={cx('btn')}
                    size="large"
                    type="primary"
                    disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </div>
    );
};
