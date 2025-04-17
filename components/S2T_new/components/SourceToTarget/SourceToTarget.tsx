import { Divider, Form } from 'antd';
import React, { useCallback, useEffect } from 'react';

import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UIFormList } from '@components/_shared/Form/FormList';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import { SourceToTarget, TSourceTable, TTargetTable } from '@redux/s2t/s2t';

import styles from './styles.module.scss';

type Props = {
    data?: SourceToTarget[];
};

export const SourceTarget: React.FC<Props> = ({ data }) => {
    const cx = useStyles(styles);
    const form = Form.useFormInstance();

    useEffect(() => {
        if (data) {
            const { sourceArr, targetArr } = parseData(data);

            form.setFieldsValue({
                target_table: targetArr,
                source_table: sourceArr,
            });
        }
    }, [data]);

    const parseData = useCallback(
        (data: SourceToTarget[]) => {
            const sourceArr: TSourceTable[] = [];
            const targetArr: TTargetTable[] = [];

            data?.forEach((item) => {
                const { source_table, target_table } = item;

                sourceArr.push(source_table);
                targetArr.push(target_table);
            });

            return {
                sourceArr,
                targetArr,
            };
        },
        [data]
    );

    return (
        <UIFlex vertical>
            <UIFlex gap={40}>
                <div className={cx('leftContainer')}>
                    <UITitle level={3} className={cx('title')}>
                        Target Таблица
                    </UITitle>

                    <UIFormList
                        name="target_table"
                        noActions
                        initialValue={[]}
                        className={cx('list')}
                        renderData={(field) => (
                            <UIFlex wrap className={cx('content')}>
                                <FormInput
                                    formProps={{
                                        name: [field.name, 'scheme'],
                                        label: 'Схема',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Обязательное поле',
                                            },
                                        ],
                                        className: cx('item'),
                                    }}
                                    inputProps={{
                                        placeholder: 'Введите схему',
                                        size: 'large',
                                    }}
                                />

                                <FormInput
                                    formProps={{
                                        name: [field.name, 'name'],
                                        label: 'Имя',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Обязательное поле',
                                            },
                                        ],
                                        className: cx('item'),
                                    }}
                                    inputProps={{
                                        placeholder: 'Введите имя',
                                        size: 'large',
                                    }}
                                />
                            </UIFlex>
                        )}
                    />
                </div>

                <Divider type="vertical" className={cx('divider')} />

                <div className={cx('rightContainer')}>
                    <UITitle level={3} className={cx('title')}>
                        Source Таблица
                    </UITitle>

                    <UIFormList
                        name="source_table"
                        noActions
                        initialValue={[]}
                        className={cx('list')}
                        renderData={(field) => (
                            <UIFlex wrap className={cx('content')}>
                                <FormInput
                                    formProps={{
                                        name: [field.name, 'instance'],
                                        label: 'Инстанс',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Обязательное поле',
                                            },
                                        ],
                                        className: cx('item'),
                                    }}
                                    inputProps={{
                                        placeholder: 'Введите инстанс',
                                        size: 'large',
                                    }}
                                />

                                <FormInput
                                    formProps={{
                                        name: [field.name, 'name'],
                                        label: 'Имя',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Обязательное поле',
                                            },
                                        ],
                                        className: cx('item'),
                                    }}
                                    inputProps={{
                                        placeholder: 'Введите имя',
                                        size: 'large',
                                    }}
                                />

                                <FormInput
                                    formProps={{
                                        name: [field.name, 'platform'],
                                        label: 'Платформа',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Обязательное поле',
                                            },
                                        ],
                                        className: cx('item'),
                                    }}
                                    inputProps={{
                                        placeholder: 'Введите платформу',
                                        size: 'large',
                                    }}
                                />

                                <FormInput
                                    formProps={{
                                        name: [field.name, 'scheme'],
                                        label: 'Схема',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Обязательное поле',
                                            },
                                        ],
                                        className: cx('item'),
                                    }}
                                    inputProps={{
                                        placeholder: 'Введите схему',
                                        size: 'large',
                                    }}
                                />
                            </UIFlex>
                        )}
                    />
                </div>
            </UIFlex>
        </UIFlex>
    );
};
