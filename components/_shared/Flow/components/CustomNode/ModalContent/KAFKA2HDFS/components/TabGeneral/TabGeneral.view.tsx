import React, { useMemo } from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInputNumber } from '@components/_shared/Form/FormInputNumber';
import { FormRadioGroup } from '@components/_shared/Form/FormRadioGroup/FormRadioGroup';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITypography } from '@components/_shared/Typography';

// import { UIRadioGroup } from '@components/_shared/RadioGroup';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
    types: string[];
};

const TITLES: Record<string, string> = {
    no_termination:
        'Режим стриминга - никогда не завершаться, фактически режим стриминга. Завершается только при ручной остановке потока или ошибке',
    process_available_and_stop:
        'Обработать и сразу завершиться - Модуль продолжает работу до тех пор, пока есть данные в топике. Новые данные, поступившие после запуска модуля, также будут обработаны. Как только последнее сообщение будет прочитано из топика, модуль завершит работу',
};

export const TabGeneralView: React.FC<Props> = ({ types }) => {
    const cx = useStyles(styles);

    const streamTitles = useMemo(
        () =>
            types.map((type) => (
                <UITypography className={cx('streamHint')}>
                    {TITLES[type]}
                </UITypography>
            )),
        [types]
    );

    return (
        <UIFlex vertical>
            <FormInputNumber
                formProps={{
                    name: 'processingTime',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Время ожидания
                            </UITitle>
                            <UITooltip
                                title={`Время в секундах, в течение которого будет собираться новый батч сообщений для обработки. Как только время выйдет, батч будет сохранён в таблицу, и будет запущен сбор сообщений для нового батча`}>
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
                    placeholder: 'Введите processingTime',
                    size: 'large',
                    className: cx('item'),
                }}
            />

            <FormInputNumber
                formProps={{
                    name: 'timeoutSec',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Секунд после запуска модуля
                            </UITitle>
                            <UITooltip title={`Секунд после запуска модуля`}>
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
                    placeholder: 'Введите timeoutSec',
                    size: 'large',
                    className: cx('item'),
                }}
            />

            <FormRadioGroup
                formProps={{
                    name: 'type',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle level={5} className={cx('text')}>
                                Режимы стриминга
                            </UITitle>
                            <UITooltip title={streamTitles}>
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                        </div>
                    ),
                    rules: [{ required: true }],
                }}
                options={types}
            />

            <UIFlex justify="center">
                <UIButton
                    size="large"
                    htmlType="submit"
                    className={cx('btn')}
                    type="primary">
                    Сохранить общие настройки модуля
                </UIButton>
            </UIFlex>
        </UIFlex>
    );
};
