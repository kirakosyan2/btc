import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UIFormList } from '@components/_shared/Form/FormList';
import { FormSQLEditor } from '@components/_shared/Form/FormSQLEditor';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';

import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';

import styles from './styles.module.scss';

type Props = {
    threadId: string;
    onClose: () => void;
    role: eUserRoles | null;
};

export const HDFS2KAFKAView: React.FC<Props> = ({ role }) => {
    const cx = useStyles(styles);
    return (
        <div className={cx('container')}>
            <UITitle level={3} className={cx('title')}>
                Модуль HDSF2KAFKA
            </UITitle>

            <FormSQLEditor
                formProps={{
                    name: 'sql_script',
                }}
            />

            <div className={cx('tooltipContainer')}>
                <UITitle level={5} className={cx('text')}>
                    Spark Engine Params
                </UITitle>
                <UITooltip title="Параметры движка spark">
                    <span>
                        <Icon type="question-circle-outlined" size="xs" />
                    </span>
                </UITooltip>
            </div>

            <UIFlex
                align="center"
                justify="space-between"
                className={cx('containerTitles')}>
                <UITitle level={4} className={cx('title')}>
                    Ключ
                </UITitle>
                <UITitle level={4} className={cx('title')}>
                    Значение
                </UITitle>
            </UIFlex>

            <UIFormList
                name="sparkEngineParams"
                initialValue={[{}]}
                className={cx('formList')}
                disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                renderData={(field) => (
                    <UIFlex className={cx('formListContent')} gap={40}>
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
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />

                        <Icon type="right-outlined" className={cx('icon')} />

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
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </UIFlex>
                )}
            />

            <UIFlex justify="center" className={cx('containerBtn')}>
                <UIButton
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className={cx('btn')}
                    // loading={isLoading}
                    // disabled={isLoading || [eUserRoles.BUISNESS].includes(role as eUserRoles)}
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </div>
    );
};
