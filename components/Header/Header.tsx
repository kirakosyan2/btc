import { Form, MenuProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { NotificationDrawer } from '@components/NotificationDrawer';
import { UIBadge } from '@components/_shared/Badge';
import { UIButton } from '@components/_shared/Button';
import { UIDropdown } from '@components/_shared/Dropdown';
import { UIFlex } from '@components/_shared/Flex';
import { UIForm } from '@components/_shared/Form';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { Icon } from '@components/_shared/Icon';
import { LinkButton } from '@components/_shared/LinkButton';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITypography } from '@components/_shared/Typography';

import { usePopupControls } from '@hooks/usePopupControls';
import useSSE from '@hooks/useSSE';
import { useStyles } from '@hooks/useStyles';

import { StorageService } from '@services/index';

import logo from '@assets/images/logo.png';

import { eUserRoles } from '@src/redux/auth/auth';
import { logout } from '@src/redux/auth/auth.slice';
import { TUnreadNotificationsRequest } from '@src/redux/notifications/notifications';
import {
    personalCabinetApi,
    useMeQuery,
} from '@src/redux/personalCabinet/personalCabinet';
import { useReferenceQuery } from '@src/redux/reference/reference';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

import { PopupSuccesVersion } from './PopupSuccesVersion';
import styles from './styles.module.scss';

const storageService = StorageService.getInstance();

const URL_SEE = import.meta.env.VITE_URL_SSE;

const options = [
    {
        value: '1.9.0',
        label: '1.9.0',
    },
    {
        value: '1.10.0',
        label: '1.10.0',
    },
];

export const Header: React.FC = () => {
    const cx = useStyles(styles);
    const navigate = useNavigate();
    const location = useLocation();

    const { authorized, role } = useAppSelector((store) => store.auth);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const [option, setOption] = useState('');
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const {
        isOpened: isOpenModal,
        openPopup: openModal,
        closePopup: closeModal,
    } = usePopupControls();

    // Query
    const { data: me } = useMeQuery(undefined, {
        skip: !authorized,
    });
    const { data: reference } = useReferenceQuery(undefined, {
        skip: !authorized,
    });

    const sseData = useSSE<TUnreadNotificationsRequest>(URL_SEE);

    useEffect(() => {
        const version = storageService.getItem('version');

        if (version) {
            form.setFieldValue('version', version);
        } else {
            form.setFieldValue('version', options[1].value);
            storageService.setItem('version', options[1].value);

            if (authorized) {
                navigate('/initiative', { replace: true });
            } else {
                navigate(location.pathname, { replace: true });
            }
        }
    }, []);

    const onLogout = () => {
        dispatch(logout());
        dispatch(personalCabinetApi.util.resetApiState());
    };

    const goToCabinet = () => {
        navigate('/cabinet');
    };

    const writeUs = () => {
        window.location.href =
            'mailto:nvtarakanovskiy@sberbank.ru?subject=Поддержка%20B2C-SQL';
    };

    const onSelect = (option: string) => {
        openModal();
        setOption(option);
    };

    const adminItems: MenuProps['items'] = useMemo(
        () => [
            {
                key: '3',
                label: (
                    <LinkButton
                        to={'/administaration/customers'}
                        className={cx('textItem')}>
                        Заказчики
                    </LinkButton>
                ),
            },
            {
                key: '4',
                label: (
                    <LinkButton
                        to={'/administaration/initiative'}
                        className={cx('textItem')}>
                        Инициативы
                    </LinkButton>
                ),
            },
        ],
        []
    );

    const etlItems: MenuProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: (
                    <LinkButton
                        to={'/etl/config/update'}
                        className={cx('textItem')}>
                        Конфиг команды
                    </LinkButton>
                ),
            },
            {
                key: '2',
                label: (
                    <LinkButton
                        to={'/etl/create_etl'}
                        className={cx('textItem')}>
                        Новая витрина
                    </LinkButton>
                ),
            },
        ],
        []
    );

    const s2t: MenuProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: (
                    <LinkButton to={'/s2t/generate'} className={cx('textItem')}>
                        S2T Витрины
                    </LinkButton>
                ),
            },
        ],
        []
    );

    const support: MenuProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: (
                    <LinkButton to={'/support'} className={cx('textItem')}>
                        FAQ
                    </LinkButton>
                ),
            },
            {
                key: '2',
                label: (
                    <LinkButton
                        to={'/test/statistic'}
                        className={cx('textItem')}>
                        Тестирование
                    </LinkButton>
                ),
            },
            reference?.id
                ? {
                      key: '3',
                      label: (
                          <LinkButton
                              to={`/initiative/${reference.id}`}
                              className={cx('textItem')}>
                              {reference?.name}
                          </LinkButton>
                      ),
                  }
                : null,
        ],
        [reference]
    );

    return (
        <>
            <UIFlex
                justify="space-between"
                align="center"
                className={cx('container')}>
                <UIFlex align="center" gap={20}>
                    <LinkButton to={'/'}>
                        <img src={logo} className={cx('logo')} />
                    </LinkButton>
                    <LinkButton to={'/'}>
                        <UITitle level={2} className={cx('title')}>
                            b2c-sql
                        </UITitle>
                    </LinkButton>
                    <UIFlex align="center" gap={10}>
                        <UITitle className={cx('textVersion')} level={5}>
                            Версия:
                        </UITitle>
                        <UIForm form={form}>
                            <FormSelect
                                formProps={{
                                    name: 'version',
                                    className: cx('select'),
                                }}
                                selectProps={{
                                    options: options,
                                    onChange: onSelect,
                                }}
                            />
                        </UIForm>
                    </UIFlex>
                </UIFlex>
                <UIFlex gap={20} align="center" justify="center">
                    {authorized && (
                        <>
                            {[eUserRoles.ADMIN].includes(
                                role as eUserRoles
                            ) && (
                                <div>
                                    <UIDropdown menu={{ items: adminItems }}>
                                        <UITypography className={cx('text')}>
                                            Администрирование
                                        </UITypography>
                                    </UIDropdown>
                                </div>
                            )}
                            <div>
                                <UIDropdown menu={{ items: etlItems }}>
                                    <UITypography
                                        className={cx('text', 'upper')}>
                                        etl
                                    </UITypography>
                                </UIDropdown>
                            </div>
                            <div>
                                <UIDropdown menu={{ items: s2t }}>
                                    <UITypography
                                        className={cx('text', 'upper')}>
                                        s2t
                                    </UITypography>
                                </UIDropdown>
                            </div>
                        </>
                    )}
                    {/* TODO: Добавить ссылку в константу */}
                    <UIFlex align="center" gap={15}>
                        {authorized &&
                            [eUserRoles.ADMIN].includes(role as eUserRoles) && (
                                <div>
                                    <UIDropdown menu={{ items: support }}>
                                        <UITypography className={cx('text')}>
                                            Помощь
                                        </UITypography>
                                    </UIDropdown>
                                </div>
                            )}
                    </UIFlex>
                </UIFlex>
                <UIFlex align="center" gap={20}>
                    <UIButton
                        type="text"
                        onClick={goToCabinet}
                        className={cx('text')}>
                        {me?.username}
                    </UIButton>

                    {authorized && (
                        <UIBadge count={sseData?.unread_notifications}>
                            <Icon
                                type="bell-outlined"
                                size="sm"
                                className={cx('icon')}
                                onClick={openPopup}
                            />
                        </UIBadge>
                    )}

                    <UITooltip title="Написать нам" placement="left">
                        <span onClick={writeUs}>
                            <Icon
                                type="mail-outlined"
                                size="sm"
                                className={cx('icon')}
                            />
                        </span>
                    </UITooltip>

                    {authorized && (
                        <Icon
                            type="logout-outlined"
                            size="sm"
                            className={cx('icon')}
                            onClick={onLogout}
                        />
                    )}
                </UIFlex>
            </UIFlex>

            <NotificationDrawer isOpened={isOpened} onClose={closePopup} />

            <PopupSuccesVersion
                open={isOpenModal}
                onClose={closeModal}
                option={option}
                form={form}
            />
        </>
    );
};
