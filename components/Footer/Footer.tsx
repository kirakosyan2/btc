import { Form } from 'antd';
import React from 'react';

import { Chat } from '@components/Chat';
import { UIForm } from '@components/_shared/Form';
import { UITypography } from '@components/_shared/Typography';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { useAppSelector } from '@src/redux/store';

import { KpssGroup, KpssLottie } from '@sber-sd/assistant-web-sdk/components';

import styles from './styles.module.scss';

export const Footer: React.FC = () => {
    const cx = useStyles(styles);

    const [form] = Form.useForm();

    const { authorized } = useAppSelector((store) => store.auth);
    const { isOpened, openPopup, closePopup } = usePopupControls();

    return (
        <UIForm form={form}>
            <div className={cx('container')}>
                <UITypography className={cx('text')}>
                    Made by B2C-SQL
                </UITypography>

                {authorized && (
                    <div className={cx('float')}>
                        <KpssGroup
                            kpss={{
                                KpssComponent: KpssLottie,
                                size: 'large',
                                label: 'Открыть чат',
                                character: 'sber',
                                emotion: 'idle',
                                handleKpss: openPopup,
                            }}
                        />
                    </div>
                )}
            </div>

            <Chat isOpened={isOpened} onClose={closePopup} />
        </UIForm>
    );
};
