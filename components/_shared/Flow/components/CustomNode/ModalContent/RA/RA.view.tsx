import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UITitle } from '@components/_shared/Title';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITooltip } from '@components/_shared/Tooltip';
import { Icon } from '@components/_shared/Icon';
import { UIFlex } from '@components/_shared/Flex';
import { UIFormList } from '@components/_shared/Form/FormList';
import { UIButton } from '@components/_shared/Button';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { OPTIONS_BOOLEANS } from '@src/utils/constants';
import { eUserRoles } from '@src/redux/auth/auth';
import { RA_LINK } from '@src/utils/constants';
import { LinkButton } from '@components/_shared/LinkButton';

type Props = {
    isLoading: boolean;
    role: eUserRoles | null;
};

export const RAView: React.FC<Props> = ({ isLoading, role }) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('content')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Модуль перемещения данных в PA
            </UITitle>

            <FormInput
                formProps={{
                    name: 'truncateFilterList',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                truncateFilterList
                            </UITitle>
                            <UITooltip title="Перечисление партиций из PA, которые будут предварительно удалены перед перемещением партиций из STG">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={RA_LINK[0].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите truncateFilterList',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormSelect
                formProps={{
                    name: 'truncateStgFromPa',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                truncateStgFromPa
                            </UITitle>
                            <UITooltip title="Флаг удаления данных из PA перед перемещением.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={RA_LINK[1].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                selectProps={{
                    placeholder: 'Введите truncateStgFromPa',
                    size: 'large',
                    options: OPTIONS_BOOLEANS,
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'compressionType',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                compressionType
                            </UITitle>
                            <UITooltip title="Тип сжатия">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={RA_LINK[2].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите compressionType',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{

                    name: 'instanceFilter',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                instanceFilter
                            </UITitle>
                            <UITooltip title="Условие для предварительной фильтрации партиций, к которым будет применен truncateFilterList">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={RA_LINK[3].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите instanceFilter',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 's2tTableList',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                s2tTableList
                            </UITitle>
                            <UITooltip title="Перечисление таблиц через точку с запятой в формате 'ТаблицаИсточник->ТаблицаПриемник'">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={RA_LINK[4].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите s2tTableList',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'tgtSchema',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                tgtSchema
                            </UITitle>
                            <UITooltip title="Название схемы приемника в hive">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={RA_LINK[5].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите tgtSchema',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'srcSchema',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                srcSchema
                            </UITitle>
                            <UITooltip title="Название схемы источника в hive">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={RA_LINK[6].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите srcSchema',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'workMode',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                workMode
                            </UITitle>
                            <UITooltip title="Режим работы алгоритма перезаписи">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={RA_LINK[7].link}
                                target="_blank"
                            >
                                <Icon
                                    className={cx('icon')}
                                    type="confluence"
                                    size="md"
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите workMode',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

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

            <UIFlex
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
            </UIFlex>

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

                        <Icon
                            type="right-outlined"
                            className={cx('icon')}
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
                    type="primary"
                    htmlType="submit"
                    className={cx('btn')}
                    size="large"
                    loading={isLoading}
                    disabled={isLoading || [eUserRoles.BUISNESS].includes(role as eUserRoles)}
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </div>
    );
};
