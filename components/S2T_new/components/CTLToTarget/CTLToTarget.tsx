import { Divider, Form } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';

import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UIFormList } from '@components/_shared/Form/FormList';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import { CTLToTarget, TTargetTable } from '@src/redux/s2t/s2t';
import { useCtlListQuery } from '@src/redux/showcases/showcase';

import styles from './styles.module.scss';

type Props = {
    data?: CTLToTarget[];
    currDatamart?: string;
};

export const CTLTarget: React.FC<Props> = ({ data, currDatamart }) => {
    const cx = useStyles(styles);
    const form = Form.useFormInstance();

    // Query
    const { data: ctlList } = useCtlListQuery(currDatamart as string, {
        skip: !currDatamart,
    });

    useEffect(() => {
        if (data) {
            const { target, ctlIds } = parseData(data);

            form.setFieldsValue({
                ctl_target: target,
                ctls: ctlIds,
            });
        }
    }, [data]);

    const parseData = useCallback(
        (data: CTLToTarget[]) => {
            const target: TTargetTable[] = [];
            const ctlIds: string[] = [];

            data?.forEach((item) => {
                const { target_table, ctl_id } = item;

                target.push(target_table);
                ctlIds.push(ctl_id);
            });

            return {
                target,
                ctlIds,
            };
        },
        [data]
    );

    const normCTLList = useMemo(
        () =>
            ctlList?.length
                ? ctlList.map((item) => ({
                      label: String(item.entity_id),
                      value: String(item.entity_id),
                  }))
                : [],
        [ctlList]
    );

    return (
        <UIFlex vertical>
            <UIFlex gap={40}>
                <div className={cx('leftContainer')}>
                    <UITitle level={3} className={cx('title')}>
                        Target Таблица
                    </UITitle>

                    <UIFormList
                        name="ctl_target"
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
                        CTL сущность
                    </UITitle>

                    <UIFormList
                        name="ctls"
                        noActions
                        initialValue={[]}
                        className={cx('list')}
                        renderData={(field) => (
                            <UIFlex wrap className={cx('content')}>
                                <FormSelect
                                    formProps={{
                                        name: [field.name, 'ctl'],
                                        label: 'CTL',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Обязательное поле',
                                            },
                                        ],
                                        className: cx('itemFull'),
                                    }}
                                    selectProps={{
                                        placeholder: 'Выберите CTL',
                                        size: 'large',
                                        options: normCTLList,
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
