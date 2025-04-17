import { Form, TourProps } from 'antd';
import React, { useEffect, useMemo, useRef } from 'react';

import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { UIForm } from '@components/_shared/Form';
import { FormInput } from '@components/_shared/Form/FormInput';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { Icon } from '@components/_shared/Icon';
import { UISpinner } from '@components/_shared/Spinner';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { useTypesTasksQuery } from '@src/redux/types/type';

import { TCreateBranch } from '../../BranchShowcases';
import styles from './styles.module.scss';

type Props = {
    isLoading: boolean;
    disabled: boolean;
    isEmptyBranch: boolean;
    onClick: (data: TCreateBranch) => void;
};
export const CardAddBranch: React.FC<Props> = ({
    isLoading,
    disabled,
    isEmptyBranch,
    onClick,
}) => {
    const cx = useStyles(styles);
    const [form] = Form.useForm();

    const { isOpened, openPopup, closePopup } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refBranch = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => refBranch.current,
            nextButtonProps: {
                children: 'Закрыть',
            },
            prevButtonProps: {
                children: 'Назад',
            },
        },
    ];

    // Query
    const { data: typesTasks, isLoading: isLoadingTypesTasks } =
        useTypesTasksQuery();

    const defaultType = useMemo(
        () =>
            typesTasks &&
            typesTasks?.find(
                (item) => item.label.toLocaleLowerCase() === 'релиз'
            ),
        [typesTasks]
    );

    useEffect(() => {
        if (isEmptyBranch && typesTasks?.length) {
            form.setFieldsValue({
                type: defaultType?.value,
                name: 'master',
            });
        }
    }, [defaultType, typesTasks]);

    const handleSubmit = async () => {
        await form
            .validateFields()
            .then(async ({ name, type }: TCreateBranch) => {
                const payload: TCreateBranch = {
                    name,
                    type,
                };

                await onClick(payload);
                form.resetFields();
            });
    };

    return (
        <>
            <div ref={refBranch}>
                <UICard className={cx('container')}>
                    <UIFlex justify="space-between" align="center">
                        <UIFlex align="center">
                            <UIForm layout="vertical" form={form}>
                                <FormInput
                                    formProps={{
                                        name: 'name',
                                        label: 'Название ветки',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Обязательное поле',
                                            },
                                        ],
                                    }}
                                    inputProps={{
                                        disabled: isEmptyBranch,
                                    }}
                                />

                                <FormSelect
                                    formProps={{
                                        name: 'type',
                                        label: 'Тип задачи',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Обязательное поле',
                                            },
                                        ],
                                        style: { marginBottom: 0 },
                                    }}
                                    selectProps={{
                                        options: typesTasks,
                                        loading: isLoadingTypesTasks,
                                        disabled:
                                            isLoadingTypesTasks ||
                                            isEmptyBranch,
                                    }}
                                />
                            </UIForm>
                            <div className={cx('containerActions')}>
                                {!isLoading ? (
                                    <Icon
                                        type="plus-circle-outlined"
                                        size="lg"
                                        className={cx(
                                            'icon',
                                            disabled ? 'disabled' : ''
                                        )}
                                        onClick={
                                            !disabled ? handleSubmit : () => {}
                                        }
                                    />
                                ) : (
                                    <UISpinner
                                        size="large"
                                        className={cx('spinner')}
                                    />
                                )}
                            </div>
                        </UIFlex>
                    </UIFlex>
                </UICard>

                {isReference && (
                    <UITooltip
                        title="Описание блока"
                        className={cx('hintIcon')}>
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                onClick={openPopup}
                            />
                        </span>
                    </UITooltip>
                )}
            </div>

            {isReference && (
                <UITour open={isOpened} steps={steps} onClose={closePopup} />
            )}
        </>
    );
};
