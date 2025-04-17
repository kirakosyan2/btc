import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

export const TabLoggingView: React.FC = () => {
    const cx = useStyles(styles);

    return (
        <UIFlex vertical>
            <FormInput
                formProps={{
                    name: 'modeKafkaLogging',
                    label: 'ModeKafkaLogging',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                inputProps={{
                    placeholder: 'Введите modeKafkaLogging',
                    size: 'large',
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
