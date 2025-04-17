import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { FormSwitch } from '@components/_shared/Form/FormSwitch';
import { UITypography } from '@components/_shared/Typography';
import { UITitle } from '@components/_shared/Title';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITooltip } from '@components/_shared/Tooltip';
import { Icon } from '@components/_shared/Icon';
import { UIFormList } from '@components/_shared/Form/FormList';
import { UIFlex } from '@components/_shared/Flex';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { HISTORY_LINK, OPTIONS_STAT_TYPES } from '@src/utils/constants';
import { UIButton } from '@components/_shared/Button';
import { eUserRoles } from '@src/redux/auth/auth';
import { LinkButton } from '@components/_shared/LinkButton';

type Props = {
    name: string;
    isLoadingUpdate: boolean;
    active: boolean;
    role: eUserRoles | null;
};

export const TabHistoryView: React.FC<Props> = ({ name, isLoadingUpdate, active, role }) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('container')}>
            <UITitle level={3}>{name}</UITitle>

            <UITypography className={cx('switchLabel')}>
                <FormSwitch
                    formProps={{
                        name: 'enabled',
                        style: {
                            marginBottom: 0,
                        },
                    }}
                    switchProps={{
                        disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    }}
                />

                {active ? 'Включено' : 'Выключено'}
            </UITypography>

            <FormInput
                formProps={{
                    name: 'snpFilter',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                snpFilter
                            </UITitle>
                            <UITooltip title="Будет заменён (WIP). На текущий момент — SQL-выражение для фильтрации SNP перед началом работы алгоритма, нужно для оптимизации">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[0].link}
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
                    size: 'large',
                    placeholder: 'Введите snpFilter',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'targetName',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                targetName
                            </UITitle>
                            <UITooltip title="Определяет название целевых таблиц (для SNP — '*targetName*_snp' в PA, для HIST — '*targetName*_hist' в HIST)">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[1].link}
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
                    size: 'large',
                    placeholder: 'Введите targetName',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'hashColumns',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                hashColumns
                            </UITitle>
                            <UITooltip title="Список полей таблицы-источника, по которым считать хеш для алгоритма">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>

                            <LinkButton
                                to={HISTORY_LINK[2].link}
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
                    size: 'large',
                    placeholder: 'Введите hashColumns',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'loadingMode',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                loadingMode
                            </UITitle>
                            <UITooltip title="Режим загрузки (WIP)">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[3].link}
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
                    size: 'large',

                    placeholder: 'Введите loadingMode',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'sourceQuery',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                sourceQuery
                            </UITitle>
                            <UITooltip title="SQL-запрос для формирования таблицы-источника (альтернатива параметру sourceTable)">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[4].link}
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
                    size: 'large',

                    placeholder: 'Введите sourceQuery',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'sourceTable',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                sourceTable
                            </UITitle>
                            <UITooltip title="Название таблицы-источника (может содержать как полный срез, так и инкремент)">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[5].link}
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
                    size: 'large',

                    placeholder: 'Введите sourceTable',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'businessKeys',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                businessKeys
                            </UITitle>
                            <UITooltip title="Список бизнес-ключей таблицы-источника через запятую">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[6].link}
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
                    size: 'large',

                    placeholder: 'Введите businessKeys',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'historyColumns',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                historyColumns
                            </UITitle>
                            <UITooltip title="Список полей, задающих бизнес-историю в таблице-источнике">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[7].link}
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
                    size: 'large',

                    placeholder: 'Введите historyColumns',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'customTargetSnp',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                customTargetSnp
                            </UITitle>
                            <UITooltip title="Название целевой тацблицы SNP (если не устраивает по умолчанию)">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[8].link}
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
                    size: 'large',

                    placeholder: 'Введите customTargetSnp',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'customTargetHist',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                customTargetHist
                            </UITitle>
                            <UITooltip title="Название целевой тацблицы HIST (если не устраивает по умолчанию)">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[9].link}
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
                    size: 'large',

                    placeholder: 'Введите customTargetHist',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'deletedFlagColumn',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                deletedFlagColumn
                            </UITitle>
                            <UITooltip title="Нужно только для инкрементальных режимов, определяет название поля источника с индикатором удаленной записи">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[10].link}
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
                    size: 'large',

                    placeholder: 'Введите deletedFlagColumn',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'targetHashColName',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                targetHashColName
                            </UITitle>
                            <UITooltip title="Название поля с хешем (посчитанном по колонкам hashColumns)">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={HISTORY_LINK[11].link}
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
                    size: 'large',
                    placeholder: 'Введите targetHashColName',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <div
                className={cx('tooltipContainer')}
                style={{
                    marginBottom: '20px',
                }}
            >
                <UITitle
                    level={5}
                    className={cx('text')}
                >
                    Statistic Publish
                </UITitle>
                <UITooltip title="Параметры для публикации статистик">
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
                className={cx('containerTexts')}
            >
                <UITitle
                    level={5}
                    className={cx('text')}
                >
                    StatId
                    <UITooltip title="Номер сущности">
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                size="xs"
                            />
                        </span>
                    </UITooltip>
                </UITitle>
                <UITitle
                    level={5}
                    className={cx('text')}
                >
                    EntityId
                    <UITooltip title="Номер статистики">
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                size="xs"
                            />
                        </span>
                    </UITooltip>
                </UITitle>
                <UITitle
                    level={5}
                    className={cx('text')}
                >
                    StatValue
                    <UITooltip title="В зависимости от statValueType либо просто строка со значением для публикации, либо название переменной контекста, значение которой хотим опубликовать">
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                size="xs"
                            />
                        </span>
                    </UITooltip>
                </UITitle>
                <UITitle
                    level={5}
                    className={cx('text')}
                >
                    StatValueType
                    <UITooltip
                        title={`Тип значения переменной statValue: "constant" если строка, "variable" если название переменной`}
                    >
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                size="xs"
                            />
                        </span>
                    </UITooltip>
                </UITitle>
            </UIFlex>

            <UIFormList
                name="publishStats"
                initialValue={[]}
                className={cx('formList')}
                disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                renderData={(field) => (
                    <UIFlex
                        gap={10}
                        className={cx('formListContent')}
                    >
                        <FormInput
                            formProps={{
                                name: [field.name, 'StatId'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите StatId',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />

                        <FormInput
                            formProps={{
                                name: [field.name, 'EntityId'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите EntityId',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />

                        <FormInput
                            formProps={{
                                name: [field.name, 'StatValue'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите StatValue',
                                size: 'large',
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />

                        <FormSelect
                            formProps={{
                                name: [field.name, 'StatValueType'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            selectProps={{
                                placeholder: 'Выберите StatValueType',
                                size: 'large',
                                options: OPTIONS_STAT_TYPES,
                                disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                            }}
                        />
                    </UIFlex>
                )}
            />

            <UIFlex justify="center">
                <UIButton
                    className={cx('btn')}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingUpdate}
                    disabled={isLoadingUpdate || [eUserRoles.BUISNESS].includes(role as eUserRoles)}
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </div>
    );
};
