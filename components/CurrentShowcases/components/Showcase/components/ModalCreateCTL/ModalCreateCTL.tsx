import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { ModalCreateCTLView } from './ModalCreateCTL.view';
import styles from './styles.module.scss';

import { UIForm } from '@components/_shared/Form';
import { UIModal } from '@components/_shared/Modal';
import { UITitle } from '@components/_shared/Title';
import { useStyles } from '@hooks/useStyles';
import {
    TCreateConfigsTreePayload,
    useConfigsTreeQuery,
    useCreateConfigsTreeMutation,
    useCtlTreeQuery,
} from '@src/redux/showcases/showcase';
import { notificationEasy } from '@src/utils';

type Props = {
    isOpened: boolean;
    onClose: () => void;
};

type FormProps = {
    ctl_id: number;
    ctl_name: string;
    path: string;
    category: string;
    parent: number;
};

export const ModalCreateCTL: React.FC<Props> = ({ isOpened, onClose }) => {
    const cx = useStyles(styles);
    const { id: datamartID } = useParams();

    // Query
    const { data: configsTree, refetch: refetchConfigsTree } =
        useConfigsTreeQuery(datamartID as string, {
            skip: !datamartID,
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        });
    const { refetch: refetchTree } = useCtlTreeQuery(datamartID as string, {
        skip: !datamartID,
    });

    // Mutations
    const [createCTL, { isLoading: isLoadingCreate }] =
        useCreateConfigsTreeMutation();

    const normalConfigsList = useMemo(
        () =>
            configsTree?.length
                ? configsTree.map((item) => ({
                      label: item.entity_name,
                      value: item.id,
                  }))
                : [],
        [configsTree]
    );

    const onSubmit = async (data: FormProps) => {
        const payload: TCreateConfigsTreePayload = {
            datamartId: datamartID as string,
            entity_id: data.ctl_id,
            entity_name: data.ctl_name,
            entity_path: data.path,
            entity_category: data.category,
            parent: data.parent,
        };

        const res: any = await createCTL(payload);

        if (res?.data) {
            refetchTree();
            refetchConfigsTree();
            onClose();
            notificationEasy({
                content: 'Сущность успешно добавлена',
            });
        } else {
            for (const [key, value] of Object.entries(res?.error?.data)) {
                notificationEasy({
                    type: 'error',
                    content: `${key !== 'detail' ? key + ':' : ''} ${value}`,
                });
            }
        }
    };

    return (
        <UIModal
            open={isOpened}
            onClose={onClose}
            onCancel={onClose}
            destroyOnClose
            footer={null}
            width={700}
            title={
                <UITitle level={3} className={cx('title')}>
                    Добавление новой сущности
                </UITitle>
            }>
            <UIForm layout="vertical" onFinish={onSubmit}>
                <ModalCreateCTLView
                    normalConfigsList={normalConfigsList}
                    isLoadingCreate={isLoadingCreate}
                />
            </UIForm>
        </UIModal>
    );
};
