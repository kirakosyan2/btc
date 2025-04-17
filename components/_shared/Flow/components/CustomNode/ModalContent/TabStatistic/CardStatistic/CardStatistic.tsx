import React from 'react';

import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormSwitch } from '@components/_shared/Form/FormSwitch';
import { FormTextArea } from '@components/_shared/Form/FormTextArea/FormTextArea';
import { Icon } from '@components/_shared/Icon';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITypography } from '@components/_shared/Typography';

import { useStyles } from '@hooks/useStyles';

import { NormStatistics } from '@src/redux/DQC/DQC';
import { eUserRoles } from '@src/redux/auth/auth';
import { TOOLTIP_TEXTS } from '@src/utils/constants';

import styles from './styles.module.scss';

// TODO: проработать скрытие элементов взависимости от типа

type Props = {
    data: NormStatistics;
    role: eUserRoles | null;
    remove?: () => void;
    onChangeField: (id: string, value: string | boolean, field: string) => void;
};

export const CardStatistic: React.FC<Props> = ({
    data,
    role,
    remove,
    onChangeField,
}) => {
    const cx = useStyles(styles);

    return (
        <UICard className={cx('container')}>
            <UIFlex justify="flex-end">
                <Icon
                    type="delete-outlined"
                    className={cx('delete-icon')}
                    onClick={remove}
                />
            </UIFlex>

            <FormInput
                formProps={{
                    label: 'Название статистики',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите название статистики',
                    defaultValue: data.name,
                    onBlur: (e) =>
                        onChangeField(
                            data.id as string,
                            e.target.value,
                            'name'
                        ),
                    disabled: [eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    ),
                }}
            />

            <FormInput
                formProps={{
                    label: 'Тип статистики',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    size: 'large',
                    placeholder: 'Введите тип статистики',
                    readOnly: true,
                    value: data.value,
                    disabled: [eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    ),
                }}
            />

            {data.value === 'Custom' && (
                <FormTextArea
                    formProps={{
                        label: 'Запрос',
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    textAreaProps={{
                        size: 'large',
                        placeholder: 'Введите запрос',
                        defaultValue: data.query,
                        onBlur: (e) =>
                            onChangeField(
                                data.id as string,
                                e.target.value,
                                'query'
                            ),
                        disabled: [eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        ),
                    }}
                />
            )}

            {data.value === 'CountNulls' ||
            data.value === 'CountDistincs' ||
            data.value === 'CheckActuality' ||
            data.value === 'CheckAggregate' ||
            data.value === 'CountDuplicates' ||
            data.value === 'CountSkew' ||
            data.value === 'CountEmpty' ||
            data.value === 'CheckFormat' ||
            data.value === 'CheckIntervals' ||
            data.value === 'CountDefaultValues' ? (
                <FormInput
                    formProps={{
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITypography className={cx('text')}>
                                    Столбец
                                </UITypography>
                                <UITooltip
                                    title={TOOLTIP_TEXTS[data.value].column}>
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                        />
                                    </span>
                                </UITooltip>
                            </div>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите столбец',
                        defaultValue: data.columns,
                        onBlur: (e) =>
                            onChangeField(
                                data.id as string,
                                e.target.value,
                                'columns'
                            ),
                        disabled: [eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        ),
                    }}
                />
            ) : null}

            {data.value === 'CountNulls' ||
            data.value === 'CountRows' ||
            data.value === 'CountDistincs' ||
            data.value === 'CheckActuality' ||
            data.value === 'CheckAggregate' ||
            data.value === 'CountDuplicates' ||
            data.value === 'CountEmpty' ||
            data.value === 'CheckFormat' ||
            data.value === 'CheckIntervals' ||
            data.value === 'CountDefaultValues' ||
            data.value === 'CountSkew' ||
            data.value === 'Custom' ? (
                <FormInput
                    formProps={{
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITypography className={cx('text')}>
                                    Таблица
                                </UITypography>
                                <UITooltip
                                    title={TOOLTIP_TEXTS[data.value].table}>
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                        />
                                    </span>
                                </UITooltip>
                            </div>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите название таблицы',
                        defaultValue: data.table,
                        onBlur: (e) =>
                            onChangeField(
                                data.id as string,
                                e.target.value,
                                'table'
                            ),
                        disabled: [eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        ),
                    }}
                />
            ) : null}

            {data.value === 'CheckIntervals' ? (
                <FormInput
                    formProps={{
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITypography className={cx('text')}>
                                    Первичные ключи
                                </UITypography>
                                <UITooltip
                                    title={
                                        TOOLTIP_TEXTS[data.value].primary_keys
                                    }>
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                        />
                                    </span>
                                </UITooltip>
                            </div>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите название первичного ключа',
                        defaultValue: data.table,
                        onBlur: (e) =>
                            onChangeField(
                                data.id as string,
                                e.target.value,
                                'primary_keys'
                            ),
                        disabled: [eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        ),
                    }}
                />
            ) : null}

            {data.value === 'CheckIntervals' ? (
                <FormInput
                    formProps={{
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITypography className={cx('text')}>
                                    Колонки начального и конечного времени
                                </UITypography>
                                <UITooltip
                                    title={
                                        TOOLTIP_TEXTS[data.value].startdt_enddt
                                    }>
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                        />
                                    </span>
                                </UITooltip>
                            </div>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder:
                            'Введите колонки начального и конечного времени (Указать 2 колонки через запятую)',
                        defaultValue: data.table,
                        onBlur: (e) =>
                            onChangeField(
                                data.id as string,
                                e.target.value,
                                'startdt_enddt'
                            ),
                        disabled: [eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        ),
                    }}
                />
            ) : null}

            {data.value === 'CheckAggregate' ? (
                <FormInput
                    formProps={{
                        label: 'Тип агрегации',
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Выберите тип агрегации',
                        defaultValue: data.aggType,
                        onChange: (e) =>
                            onChangeField(
                                data.id as string,
                                e.target.value,
                                'aggType'
                            ),
                        disabled: [eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        ),
                    }}
                />
            ) : null}

            {data.value === 'CheckActuality' ? (
                <FormInput
                    formProps={{
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITypography className={cx('text')}>
                                    Формат даты
                                </UITypography>
                                <UITooltip
                                    title={TOOLTIP_TEXTS[data.value].format}>
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                        />
                                    </span>
                                </UITooltip>
                            </div>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите формат даты',
                        defaultValue: data.format,
                        onBlur: (e) =>
                            onChangeField(
                                data.id as string,
                                e.target.value,
                                'format'
                            ),
                        disabled: [eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        ),
                    }}
                />
            ) : null}

            {data.value === 'CheckFormat' ? (
                <div>
                    <FormInput
                        formProps={{
                            label: (
                                <div className={cx('tooltipContainer')}>
                                    <UITypography className={cx('text')}>
                                        Исключенные символы
                                    </UITypography>
                                    <UITooltip
                                        title={
                                            TOOLTIP_TEXTS[data.value]
                                                .excluded_letters
                                        }>
                                        <span>
                                            <Icon
                                                type="question-circle-outlined"
                                                size="xs"
                                            />
                                        </span>
                                    </UITooltip>
                                </div>
                            ),
                            rules: [
                                {
                                    required: true,
                                    message: 'Обязательное поле',
                                },
                            ],
                        }}
                        inputProps={{
                            size: 'large',
                            placeholder: 'Введите исключенные символы',
                            defaultValue: data.columns,
                            onBlur: (e) =>
                                onChangeField(
                                    data.id as string,
                                    e.target.value,
                                    'excluded_letters'
                                ),
                            disabled: [eUserRoles.BUISNESS].includes(
                                role as eUserRoles
                            ),
                        }}
                    />
                    <UIFlex gap={10}>
                        <FormSwitch
                            formProps={{}}
                            switchProps={{
                                defaultChecked: data.check_cyrillic,
                                onChange: (e) =>
                                    onChangeField(
                                        data.id as string,
                                        e,
                                        'check_cyrillic'
                                    ),
                            }}
                        />
                        <UITypography style={{ marginTop: 5 }}>
                            Проверка кириллицы
                        </UITypography>
                    </UIFlex>
                </div>
            ) : null}

            {data.value === 'CountDefaultValues' ? (
                <FormInput
                    formProps={{
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITypography className={cx('text')}>
                                    Количесвто по умолчанию
                                </UITypography>
                                <UITooltip
                                    title={TOOLTIP_TEXTS[data.value].default}>
                                    <span>
                                        <Icon
                                            type="question-circle-outlined"
                                            size="xs"
                                        />
                                    </span>
                                </UITooltip>
                            </div>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Укажите количесвто по умолчанию',
                        defaultValue: data.columns,
                        onBlur: (e) =>
                            onChangeField(
                                data.id as string,
                                e.target.value,
                                'default'
                            ),
                        disabled: [eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        ),
                    }}
                />
            ) : null}

            <UIFlex align="center" gap={10} className={cx('controlsContainer')}>
                <FormSwitch
                    formProps={{}}
                    switchProps={{
                        style: { marginTop: 20 },
                        defaultChecked: data.enabled,
                        onChange: (e) =>
                            onChangeField(data.id as string, e, 'enabled'),
                        disabled: [eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        ),
                    }}
                />
                {data.enabled ? 'Включено' : 'Выключено'}
            </UIFlex>
        </UICard>
    );
};
