import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { CollapseProps, Flex, FormInstance } from 'antd';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITooltip } from '@components/_shared/Tooltip';
import { Icon } from '@components/_shared/Icon';
import { UIFormList } from '@components/_shared/Form/FormList';
import { UITitle } from '@components/_shared/Title';
import { FormTextArea } from '@components/_shared/Form/FormTextArea/FormTextArea';
import { CardSpark } from '../CardSpark';
import { UICollapse } from '@components/_shared/Collapse';
import { UIButton } from '@components/_shared/Button';
import { DEFAULT_PRESETS } from '@src/utils/constants';
import { eUserRoles } from '@src/redux/auth/auth';

type Props = {
    form: FormInstance<any>;
    isLoadingCluster: boolean;
    role: eUserRoles | null;
};

export const ClusterItemView: React.FC<Props> = ({ form, isLoadingCluster, role }) => {
    const cx = useStyles(styles);

    const selectedPreset = (value: string) => {
        return () => {
            form.setFieldsValue({
                resourse: value?.trim(),
            });
        };
    };

    const items: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: 'Пресеты вычислительных ресурсов',
                children: (
                    <div className={cx('cardsSparkContainer')}>
                        {DEFAULT_PRESETS.map((item) => (
                            <CardSpark
                                key={item.id}
                                description={item.description}
                                label={item.label}
                                onClick={selectedPreset(item.description)}
                            />
                        ))}
                    </div>
                ),
            },
        ],
        [],
    );

    return (
        <div className={cx('container')}>
            <Flex
                className={cx('content')}
                vertical
            >
                <FormInput
                    formProps={{
                        name: 'ctl',
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITitle
                                    level={5}
                                    className={cx('text')}
                                >
                                    CTL профиль
                                </UITitle>
                                <UITooltip title="Профиль определяет набор параметров для запуска потока на конкретном кластере например OOZIE URL, SberETL URL, и.т.д. ">
                                    <span>
                                        <Icon
                                            className={cx('icon')}
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
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите CTL профиль',
                        size: 'large',
                        disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    }}
                />

                <FormInput
                    formProps={{
                        name: 'yarn',
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITitle
                                    className={cx('text')}
                                    level={5}
                                >
                                    Очередь YARN
                                </UITitle>
                                <UITooltip title="Очередь в YARN">
                                    <span>
                                        <Icon
                                            className={cx('icon')}
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
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите очередь YARN',
                        size: 'large',
                        disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    }}
                />

                <FormInput
                    formProps={{
                        name: 'realm',
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITitle
                                    className={cx('text')}
                                    level={5}
                                >
                                    Realm
                                </UITitle>
                                <UITooltip title="Realm">
                                    <span>
                                        <Icon
                                            className={cx('icon')}
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
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите Realm',
                        size: 'large',
                        disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'tuz_prefix',
                        label: (
                            <div className={cx('tooltipContainer')}>
                                <UITitle
                                    className={cx('text')}
                                    level={5}
                                >
                                    Префикс ТУЗа
                                </UITitle>
                                <UITooltip title="Прейфикс, который будет применен к логическому имени ТУЗа на данном кластере">
                                    <span>
                                        <Icon
                                            className={cx('icon')}
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
                        className: cx('contentItem'),
                    }}
                    inputProps={{
                        placeholder: 'Введите Realm',
                        size: 'large',
                        disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    }}
                />
            </Flex>

            <UITitle
                level={5}
                className={cx('text')}
            >
                Источники (source)
                <UITooltip title="Источники для кластера">
                    <span>
                        <Icon
                            className={cx('icon-source')}
                            type="question-circle-outlined"
                            size="xs"
                        />
                    </span>
                </UITooltip>
            </UITitle>

            <Flex
                align="center"
                justify="space-between"
                className={cx('containerTitles')}
            >
                <UITitle
                    level={4}
                    className={cx('title')}
                >
                    Ключ
                </UITitle>
                <UITitle
                    level={4}
                    className={cx('title')}
                >
                    Значение
                </UITitle>
            </Flex>

            <UIFormList
                name="source_tables"
                className={cx('formList')}
                initialValue={[]}
                classNameAddIcon={cx('formListAddIcon')}
                disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                renderData={(field) => (
                    <Flex
                        gap={40}
                        className={cx('formListContent')}
                    >
                        <FormInput
                            formProps={{
                                name: [field.name, 'key'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('formListItem'),
                            }}
                            inputProps={{
                                placeholder: 'Введите ключ',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />

                        <FormInput
                            formProps={{
                                name: [field.name, 'value'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('formListItem'),
                            }}
                            inputProps={{
                                placeholder: 'Введите значение',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />
                    </Flex>
                )}
            />

            <FormTextArea
                formProps={{
                    name: 'base',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                Основные
                            </UITitle>
                            <UITooltip title="Основные параметры spark, которые будут применены вне зависимости от сложности витрины (spark_submit_cmd_main)">
                                <span>
                                    <Icon
                                        className={cx('icon')}
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
                            // TODO: посмотреть, почему строка не обрезается
                            // transform: (value: string) => value?.trim(),
                        },
                    ],
                }}
                textAreaProps={{
                    placeholder: 'Введите основные параметры Spark',
                    size: 'large',
                    className: cx('textArea'),
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <UITitle
                level={5}
                className={cx('text')}
                style={{ marginBottom: '10px' }}
            >
                Вычислительные ресурсы
                <UITooltip title="Вычислительные ресурсы spark применяются в зависимости от сложножности витрины. Выберите пресет сложности витрнины, нажав на 'Пресеты вычислителных ресурсов', необходимые параметры подставляются автоматически. Также вы можете самостоятельно заполнить параметры в поле ниже.">
                    <span>
                        <Icon
                            type="question-circle-outlined"
                            size="xs"
                        />
                    </span>
                </UITooltip>
            </UITitle>

            <UICollapse items={items} />

            <FormTextArea
                formProps={{
                    name: 'resourse',
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                }}
                textAreaProps={{
                    className: cx('textArea', 'textareaView'),
                    placeholder: 'Заполните вычислительный ресурс',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />
            <Flex justify="center">
                <UIButton
                    className={cx('btn')}
                    size="large"
                    htmlType="submit"
                    type="primary"
                    loading={isLoadingCluster}
                    disabled={
                        isLoadingCluster || [eUserRoles.BUISNESS].includes(role as eUserRoles)
                    }
                >
                    Сохранить
                </UIButton>
            </Flex>
        </div>
    );
};
