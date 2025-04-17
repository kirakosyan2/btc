import { TourProps } from 'antd';
import React, { useMemo, useRef } from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { UIFormList } from '@components/_shared/Form/FormList';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { FormTextArea } from '@components/_shared/Form/FormTextArea/FormTextArea';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';
import { TransformOptionsList } from '@src/redux/types/type';

import styles from './styles.module.scss';

type Props = {
    optionsCheckList: TransformOptionsList[];
    isLoadingUpdateCheckList: boolean;
    isLoadingOptions: boolean;
    role: eUserRoles | null;
    isLoadingSendMail: boolean;
    handleSendMailCL: () => void;
};

export const ChecklistView: React.FC<Props> = ({
    optionsCheckList,
    isLoadingOptions,
    isLoadingSendMail,
    role,
    handleSendMailCL,
}) => {
    const cx = useStyles(styles);

    const { isOpened, openPopup, closePopup } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refEmail = useRef(null);
    const refType = useRef(null);
    const refKeys = useRef(null);
    const refLink = useRef(null);
    const refOwner = useRef(null);
    const refrAchitect = useRef(null);
    const refManager = useRef(null);
    const ref2ls = useRef(null);
    const refApprouver = useRef(null);
    const refDescription = useRef(null);
    const refComment = useRef(null);
    const refBtn = useRef(null);

    const steps: TourProps['steps'] = useMemo(
        () => [
            {
                title: 'Other Actions',
                description: 'Click to see other actions.',
                target: () => refEmail.current,
                nextButtonProps: {
                    children: 'Далее',
                },
            },
            {
                title: 'Save',
                description: 'Save your changes.',
                target: () => refType.current,
                nextButtonProps: {
                    children: 'Далее',
                },
                prevButtonProps: {
                    children: 'Назад',
                },
            },
            {
                title: 'Save',
                description: 'Save your changes.',
                target: () => refKeys.current,
                nextButtonProps: {
                    children: 'Далее',
                },
                prevButtonProps: {
                    children: 'Назад',
                },
            },
            {
                title: 'Save',
                description: 'Save your changes.',
                target: () => refLink.current,
                nextButtonProps: {
                    children: 'Далее',
                },
                prevButtonProps: {
                    children: 'Назад',
                },
            },
            {
                title: 'Save',
                description: 'Save your changes.',
                target: () => refOwner.current,
                nextButtonProps: {
                    children: 'Далее',
                },
                prevButtonProps: {
                    children: 'Назад',
                },
            },
            {
                title: 'Save',
                description: 'Save your changes.',
                target: () => refManager.current,
                nextButtonProps: {
                    children: 'Далее',
                },
                prevButtonProps: {
                    children: 'Назад',
                },
            },
            {
                title: 'Save',
                description: 'Save your changes.',
                target: () => ref2ls.current,
                nextButtonProps: {
                    children: 'Далее',
                },
                prevButtonProps: {
                    children: 'Назад',
                },
            },
            {
                title: 'Save',
                description: 'Save your changes.',
                target: () => refApprouver.current,
                nextButtonProps: {
                    children: 'Далее',
                },
                prevButtonProps: {
                    children: 'Назад',
                },
            },
            {
                title: 'Save',
                description: 'Save your changes.',
                target: () => refDescription.current,
                nextButtonProps: {
                    children: 'Далее',
                },
                prevButtonProps: {
                    children: 'Назад',
                },
            },
            {
                title: 'Save',
                description: 'Save your changes.',
                target: () => refComment.current,
                nextButtonProps: {
                    children: 'Далее',
                },
                prevButtonProps: {
                    children: 'Назад',
                },
            },
            {
                title: 'Save',
                description: 'Save your changes.',
                target: () => refBtn.current,
                nextButtonProps: {
                    children: 'Закрыть',
                },
                prevButtonProps: {
                    children: 'Назад',
                },
            },
        ],
        []
    );

    return (
        <>
            <UICard className={cx('container')}>
                <UITitle level={3} className={cx('title')}>
                    Чек-лист
                </UITitle>

                <UIFlex gap={40}>
                    <div className={cx('containerItem')} ref={refEmail}>
                        <FormInput
                            formProps={{
                                name: 'receiver_email',
                                label: (
                                    <UITitle level={5}>
                                        Введите почту получателя чек-листа
                                    </UITitle>
                                ),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('containerItem'),
                            }}
                            inputProps={{
                                size: 'large',
                                placeholder:
                                    'Введите почту получателя чек-листа',
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </div>

                    <div ref={refType} className={cx('containerItem')}>
                        <FormSelect
                            formProps={{
                                name: 'release_type',
                                label: (
                                    <UITitle level={5}>Тип чек-листа</UITitle>
                                ),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('containerItem'),
                            }}
                            selectProps={{
                                size: 'large',
                                placeholder: 'Выберите тип чек-листа',
                                options: optionsCheckList,
                                loading: isLoadingOptions,
                                disabled:
                                    isLoadingOptions ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>
                </UIFlex>

                <UIFlex
                    vertical
                    gap={12}
                    style={{
                        marginTop: '10px',
                    }}>
                    <div ref={refKeys}>
                        <UITitle level={5} className={cx('ext')}>
                            Ключи Story/Bug
                        </UITitle>
                        <UIFormList
                            name="story_key"
                            className={cx('formList')}
                            disabled={[eUserRoles.BUISNESS].includes(
                                role as eUserRoles
                            )}
                            renderData={(field) => (
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
                                        size: 'large',
                                        placeholder: 'Ключ',
                                        disabled: [
                                            eUserRoles.BUISNESS,
                                        ].includes(role as eUserRoles),
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div ref={refLink}>
                        <FormInput
                            formProps={{
                                name: 'nexus_distributive_link',
                                label: (
                                    <UITitle level={5}>
                                        Ссылка на дистрибутив в Nexus
                                    </UITitle>
                                ),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('containerItem'),
                            }}
                            inputProps={{
                                size: 'large',
                                placeholder:
                                    'Введите ссылку на дистрибутив в Nexus',
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </div>

                    <div ref={refOwner} className={cx('containerItem')}>
                        <FormInput
                            formProps={{
                                name: 'product_owner',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle
                                            level={5}
                                            className={cx('text')}>
                                            Логин SIGMA владельца продукта
                                        </UITitle>
                                        <UITooltip title="Ожидается ID базовой для витрины сущности. Новые сущности витрины будут создаваться с данного ID не включая его. Например: 935129000">
                                            <span>
                                                <Icon
                                                    type="question-circle-outlined"
                                                    size="xs"
                                                    className={cx('icon')}
                                                />
                                            </span>
                                        </UITooltip>
                                    </div>
                                ),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('containerItem'),
                            }}
                            inputProps={{
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                                size: 'large',
                                placeholder:
                                    'Выберите логин  организатора (владельца продукта)',
                            }}
                        />
                    </div>

                    <div ref={refrAchitect}>
                        <FormInput
                            formProps={{
                                name: 'architector_dka_sigma_login',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle level={5}>
                                            Логин SIGMA архитектора ДКА
                                        </UITitle>
                                        <UITooltip title="для АС ГАНЗА Ивашкин Петр Александрович">
                                            <span>
                                                <Icon
                                                    type="question-circle-outlined"
                                                    size="xs"
                                                    className={cx('icon')}
                                                />
                                            </span>
                                        </UITooltip>
                                    </div>
                                ),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('containerItem'),
                            }}
                            inputProps={{
                                size: 'large',
                                placeholder:
                                    'Введите логин SIGMA архитектора ДКА',
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </div>

                    <div ref={refManager}>
                        <FormInput
                            formProps={{
                                name: 'release_manager',
                                label: (
                                    <UITitle level={5}>
                                        Логин SIGMA организатора (релизного
                                        менеджера)
                                    </UITitle>
                                ),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('containerItem'),
                            }}
                            inputProps={{
                                size: 'large',
                                placeholder:
                                    'Введите логин SIGMA релизного менеджера',
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </div>

                    <div ref={ref2ls}>
                        <FormInput
                            formProps={{
                                name: 'release_2ls',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle level={5}>
                                            Логин SIGMA администратора 2ЛС
                                        </UITitle>
                                        <UITooltip title="для АС ГАНЗА Юрин Григорий Юрьевич">
                                            <span>
                                                <Icon
                                                    type="question-circle-outlined"
                                                    size="xs"
                                                    className={cx('icon')}
                                                />
                                            </span>
                                        </UITooltip>
                                    </div>
                                ),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('containerItem'),
                            }}
                            inputProps={{
                                size: 'large',
                                placeholder:
                                    'Введите логин SIGMA администратора 2ЛС',
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </div>

                    <div ref={refApprouver}>
                        <FormInput
                            formProps={{
                                name: 'release_approuver',
                                label: (
                                    <div className={cx('tooltipContainer')}>
                                        <UITitle level={5}>
                                            Логин SIGMA утверждающего
                                        </UITitle>
                                        <UITooltip title="для АС ГАНЗА Васев Владимир Сергеевич">
                                            <span>
                                                <Icon
                                                    type="question-circle-outlined"
                                                    size="xs"
                                                    className={cx('icon')}
                                                />
                                            </span>
                                        </UITooltip>
                                    </div>
                                ),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                                className: cx('containerItem'),
                            }}
                            inputProps={{
                                size: 'large',
                                placeholder:
                                    'Введите логин SIGMA утверждающего',
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </div>

                    <div ref={refDescription}>
                        <FormTextArea
                            formProps={{
                                name: 'description',
                                label: (
                                    <UITitle level={5}>Описание релиза</UITitle>
                                ),

                                className: cx('containerItem'),
                            }}
                            textAreaProps={{
                                placeholder: 'Введите описание релиза',
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </div>

                    <div ref={refComment}>
                        <FormTextArea
                            formProps={{
                                name: 'comment',
                                label: (
                                    <UITitle level={5}>
                                        Комментарий к чек-листу
                                    </UITitle>
                                ),

                                className: cx('containerItem'),
                            }}
                            textAreaProps={{
                                placeholder: 'Введите комментарий к чек-листу',
                                disabled: [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                ),
                            }}
                        />
                    </div>
                </UIFlex>

                <UIFlex gap={40} justify="center">
                    <div ref={refBtn}>
                        <UIButton
                            onClick={handleSendMailCL}
                            loading={isLoadingSendMail}
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className={cx('btn')}
                            disabled={[eUserRoles.BUISNESS].includes(
                                role as eUserRoles
                            )}>
                            Отправить Чек-лист
                        </UIButton>
                    </div>
                </UIFlex>

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
            </UICard>

            {isReference && (
                <UITour open={isOpened} steps={steps} onClose={closePopup} />
            )}
        </>
    );
};
