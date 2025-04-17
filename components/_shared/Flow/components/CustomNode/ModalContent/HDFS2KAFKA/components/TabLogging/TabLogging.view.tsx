import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormSwitch } from '@components/_shared/Form/FormSwitch';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

export const TabLoggingView: React.FC = () => {
    const cx = useStyles(styles);

    return (
        <UIFlex vertical>
            <FormInput
                formProps={{
                    name: 'logTableName',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Название таблицы логов
                            </UITitle>
                            <UITooltip title={`например: "contract_logging"`}>
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
                    placeholder: 'Введите logTableName',
                    size: 'large',
                }}
            />

            <FormInput
                formProps={{
                    name: 'logSchemaName',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Схема таблицы логов
                            </UITitle>
                            <UITooltip
                                title={`Схема, в которую записать таблицу логов (например, "custom_b2c_sql_fw_stg")`}>
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
                    placeholder: 'Введите logSchemaName',
                    size: 'large',
                }}
            />

            <FormInput
                formProps={{
                    name: 'kafkaLogComment',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Комментарий к логу
                            </UITitle>
                            <UITooltip
                                title={`Добавляется как отдельная колонка к таблице логов`}>
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
                    placeholder: 'Введите kafkaLogComment',
                    size: 'large',
                    readOnly: true,
                }}
            />

            <FormSwitch
                formProps={{
                    name: 'shouldRecreateTable',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Очистить ли таблицу логов
                            </UITitle>
                            <UITooltip
                                title={`Для случая, когда требуется очистить таблицу`}>
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                        </div>
                    ),
                }}
            />

            <UIFlex justify="center">
                <UIButton
                    size="large"
                    htmlType="submit"
                    className={cx('btn')}
                    type="primary">
                    Сохранить настройки логирования результатов записи
                </UIButton>
            </UIFlex>
        </UIFlex>
    );
};
