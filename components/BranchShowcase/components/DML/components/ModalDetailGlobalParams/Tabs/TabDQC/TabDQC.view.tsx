import React from 'react'
import { UITitle } from '@components/_shared/Title';
import { UITypography } from '@components/_shared/Typography';
import { FormSwitch } from '@components/_shared/Form/FormSwitch';
import { eUserRoles } from '@src/redux/auth/auth';
import { FormInput } from '@components/_shared/Form/FormInput';
import { LinkButton } from '@components/_shared/LinkButton';
import { UITooltip } from '@components/_shared/Tooltip';
import { DQC_LINK, OPTIONS_STAT_TYPES } from '@src/utils/constants';
import { Icon } from '@components/_shared/Icon';
import { useStyles } from '@hooks/useStyles';
import styles from './styles.module.scss'
import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { UIFormList } from '@components/_shared/Form/FormList';
import { FormSelect } from '@components/_shared/Form/FormSelect';



type Props = {
    active: boolean;
    role: eUserRoles | null;
    name: string;
    isLoadingUpdate: boolean;
};



export const TabDQCView: React.FC<Props> = ({ active, role, name, isLoadingUpdate }) => {

    const cx = useStyles(styles);

    return (
        <div className={cx('container')}>
            <UITitle level={3}>{name}</UITitle>

            <UITypography className={cx('switchLabel')}>
                <FormSwitch
                    formProps={{
                        name: 'enabled',
                        style: {
                            marginBottom: 0,
                        },
                    }}
                    switchProps={{
                        disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    }}
                />

                {active ? 'Включено' : 'Выключено'}
            </UITypography>

            <FormInput
                formProps={{
                    name: 'monitoring_system',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                monitoring_system
                            </UITitle>
                            {/* <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip> */}
                            <LinkButton
                                to={DQC_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите monitoring_system',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'customer_full_name',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                customer_full_name
                            </UITitle>
                            {/* <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip> */}
                            <LinkButton
                                to={DQC_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите customer_full_name',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'client',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                client
                            </UITitle>
                            {/* <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip> */}
                            <LinkButton
                                to={DQC_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите client',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'owner',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                owner
                            </UITitle>
                            {/* <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip> */}
                            <LinkButton
                                to={DQC_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите owner',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'business_process',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                business_process
                            </UITitle>
                            {/* <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip> */}
                            <LinkButton
                                to={DQC_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите business_process',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'platform',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                platform
                            </UITitle>
                            {/* <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip> */}
                            <LinkButton
                                to={DQC_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите platform',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'cluster',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                cluster
                            </UITitle>
                            {/* <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip> */}
                            <LinkButton
                                to={DQC_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите cluster',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'group_id',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                group_id
                            </UITitle>
                            {/* <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip> */}
                            <LinkButton
                                to={DQC_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите group_id',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'status',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                status
                            </UITitle>
                            {/* <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip> */}
                            <LinkButton
                                to={DQC_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите status',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'email',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                email
                            </UITitle>
                            {/* <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip> */}
                            <LinkButton
                                to={DQC_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите email',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <UIFlex
                align="center"
                justify="space-between"
                className={cx('containerTexts')}
            >
                <UITitle
                    level={5}
                    className={cx('text')}
                >
                    StatId
                    <UITooltip title="Номер сущности">
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                size="xs"
                            />
                        </span>
                    </UITooltip>
                </UITitle>
                <UITitle
                    level={5}
                    className={cx('text')}
                >
                    EntityId
                    <UITooltip title="Номер статистики">
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                size="xs"
                            />
                        </span>
                    </UITooltip>
                </UITitle>
                <UITitle
                    level={5}
                    className={cx('text')}
                >
                    StatValue
                    <UITooltip title="В зависимости от statValueType либо просто строка со значением для публикации, либо название переменной контекста, значение которой хотим опубликовать">
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                size="xs"
                            />
                        </span>
                    </UITooltip>
                </UITitle>
                <UITitle
                    level={5}
                    className={cx('text')}
                >
                    StatValueType
                    <UITooltip
                        title={`Тип значения переменной statValue: "constant" если строка, "variable" если название переменной`}
                    >
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                size="xs"
                            />
                        </span>
                    </UITooltip>
                </UITitle>
            </UIFlex>

            <UIFormList
                name="publishStats"
                initialValue={[]}
                className={cx('formList')}
                disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                renderData={(field) => (
                    <UIFlex
                        gap={10}
                        className={cx('formListContent')}
                    >
                        <FormInput
                            formProps={{
                                name: [field.name, 'StatId'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите StatId',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />

                        <FormInput
                            formProps={{
                                name: [field.name, 'EntityId'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите EntityId',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />

                        <FormInput
                            formProps={{
                                name: [field.name, 'StatValue'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите StatValue',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />

                        <FormSelect
                            formProps={{
                                name: [field.name, 'StatValueType'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            selectProps={{
                                placeholder: 'Выберите StatValueType',
                                size: 'large',
                                options: OPTIONS_STAT_TYPES,
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />
                    </UIFlex>
                )}
            />

            <UIFlex justify="center">
                <UIButton
                    className={cx('btn')}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingUpdate}
                    disabled={isLoadingUpdate || [eUserRoles.BUISNESS].includes(role as eUserRoles)}
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </div>
    )
}
