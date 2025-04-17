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
import { FIELS_LINK, OPTIONS_STAT_TYPES } from '@src/utils/constants';
import { UIButton } from '@components/_shared/Button';
import { FormInputNumber } from '@components/_shared/Form/FormInputNumber';
import { eUserRoles } from '@src/redux/auth/auth';
import { LinkButton } from '@components/_shared/LinkButton';

type Props = {
    name: string;
    isLoadingUpdate: boolean;
    active: boolean;
    role: eUserRoles | null;
};

export const TabFilesView: React.FC<Props> = ({ name, isLoadingUpdate, active, role }) => {
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
                    name: 'hdfsPaths',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                hdfsPaths
                            </UITitle>
                            <UITooltip title="Перечень путей, к которым будет применена процедура склейки файлов.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={FIELS_LINK[0].link}
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
                    placeholder: 'Введите hdfsPaths',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInput
                formProps={{
                    name: 'hdfsWorkPath',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                hdfsWorkPath
                            </UITitle>
                            <UITooltip title="Директория, используемая для промежуточных вычислений. Удаляется после завершения работы алгоритма.">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={FIELS_LINK[1].link}
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
                    placeholder: 'Введите hdfsWorkPath',
                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInputNumber
                formProps={{
                    name: 'minFileSizeMB',
                    label: (
                        <div className={cx('tooltipContainer')}>
                            <UITitle
                                level={5}
                                className={cx('text')}
                            >
                                minFileSizeMB
                            </UITitle>
                            <UITooltip title="Минимальный размер файла в мб. Если после склейки файлов больше одного, то все файлы имеют размер больше MinFileSizeMB">
                                <span>
                                    <Icon
                                        type="question-circle-outlined"
                                        size="xs"
                                    />
                                </span>
                            </UITooltip>
                            <LinkButton
                                to={FIELS_LINK[2].link}
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
                    placeholder: 'Введите minFileSizeMB',
                    style: {
                        width: '100%',
                    },
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
                                to={FIELS_LINK[2].link}
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
                                to={FIELS_LINK[3].link}
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
                    placeholder: 'Введите compressionType',
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
