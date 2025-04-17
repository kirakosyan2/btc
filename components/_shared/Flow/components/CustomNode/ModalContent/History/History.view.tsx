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
import { eUserRoles } from '@src/redux/auth/auth';
import { HISTORY_LINK } from '@src/utils/constants';
import { LinkButton } from '@components/_shared/LinkButton';

type Props = {
    isLoading: boolean;
    role: eUserRoles | null;
};

export const HistoryView: React.FC<Props> = ({ isLoading, role }) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('content')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Модуль формирования историчности
            </UITitle>

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
                    placeholder: 'Введите targetHashColName',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />
            <FormInput
                formProps={{
                    name: 'deletedFlagColumn',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                className={cx('text')}
                                level={5}
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
                    placeholder: 'Введите deletedFlagColumn',
                    size: 'large',
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
                            <UITooltip title="Название целевой таблицы HIST (если не устраивает по умолчанию)">
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
                    placeholder: 'Введите customTargetHist',
                    size: 'large',
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
                            <UITooltip title="Название целевой таблицы SNP (если не устраивает по умолчанию)">
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
                    placeholder: 'Введите customTargetSnp',
                    size: 'large',
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
                    placeholder: 'Введите historyColumns',
                    size: 'large',
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
                    placeholder: 'Введите businessKeys',
                    size: 'large',
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
                    placeholder: 'Введите sourceTable',
                    size: 'large',
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
                    placeholder: 'Введите sourceQuery',
                    size: 'large',
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
                    placeholder: 'Введите loadingMode',
                    size: 'large',
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
                    placeholder: 'Введите hashColumns',
                    size: 'large',
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
                    placeholder: 'Введите targetName',
                    size: 'large',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />
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
                            <UITooltip title="Минимальный loading id">
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
                    placeholder: 'Введите snpFilter',
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
