import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITitle } from '@components/_shared/Title';
import { useStyles } from '@hooks/useStyles';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { UIFlex } from '@components/_shared/Flex';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { InitiativesList } from '@src/redux/initiative/initiative';
import { NormalFormatsList } from '@src/redux/format/format';
import { isValidNameDatamart } from '@src/utils/regexp';
import { eUserRoles } from '@src/redux/auth/auth';

type Props = {
    initiativeList: InitiativesList[];
    formatsList: NormalFormatsList[];
    isLoadingInitiatives: boolean;
    isLoadingFormats: boolean;
    isLoadingCreate: boolean;
    role: eUserRoles | null;
};
export const NewShowcaseView: React.FC<Props> = ({
    initiativeList,
    formatsList,
    isLoadingFormats,
    isLoadingInitiatives,
    isLoadingCreate,
    role,
}) => {
    const cx = useStyles(styles);

    const normalInitiativeList = useMemo(
        () =>
            initiativeList?.length
                ? initiativeList.map((initiative) => ({
                      value: initiative.id,
                      label: initiative.name,
                  }))
                : [],
        [initiativeList],
    );

    return (
        <UICard className={cx('container')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Создание новый витрины
            </UITitle>
            <UIFlex
                vertical
                className={cx('content')}
            >
                <FormSelect
                    formProps={{
                        name: 'initiative',
                        label: <UITitle level={5}>Инициатива</UITitle>,
                        className: cx('containerItem'),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    selectProps={{
                        placeholder: 'Выберите инициативу',
                        size: 'large',
                        options: normalInitiativeList,
                        loading: isLoadingInitiatives,
                        disabled:
                            isLoadingInitiatives ||
                            [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'name',
                        label: <UITitle level={5}>Название витрины</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                            {
                                validator: async (_, value) => {
                                    if (value && !isValidNameDatamart(value)) {
                                        return Promise.reject(
                                            new Error(
                                                'Доступна латинница, цифры и знаки: "-", "_"',
                                            ),
                                        );
                                    }
                                },
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите название',
                        disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    }}
                />
                <FormSelect
                    formProps={{
                        name: 'format',
                        label: <UITitle level={5}>Формат витрины</UITitle>,
                        className: cx('containerItem'),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    selectProps={{
                        placeholder: 'Выберите формат',
                        size: 'large',
                        options: formatsList,
                        loading: isLoadingFormats,
                        disabled:
                            isLoadingFormats || [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'confluence_link',
                        label: (
                            <UITitle level={5}>Ссылка на бизнес-требования в Confluence</UITitle>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Вставьте ссылку',
                        disabled: [eUserRoles.BUISNESS].includes(role as eUserRoles),
                    }}
                />
            </UIFlex>
            <UIFlex gap={20}>
                <UIButton
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className={cx('btn')}
                    loading={isLoadingCreate}
                    disabled={isLoadingCreate || [eUserRoles.BUISNESS].includes(role as eUserRoles)}
                >
                    Создать
                </UIButton>
            </UIFlex>
        </UICard>
    );
};
