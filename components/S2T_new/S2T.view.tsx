import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { LinkButton } from '@components/_shared/LinkButton';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import { TBranch } from '@src/redux/branches/branches';
import { ParseBranch, TransformDatamartList } from '@src/redux/s2t/s2t';
import { DEFAULT_DATAMART_STATUS } from '@src/utils/constants';

import { CTLTarget } from './components/CTLToTarget';
import { SourceTarget } from './components/SourceToTarget';
import styles from './styles.module.scss';

type Props = {
    datamartList: TransformDatamartList[];
    branchList: TBranch[];
    isLoadingDatamart: boolean;
    isLoadingBranchList: boolean;
    currDatamart: string;
    currBranch: string;
    dateS2T?: ParseBranch;
    link: string;
    isLoadingMakeS2T: boolean;
};

export const S2TView: React.FC<Props> = ({
    datamartList,
    isLoadingDatamart,
    branchList,
    isLoadingBranchList,
    currDatamart,
    currBranch,
    dateS2T,
    link,
    isLoadingMakeS2T,
}) => {
    const cx = useStyles(styles);

    return (
        <UICard>
            <UITitle className={cx('title')}>S2T</UITitle>
            <UIFlex vertical>
                <FormSelect
                    formProps={{
                        name: 'datamart',
                        label: 'Витрины',
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    selectProps={{
                        placeholder: 'Выберите витрину',
                        size: 'large',
                        options: datamartList,
                        loading: isLoadingDatamart,
                        disabled: isLoadingDatamart,
                    }}
                />

                <FormSelect
                    formProps={{
                        name: 'branch',
                        label: 'Ветки',
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    selectProps={{
                        placeholder: 'Выберите ветку',
                        size: 'large',
                        options: branchList,
                        loading: isLoadingBranchList,
                        disabled: isLoadingBranchList || !currDatamart,
                    }}
                />

                {currDatamart && currBranch && (
                    <UIFlex vertical>
                        <FormInput
                            formProps={{
                                name: 'datamart_code',
                                label: 'Код витрины',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите код витрины',
                                size: 'large',
                            }}
                        />

                        <FormInput
                            formProps={{
                                name: 'datamart_description',
                                label: 'Описание витрины',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите описание витрины',
                                size: 'large',
                            }}
                        />

                        <FormInput
                            formProps={{
                                name: 'datamart_business_name',
                                label: 'Бизнес название витрины',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            inputProps={{
                                placeholder: 'Введите бизнес название витрины',
                                size: 'large',
                            }}
                        />

                        <FormSelect
                            formProps={{
                                name: 'datamart_status',
                                label: 'Статус витрины',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            selectProps={{
                                placeholder: 'Выберите статус витрины',
                                size: 'large',
                                options: DEFAULT_DATAMART_STATUS,
                            }}
                        />

                        <UIFlex vertical gap={40}>
                            {!!dateS2T?.source_to_target.length && (
                                <SourceTarget
                                    data={dateS2T?.source_to_target}
                                />
                            )}

                            {!!dateS2T?.ctl_to_target.length && (
                                <CTLTarget
                                    data={dateS2T?.ctl_to_target}
                                    currDatamart={currDatamart}
                                />
                            )}
                        </UIFlex>

                        <UIFlex justify="center">
                            {!link ? (
                                <UIButton
                                    htmlType="submit"
                                    type="primary"
                                    size="large"
                                    className={cx('btn')}
                                    loading={isLoadingMakeS2T}
                                    disabled={isLoadingMakeS2T}>
                                    Создать
                                </UIButton>
                            ) : (
                                <LinkButton to={link} target="_blank">
                                    <UIButton
                                        size="large"
                                        className={cx('btn')}>
                                        Открыть S2T
                                    </UIButton>
                                </LinkButton>
                            )}
                        </UIFlex>
                    </UIFlex>
                )}
            </UIFlex>
        </UICard>
    );
};
