import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UITitle } from '@components/_shared/Title';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITooltip } from '@components/_shared/Tooltip';
import { Icon } from '@components/_shared/Icon';
import { FormInputNumber } from '@components/_shared/Form/FormInputNumber';
import { UIFlex } from '@components/_shared/Flex';
import { UIFormList } from '@components/_shared/Form/FormList';
import { UIButton } from '@components/_shared/Button';
import { eUserRoles } from '@src/redux/auth/auth';
import { INCREMENT_LINK } from '@src/utils/constants';
import { LinkButton } from '@components/_shared/LinkButton';

type Props = {
    isLoading: boolean;
    role: eUserRoles | null;
};

export const IncrementView: React.FC<Props> = ({ isLoading, role }) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('content')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Модуль извлечения инкремента
            </UITitle>

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
                                to={INCREMENT_LINK[0].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите createTableSettingsScript',
                    size: 'large',
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
                                to={INCREMENT_LINK[1].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите settingsReplTable',
                    size: 'large',
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
                                to={INCREMENT_LINK[2].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите settingsMartTable',
                    size: 'large',
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
                                to={INCREMENT_LINK[3].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите settingsExtTable',
                    size: 'large',
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
                                to={INCREMENT_LINK[4].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите parallelDegree',
                    size: 'large',
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
                                to={INCREMENT_LINK[5].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите srcSchemaHist',
                    size: 'large',
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
                                to={INCREMENT_LINK[6].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите settingsTable',
                    size: 'large',
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
                                to={INCREMENT_LINK[7].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите cdcSchemaHist',
                    size: 'large',
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
                                to={INCREMENT_LINK[8].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите attrConfTable',
                    size: 'large',
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
                                to={INCREMENT_LINK[10].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите srcSchemaSnp',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInputNumber
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
                                to={INCREMENT_LINK[11].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите minLoadingId',
                    size: 'large',
                    style: { width: '100%' },
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
                                to={INCREMENT_LINK[12].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите cdcSchemaSnp',
                    size: 'large',
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
                                to={INCREMENT_LINK[13].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите loadingType',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />



            <FormInputNumber
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
                                to={INCREMENT_LINK[15].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите bcSizeLimit',
                    size: 'large',
                    style: { width: '100%' },
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
                                to={INCREMENT_LINK[16].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите typeArcVal',
                    size: 'large',

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
                                to={INCREMENT_LINK[17].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите statsTable',
                    size: 'large',
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
                                to={INCREMENT_LINK[18].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите minVfrom',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

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
                                to={INCREMENT_LINK[19].link}
                                target="_blank"
                                className={cx('iconWrapper')}
                            >
                                <Icon
                                    type="confluence"
                                    size="xs"
                                    className={cx('icon')}
                                />
                            </LinkButton>
                        </div>
                    ),
                }}
                inputProps={{
                    placeholder: 'Введите dmName',
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
                name="sparkEngineParams"
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
                    size="large"
                    className={cx('btn')}
                    loading={isLoading}
                    disabled={isLoading || [eUserRoles.BUISNESS].includes(role as eUserRoles)}
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </div>
    );
};
