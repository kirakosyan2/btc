import { TourProps } from 'antd';
import React, { useRef } from 'react';

import { UIAlert } from '@components/_shared/Alert';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { Icon } from '@components/_shared/Icon';
import { LinkButton } from '@components/_shared/LinkButton';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';
import { UITypography } from '@components/_shared/Typography';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';

import styles from './styles.module.scss';

type Props = {
    isLoadingData: boolean;
    role: eUserRoles | null;
};

export const KibanaView: React.FC<Props> = ({ isLoadingData, role }) => {
    const cx = useStyles(styles);

    const { isOpened, openPopup, closePopup } = usePopupControls();
    const isReference = location.pathname.includes('reference');

    const refID = useRef(null);
    const refName = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refID.current,
            nextButtonProps: {
                children: 'Далее',
            },
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => refName.current,
            nextButtonProps: {
                children: 'Закрыть',
            },
            prevButtonProps: {
                children: 'Назад',
            },
        },
    ];

    return (
        <>
            <UICard className={cx('container')}>
                <UITitle level={3} className={cx('title')}>
                    Журналирование (Kibana)
                </UITitle>

                <UIAlert
                    message={
                        <UITypography strong>
                            Для получения ID приложения перейдите по{' '}
                            <LinkButton
                                to={
                                    'https://confluence.delta.sbrf.ru/pages/viewpage.action?pageId=11245783688'
                                }>
                                ссылке на Confluence
                            </LinkButton>{' '}
                            и пройдите по этапам инструкции
                        </UITypography>
                    }
                />
                <UIFlex vertical className={cx('content')}>
                    <div ref={refID}>
                        <FormInput
                            formProps={{
                                name: 'id',
                                label: (
                                    <UITitle level={5}>ID приложения</UITitle>
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
                                placeholder: 'Введите ID приложения',
                                size: 'large',
                                disabled:
                                    isLoadingData ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>
                    <div ref={refName}>
                        <FormInput
                            formProps={{
                                name: 'shortName',
                                label: (
                                    <UITitle level={5}>Короткое имя</UITitle>
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
                                placeholder: 'Введите короткое имя',
                                size: 'large',
                                disabled:
                                    isLoadingData ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                            }}
                        />
                    </div>
                </UIFlex>

                {isReference && (
                    <UITooltip title="Описание блока" className={cx('icon')}>
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
