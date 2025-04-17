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
import { INCREMENT_LINK, OPTIONS_STAT_TYPES } from '@src/utils/constants';
import { UIButton } from '@components/_shared/Button';
import { eUserRoles } from '@src/redux/auth/auth';
import { LinkButton } from '@components/_shared/LinkButton';

type Props = {
    name: string;
    isLoaingUpdateStream: boolean;
    active: boolean;
    role: eUserRoles | null;
};

export const TabIncrementView: React.FC<Props> = ({ name, isLoaingUpdateStream, active, role }) => {
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
                    name: 'dmName',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                dmName
                            </UITitle>
                            <UITooltip title="Названия витрин, для которых нужно посчитать инкремент, через ';'">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[0].link}
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
                    placeholder: 'Введите dmName',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'minVfrom',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                minVfrom
                            </UITitle>
                            <UITooltip title="Минимальная временная отсечка для обрезки лишней истории">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[1].link}
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
                    placeholder: 'Введите minVfrom',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'statsTable',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                statsTable
                            </UITitle>
                            <UITooltip title="Путь до таблицы со статистиками">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[2].link}
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
                    placeholder: 'Введите statsTable',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'typeArcVal',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                typeArcVal
                            </UITitle>
                            <UITooltip title="Название режима архивации">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[3].link}
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
                    placeholder: 'Введите typeArcVal',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'bcSizeLimit',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                bcSizeLimit
                            </UITitle>
                            <UITooltip title="Максимальный размер инкремента, при котором все еще используется broadcast join">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[4].link}
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
                    placeholder: 'Введите bcSizeLimit',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'loadingType',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                loadingType
                            </UITitle>
                            <UITooltip title="Режим подсчета инкремента">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[5].link}
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
                    placeholder: 'Введите loadingType',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'cdcSchemaSnp',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                cdcSchemaSnp
                            </UITitle>
                            <UITooltip title="Схема снепшота результата">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[6].link}
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
                    placeholder: 'Введите cdcSchemaSnp',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'minLoadingId',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                minLoadingId
                            </UITitle>
                            <UITooltip title="Минимальный loading id">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[7].link}
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
                    placeholder: 'Введите minLoadingId',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'srcSchemaSnp',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                srcSchemaSnp
                            </UITitle>
                            <UITooltip title="Схема хранения снепшота целевой таблицы">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[8].link}
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
                    placeholder: 'Введите srcSchemaSnp',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'attrConfTable',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                attrConfTable
                            </UITitle>
                            <UITooltip title="Название таблицы с атрибутным составом используемых при расчете страниц">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[9].link}
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
                    placeholder: 'Введите attrConfTable',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'cdcSchemaHist',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                cdcSchemaHist
                            </UITitle>
                            <UITooltip title="Схема хиста результата">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[10].link}
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
                    placeholder: 'Введите cdcSchemaHist',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'settingsTable',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                settingsTable
                            </UITitle>
                            <UITooltip title="Название таблицы с настройками подсчета инкремента">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[11].link}
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
                    placeholder: 'Введите settingsTable',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'srcSchemaHist',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                srcSchemaHist
                            </UITitle>
                            <UITooltip title="Схема хранения хиста целевой таблицы">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[12].link}
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
                    placeholder: 'Введите srcSchemaHist',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'parallelDegree',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                parallelDegree
                            </UITitle>
                            <UITooltip title="Степень параллелизма">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[13].link}
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
                    placeholder: 'Введите parallelDegree',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'settingsExtTable',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                settingsExtTable
                            </UITitle>
                            <UITooltip title="Название необязательной таблицы с настройками">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[14].link}
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
                    placeholder: 'Введите settingsExtTable',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'settingsMartTable',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                settingsMartTable
                            </UITitle>
                            <UITooltip title="Название необязательной таблицы с настройками">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[15].link}
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
                    placeholder: 'Введите settingsMartTable',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'settingsReplTable',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                settingsReplTable
                            </UITitle>
                            <UITooltip title="Название необязательной таблицы с настройками">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[16].link}
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
                    placeholder: 'Введите settingsReplTable',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'createTableSettingsScript',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                createTableSettingsScript
                            </UITitle>
                            <UITooltip title="Путь к инициализационному скрипту создания и заполнения таблиц настроек модуля">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={INCREMENT_LINK[17].link}
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
                    placeholder: 'Введите createTableSettingsScript',
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
                    loading={isLoaingUpdateStream}
                    disabled={
                        isLoaingUpdateStream || [eUserRoles.BUISNESS].includes(role as eUserRoles)
                    }
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </div>
    );
};
