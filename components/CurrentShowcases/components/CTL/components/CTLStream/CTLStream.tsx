import React, { useState } from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { UIInput } from '@components/_shared/Input';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';
import {
    TStream,
    TUpdateStreamPayload,
    useUpdateStreamMutation,
} from '@src/redux/streamV2/streamV2';
import { notificationEasy } from '@src/utils';

import styles from './styles.module.scss';

type Props = {
    data: TStream;
    index: number;
    isLoadingDelete: boolean;
    currStream?: number;
    role: eUserRoles | null;
    ctl_id?: React.Key;
    onClick: () => void;
    onDelete: () => void;
};
export const CTLStream: React.FC<Props> = ({
    data,
    index,
    currStream = 0,
    isLoadingDelete,
    role,
    ctl_id,
    onClick,
    onDelete,
}) => {
    const cx = useStyles(styles);

    // TODO: вынести на верхний уровень
    const [nameStream, setNameStream] = useState<string>(data?.name ?? '');
    const [updateStream] = useUpdateStreamMutation();

    const setNameStreamHandler = (name: string) => {
        if (name) {
            setNameStream(name);
            changeNameStream(name);
        }
    };

    const changeNameStream = async (name: string) => {
        const payload: TUpdateStreamPayload = {
            ctl_id: ctl_id as React.Key,
            stream_id: data.id,
            name,
        };

        const res: any = await updateStream(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно изменены',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при сохранении данных',
            });
        }
    };

    return (
        <>
            <UICard className={cx('container')}>
                <UIFlex vertical>
                    <UITitle className={cx('text')} level={5}>
                        Название потока:
                    </UITitle>
                    <UIInput
                        size="middle"
                        defaultValue={nameStream}
                        onBlur={(e) => setNameStreamHandler(e.target.value)}
                        disabled={[eUserRoles.BUISNESS].includes(
                            role as eUserRoles
                        )}
                    />
                </UIFlex>
                <UIFlex gap={10}>
                    <UIButton
                        className={cx('btn')}
                        size="middle"
                        onClick={onClick}>
                        Настроить
                    </UIButton>
                    <UIButton
                        className={cx('btn', 'danger')}
                        size="middle"
                        onClick={onDelete}
                        loading={isLoadingDelete && index === currStream}
                        disabled={
                            (isLoadingDelete && index === currStream) ||
                            [eUserRoles.BUISNESS].includes(role as eUserRoles)
                        }>
                        Удалить
                    </UIButton>
                </UIFlex>
            </UICard>
        </>
    );
};
