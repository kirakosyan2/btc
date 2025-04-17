import { UIFlex } from '@components/_shared/Flex';
import React from 'react';
import { CardStatistic } from '../CardStatistic';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UIButton } from '@components/_shared/Button';
import { OPTIONS_DQC } from '@src/utils/constants';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { Icon } from '@components/_shared/Icon';
import { UITooltip } from '@components/_shared/Tooltip';
import { NormStatistics } from '@src/redux/DQC/DQC';
import { UITitle } from '@components/_shared/Title';
import { eUserRoles } from '@src/redux/auth/auth';

type Props = {
    data: NormStatistics[];
    role: eUserRoles | null;
    isLoadingUpdate: boolean;
    removeStatistic: (value: string) => void;
    onChangeField: (id: string, value: string | boolean, field: string) => void;
    onSubmit: () => void;
};

export const StaticContentView: React.FC<Props> = ({
    data,
    role,
    isLoadingUpdate,
    removeStatistic,
    onChangeField,
    onSubmit,
}) => {
    const cx = useStyles(styles);

    return (
        <UIFlex
            vertical
            gap={40}
            className={cx('container')}
        >
            <FormSelect
                formProps={{
                    name: 'type',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                Тип статистики
                            </UITitle>
                            <UITooltip title="Выберите статистику из списка ниже">
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
                    className: cx('containerItem'),
                }}
                selectProps={{
                    size: 'large',
                    options: OPTIONS_DQC,
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <UIFlex justify="center">
                <UIButton
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                >
                    Добавить статистику
                </UIButton>
            </UIFlex>

            {data.map((item) => (
                <CardStatistic
                    data={item}
                    role={role}
                    remove={() => removeStatistic?.(item?.id as string)}
                    onChangeField={onChangeField}
                />
            ))}

            <UIFlex justify="center">
                <UIButton
                    className={cx('btn')}
                    size="large"
                    type="primary"
                    onClick={onSubmit}
                    loading={isLoadingUpdate}
                    disabled={isLoadingUpdate || [eUserRoles.BUISNESS].includes(role as eUserRoles)}
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </UIFlex>
    );
};
