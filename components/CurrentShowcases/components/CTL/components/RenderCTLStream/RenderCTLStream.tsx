import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { Icon } from '@components/_shared/Icon';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';
import { useAppSelector } from '@src/redux/store';
import {
    TCreateStreamPayload,
    TDeleteStreamPayload,
    useCreateStreamMutation,
    useDeleteStreamMutation,
    useGetStreamsQuery,
} from '@src/redux/streamV2/streamV2';
import { notificationEasy } from '@src/utils';

import { CTLStream } from '../CTLStream';
import { ModalDetail } from '../ModalDetail';
import styles from './styles.module.scss';

type Props = {
    ctl_id?: React.Key;
};

export const RenderCTLStream: React.FC<Props> = ({ ctl_id }) => {
    const cx = useStyles(styles);
    const { id: datamart_id } = useParams();
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const { role } = useAppSelector((store) => store.auth);

    const [currStream, setCurrStream] = useState<number>();

    // Query
    const { data: streamList } = useGetStreamsQuery(ctl_id as string, {
        skip: !ctl_id,
    });

    // Mutations
    const [deleteStream, { isLoading: isLoadingDelete }] =
        useDeleteStreamMutation();
    const [createStream] = useCreateStreamMutation();

    const addStream = async () => {
        if (!ctl_id || !datamart_id) return;

        const payload: TCreateStreamPayload = {
            ctl_id,
            datamart_id,
        };

        const res: any = await createStream(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Поток успешно добавлен',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail,
            });
        }
    };

    const onDeleteStream = (id: number, index: number) => {
        return async () => {
            setCurrStream(index);

            const payload: TDeleteStreamPayload = {
                ctl_id: ctl_id as React.Key,
                id,
            };

            const res: any = await deleteStream(payload);
            if (res?.data) {
                notificationEasy({
                    content: 'Поток успешно удален',
                });
            } else {
                notificationEasy({
                    type: 'error',
                    content:
                        res?.error.data.detail ??
                        'Произошла ошибка при удалении потока',
                });
            }
        };
    };

    const openDetailModal = (id: number) => {
        return () => {
            setCurrStream(id);
            openPopup();
        };
    };

    return (
        <>
            <UIFlex className={cx('container')} gap={40}>
                {streamList &&
                    streamList.map((item, index) => (
                        <CTLStream
                            key={item.id}
                            data={item}
                            ctl_id={ctl_id}
                            index={index}
                            currStream={currStream}
                            isLoadingDelete={isLoadingDelete}
                            role={role}
                            onClick={openDetailModal(item.id)}
                            onDelete={onDeleteStream(item.id, index)}
                        />
                    ))}

                <UICard className={cx('addBlock')}>
                    <Icon
                        type="plus-circle-outlined"
                        className={cx('icon')}
                        size="lg"
                        onClick={
                            ![eUserRoles.BUISNESS].includes(role as eUserRoles)
                                ? addStream
                                : () => {}
                        }
                    />
                </UICard>
            </UIFlex>

            <ModalDetail
                isOpened={isOpened}
                stream_id={currStream}
                ctl_id={ctl_id}
                onClose={closePopup}
            />
        </>
    );
};
