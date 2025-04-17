import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UIFormList } from '@components/_shared/Form/FormList';
import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITooltip } from '@components/_shared/Tooltip';
import { Icon } from '@components/_shared/Icon';
import { eUserRoles } from '@src/redux/auth/auth';
import { UITitle } from '@components/_shared/Title';

type Props = {
    isLoadingUpdateSpark: boolean;
    role: eUserRoles | null;
};

export const TabSparkView: React.FC<Props> = ({ isLoadingUpdateSpark, role }) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('container')}>
            <div className={cx('tooltipContainer')}>
                <UITitle
                    level={5}
                    className={cx('text')}
                >
                    Spark Engine Params
                </UITitle>
                <UITooltip title="Параметры движка spark">
                    <span>
                        <Icon
                            type="question-circle-outlined"
                            size="xs"
                        />
                    </span>
                </UITooltip>
            </div>

            <UIFormList
                name="spark_engine_params"
                className={cx('formList')}
                initialValue={[]}
                disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                renderData={(field) => (
                    <UIFlex
                        className={cx('formListContent')}
                        gap={40}
                    >
                        <FormInput
                            formProps={{
                                name: [field.name, 'key'],
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
                                placeholder: 'Ключ',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />

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
                                placeholder: 'Введите значение',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />
                    </UIFlex>
                )}
            />

            <UIFlex
                justify="center"
                className={cx('containerBtn')}
            >
                <UIButton
                    className={cx('btn')}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingUpdateSpark}
                    disabled={
                        isLoadingUpdateSpark || [eUserRoles.BUISNESS].includes(role as eUserRoles)
                    }
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </div>
    );
};
