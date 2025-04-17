import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

export const TabHDFSView: React.FC = () => {
    const cx = useStyles(styles);

    return (
        <UIFlex vertical>
            <FormInput
                formProps={{
                    name: 'tableName',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Название целевой таблицы
                            </UITitle>
                            <UITooltip
                                title={`Таблица создаётся модулем автоматически`}>
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
                    placeholder: 'Введите tableName',
                    size: 'large',
                }}
            />

            <FormInput
                formProps={{
                    name: 'schemaName',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Схема целевой таблицы
                            </UITitle>
                            <UITooltip
                                title={`Таблица создаётся модулем автоматически`}>
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
                    placeholder: 'Введите schemaName',
                    size: 'large',
                }}
            />

            <FormInput
                formProps={{
                    name: 'tableFormat',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Тип целевой таблицы
                            </UITitle>
                            <UITooltip
                                title={`На текущий момент константа "hive"`}>
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
                    placeholder: 'Введите tableFormat',
                    size: 'large',
                }}
            />

            <FormInput
                formProps={{
                    name: 'columnNameWithDate',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Поле с датой в сообщении из Kafka
                            </UITitle>
                            <UITooltip
                                title={`В большинстве случаев константа "kafka_timestamp"`}>
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
                    placeholder: 'Введите columnNameWithDate',
                    size: 'large',
                }}
            />

            <FormInput
                formProps={{
                    name: 'columnNameForPartition',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Название колонки партиционирования в целевой
                                таблице
                            </UITitle>
                            <UITooltip
                                title={`Как будет называться поле партиционирования в целевой таблице, формируется на основе поля выше (columnNameWithDate) с паттерном (partitionFormat). Например, "part_date"`}>
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
                    placeholder: 'Введите columnNameForPartition',
                    size: 'large',
                }}
            />

            <FormInput
                formProps={{
                    name: 'partitionFormat',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Формат поля партиционирования в целевой таблице
                            </UITitle>
                            <UITooltip
                                title={`Определяет формат поля, указанного в columnNameForPartition. Например, "yyyy-MM-dd"`}>
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
                    placeholder: 'Введите partitionFormat',
                    size: 'large',
                }}
            />

            <FormInput
                formProps={{
                    name: 'partitionType',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Тип поля партиционирования
                            </UITitle>
                            <UITooltip
                                title={`Тип поля партиционирования в целевой таблице (например: string, int, timestamp)`}>
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
                    placeholder: 'Введите partitionFormat',
                    size: 'large',
                }}
            />

            <FormInput
                formProps={{
                    name: 'checkPointLocation',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Директория для сохранения чекпоинтов
                            </UITitle>
                            <UITooltip
                                title={`Путь в HDFS, куда сохранять данные чекпоинтов, для возможности восстановления при падении (например, "/tmp/my_custom_process/kafka2hdfs/checkpoint")`}>
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
                    placeholder: 'Введите checkPointLocation',
                    size: 'large',
                }}
            />

            <UIFlex justify="center">
                <UIButton
                    size="large"
                    htmlType="submit"
                    type="primary"
                    className={cx('btn')}>
                    Сохранить настройки процесса записи данных в таблицу
                </UIButton>
            </UIFlex>
        </UIFlex>
    );
};
