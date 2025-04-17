import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UIFormList } from '@components/_shared/Form/FormList';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
    isLoadingUpdate: boolean;
};

export const RegisterUserFuncView: React.FC<Props> = ({ isLoadingUpdate }) => {
    const cx = useStyles(styles);

    return (
        <div>
            <UIFlex align="center" vertical style={{ width: '100%' }}>
                <UITitle level={3}>
                    Регистрация пользовательских функций
                </UITitle>

                <UIFlex
                    align="center"
                    justify="space-between"
                    className={cx('containerTitles')}>
                    <UITitle level={4} className={cx('title')}>
                        Ключ
                    </UITitle>
                    <UITitle level={4} className={cx('title')}>
                        Значение
                    </UITitle>
                </UIFlex>
            </UIFlex>

            <UIFormList
                name="external_conf"
                className={cx('formList')}
                // disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                renderData={(field) => (
                    <UIFlex className={cx('formListContent')} gap={40}>
                        <FormInput
                            formProps={{
                                name: [field.name, 'function_name'],
                                className: cx('formListItem'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                size: 'large',
                                placeholder: 'Ключ',
                                // disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />

                        <FormInput
                            formProps={{
                                name: [field.name, 'function_path'],
                                className: cx('formListItem'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите значение',
                                size: 'large',
                                // disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />
                    </UIFlex>
                )}
            />

            <UIFlex justify="center" className={cx('containerBtn')}>
                <UIButton
                    className={cx('btn')}
                    htmlType="submit"
                    type="primary"
                    size="large"
                    loading={isLoadingUpdate}
                    disabled={isLoadingUpdate}>
                    Сохранить
                </UIButton>
            </UIFlex>
        </div>
    );
};
