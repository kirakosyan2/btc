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
import { FormInputNumber } from '@components/_shared/Form/FormInputNumber';
import { eUserRoles } from '@src/redux/auth/auth';
import { FIELS_LINK } from '@src/utils/constants';
import { LinkButton } from '@components/_shared/LinkButton';

type Props = {
    isLoading: boolean;
    role: eUserRoles | null;
};

export const CoalesceFilesView: React.FC<Props> = ({ isLoading, role }) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('content')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Модуль склейки файлов
            </UITitle>

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
                    placeholder: 'Введите compressionType',
                    size: 'large',

                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

            <FormInputNumber
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
                    placeholder: 'Введите parallelDegree',
                    size: 'large',

                    style: { width: '100%' },
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
                    placeholder: 'Введите minFileSizeMB',
                    size: 'large',
                    style: { width: '100%' },
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
                    placeholder: 'Введите hdfsWorkPath',
                    size: 'large',

                    disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                }}
            />

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
                                to={FIELS_LINK[4].link}
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
                    placeholder: 'Введите hdfsPaths',
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
