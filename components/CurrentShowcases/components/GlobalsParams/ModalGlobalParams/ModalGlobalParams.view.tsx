import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UIFlex } from '@components/_shared/Flex';
import { UITitle } from '@components/_shared/Title';
import { UIFormList } from '@components/_shared/Form/FormList';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UIButton } from '@components/_shared/Button';
import { eUserRoles } from '@src/redux/auth/auth';

type Props = {
    isLoadingUpdate: boolean;
    role: eUserRoles | null;
};

export const ModalGlobalParamsView: React.FC<Props> = ({ isLoadingUpdate, role }) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('content')}>
            <UIFlex
                align="center"
                justify="space-between"
                className={cx('containerTitles')}
            >
                <UITitle
                    level={4}
                    className={cx('title')}
                >
                    Ключ
                </UITitle>
                <UITitle
                    level={4}
                    className={cx('title')}
                >
                    Значение
                </UITitle>
            </UIFlex>
            <UIFormList
                name="variables"
                className={cx('formList')}
                classNameAddIcon={cx('formListAddIcon')}
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
                                ],
                                className: cx('formListItem'),
                            }}
                            inputProps={{
                                placeholder: 'Введите ключ',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />

                        <FormInput
                            formProps={{
                                name: [field.name, 'value'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('formListItem'),
                            }}
                            inputProps={{
                                placeholder: 'Введите значение',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />
                    </UIFlex>
                )}
            />
            <UIFlex justify="center">
                <UIButton
                    htmlType="submit"
                    type="primary"
                    size="large"
                    disabled={isLoadingUpdate || [eUserRoles.BUISNESS].includes(role as eUserRoles)}
                    loading={isLoadingUpdate}
                    className={cx('btn')}
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </div>
    );
};
