import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITitle } from '@components/_shared/Title';
import React from 'react';
import { useStyles } from '@hooks/useStyles';
import styles from './styles.module.scss';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { TransformOptionsList } from '@src/redux/types/type';
import { UIFormList } from '@components/_shared/Form/FormList';
import { eUserRoles } from '@src/redux/auth/auth';

type Props = {
    optionsCheckList: TransformOptionsList[];
    role: eUserRoles | null;
};

export const IssueReleaseView: React.FC<Props> = ({ optionsCheckList, role }) => {
    const cx = useStyles(styles);

    return (
        <>
            <UIFlex
                vertical
                className={cx('inputContainer')}
            >
                <FormInput
                    formProps={{
                        name: 'summary',
                        label: (
                            <span className={cx('item')}>
                                <UITitle level={5}>Summary</UITitle>
                            </span>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите sammary ',
                    }}
                />
                <FormSelect
                    formProps={{
                        name: 'release_type',
                        label: <UITitle level={5}>Тип релиза</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    selectProps={{
                        size: 'large',
                        placeholder: 'Введите тип релиза',
                        options: optionsCheckList,
                    }}
                />

                <FormInput
                    formProps={{
                        name: 'ci_subsystem',
                        label: <UITitle level={5}>КЭ</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите КЭ',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'ci_pkap_as',
                        label: <UITitle level={5}>ИТ-услуга</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите ИТ-услгугу',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'nexus_distniputive',
                        label: <UITitle level={5}>Ссылка на дистрибутив</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Вставьте ссылку на дистрибутив',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'target_of_pci',
                        label: <UITitle level={5}>Цель проведения ПСИ</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите цель проведения ПСИ',
                    }}
                />
                {/* <FormInput
                    formProps={{
                        name: 'story_key',
                        label: <UITitle level={5}>Состав ТС и СПО</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите состав ТС и СПО',
                    }}
                /> */}

                <UIFlex >
                    <UITitle
                        level={5}
                        className={cx('text')}
                    >
                        Ключи Story/Bug
                    </UITitle>

                </UIFlex>
                <UIFormList
                    name="story_key"
                    className={cx('formList')}
                    disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                    renderData={(field) => (

                        <FormInput
                            formProps={{
                                name: [field.name, 'value'],
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
                                placeholder: 'Введите ключи Story/Bug',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                                style: { width: 1050 }
                            }}
                        />

                    )}
                />
                <FormInput
                    formProps={{
                        name: 'special_condition',
                        label: <UITitle level={5}>Особые условия и ограничения</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите особые условия и ограничения',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'result_of_pci',
                        label: <UITitle level={5}>Результат ПСИ</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите результат ПСИ',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'description',
                        label: <UITitle level={5}>Описание (description)</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                        className: cx('containerItem'),
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите описание',
                    }}
                />
            </UIFlex>
        </>
    );
};
