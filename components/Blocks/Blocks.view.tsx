import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UITitle } from '@components/_shared/Title';
import { useStyles } from '@hooks/useStyles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { UIFlex } from '@components/_shared/Flex';

type Props = {
    isLoadingCreate: boolean;
};
export const BlocksView: React.FC<Props> = ({ isLoadingCreate }) => {
    const cx = useStyles(styles);
    const navigate = useNavigate();

    const goToPrevPage = () => navigate(-1);

    return (
        <UICard className={cx('container')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Добавить новый блок
            </UITitle>
            <UIFlex
                vertical
                className={cx('content')}
            >
                <FormInput
                    formProps={{
                        name: 'name',
                        label: <UITitle level={5}>Название блока</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите название блока',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'nameRu',
                        label: <UITitle level={5}>Краткое название блока на русском</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите краткое название блока на русском',
                    }}
                />
                <FormInput
                    formProps={{
                        name: 'nameEn',
                        label: <UITitle level={5}>Краткое название блока на английском</UITitle>,
                        rules: [
                            {
                                required: true,
                                message: 'Обязательное поле',
                            },
                        ],
                    }}
                    inputProps={{
                        size: 'large',
                        placeholder: 'Введите краткое название блока на английском',
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
        </UICard>
    );
};
