import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { UITitle } from '@components/_shared/Title';
import { useStyles } from '@hooks/useStyles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { UIFlex } from '@components/_shared/Flex';
import { TransformBlocksList } from '@src/redux/block/block';

type Props = {
    blocksList: TransformBlocksList[];
    isLoadingBlocks: boolean;
    isLoadingCreate: boolean;
};
export const TeamView: React.FC<Props> = ({ blocksList, isLoadingBlocks, isLoadingCreate }) => {
    const cx = useStyles(styles);
    const navigate = useNavigate();

    const goToPrevPage = () => navigate(-1);

    return (
        <UICard className={cx('container')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Зарегистрировать команду
            </UITitle>
            <div className={cx('content')}>
                <UIFlex
                    justify="space-between"
                    gap={40}
                >
                    <FormSelect
                        formProps={{
                            name: 'block',
                            label: (
                                <UITitle
                                    className={cx('contentItem')}
                                    level={5}
                                >
                                    Блок
                                </UITitle>
                            ),
                            rules: [
                                {
                                    required: true,
                                    message: 'Обязательное поле',
                                },
                            ],
                            className: cx('contentItem'),
                        }}
                        selectProps={{
                            options: blocksList,
                            loading: isLoadingBlocks,
                            placeholder: 'Выберите блок',
                            size: 'large',
                        }}
                    />
                    <FormInput
                        formProps={{
                            name: 'team',
                            label: (
                                <UITitle
                                    className={cx('contentItem')}
                                    level={5}
                                >
                                    Команда
                                </UITitle>
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
                            placeholder: 'Название команды',
                            size: 'large',
                        }}
                    />
                </UIFlex>
                <FormInput
                    formProps={{
                        name: 'link',
                        label: (
                            <UITitle
                                className={cx('contentItem')}
                                level={5}
                            >
                                Ссылка на инициативу в Confluence
                            </UITitle>
                        ),
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        placeholder: 'Введите ссылку на инициативу в Confluence',
                        size: 'large',
                        className: cx('contentItem'),
                    }}
                />

                <UIFlex
                    justify="space-between"
                    gap={40}
                >
                    <UIButton
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className={cx('btn')}
                        loading={isLoadingCreate}
                        disabled={isLoadingCreate}
                    >
                        Создать
                    </UIButton>
                    <UIButton
                        size="large"
                        className={cx('btn')}
                        onClick={goToPrevPage}
                    >
                        Назад
                    </UIButton>
                </UIFlex>
            </div>
        </UICard>
    );
};
