import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormSQLEditor } from '@components/_shared/Form/FormSQLEditor';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

export const TabSourceView: React.FC = () => {
    const cx = useStyles(styles);

    return (
        <UIFlex vertical>
            <FormSQLEditor
                formProps={{
                    name: 'sourceSql',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                SQL-скрипт
                            </UITitle>
                            <UITooltip
                                title={`Скрипт для отбора данных, необходимых для отправки в Kafka. Обязательно должен возвращать поле с ключом и поле с JSON-значением (например, "client_id" и "result_json")`}>
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
            />

            <FormInput
                formProps={{
                    name: 'sourceKeyColumn',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Название поля с ключом
                            </UITitle>
                            <UITooltip
                                title={`Определяет распределение строк по партициям топика Kafka (например, "client_id")`}>
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
                    placeholder: 'Введите sourceKeyColumn',
                }}
            />

            <FormInput
                formProps={{
                    name: 'sourceJsonValueColumn',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Название поля с JSON-значением
                            </UITitle>
                            <UITooltip
                                title={`Строка, которую нужно записать в Kafka, сериализованная в формате JSON-строки (например, "result_json")`}>
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
                    placeholder: 'Введите sourceJsonValueColumn',
                }}
            />

            <UIFlex justify="center">
                <UIButton
                    size="large"
                    htmlType="submit"
                    className={cx('btn')}
                    type="primary">
                    Сохранить настройки процесса чтения данных для модуля
                </UIButton>
            </UIFlex>
        </UIFlex>
    );
};
