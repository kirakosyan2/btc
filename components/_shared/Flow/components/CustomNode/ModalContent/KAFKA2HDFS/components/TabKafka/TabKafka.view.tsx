import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
// import { FormInputNumber } from '@components/_shared/Form/FormInputNumber';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

export const TabKafkaView: React.FC = () => {
    const cx = useStyles(styles);

    return (
        <UIFlex vertical>
            <FormInput
                formProps={{
                    name: 'topic',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Топик
                            </UITitle>
                            <UITooltip
                                title={`Топик, из которого нужно читать данные (например, "PRF248LA.CONTRACTCREATEDUPDATEDEVENT.V1")`}>
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
                    placeholder: 'Введите topic',
                    size: 'large',
                }}
            />

            {/* <FormInputNumber
                formProps={{
                    name: 'msgPerSecond',
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
                    placeholder: 'Введите msgPerSecond',
                    size: 'large',
                    style: {
                        width: '100%',
                    },
                }}
            /> */}

            <FormInput
                formProps={{
                    name: 'kafkaConfigPath',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Конфиг для Kafka
                            </UITitle>
                            <UITooltip
                                title={` Путь до файла со стандартными параметрами Kafka (будет проставляться автоматически, TBD)`}>
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
                    placeholder: 'Введите kafkaConfigPath',
                    size: 'large',
                    disabled: true,
                    readOnly: true,
                }}
            />

            <FormInput
                formProps={{
                    name: 'secmanConfigPath',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Конфиг для взаимодействия с Secman
                            </UITitle>
                            <UITooltip
                                title={`Используется для взаимодействия с Kafka (будет проставляться автоматически, TBD)`}>
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
                    placeholder: 'Введите secmanConfigPath',
                    size: 'large',
                    disabled: true,
                    readOnly: true,
                }}
            />

            <UIFlex justify="center">
                <UIButton
                    size="large"
                    htmlType="submit"
                    className={cx('btn')}
                    type="primary">
                    Сохранить настройки процесса чтения данных из Kafka
                </UIButton>
            </UIFlex>
        </UIFlex>
    );
};
