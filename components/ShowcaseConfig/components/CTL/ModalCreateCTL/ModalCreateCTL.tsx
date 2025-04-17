import { UIForm } from '@components/_shared/Form';
import { UIModal } from '@components/_shared/Modal';
import React, { useMemo } from 'react';
import { ModalCreateCTLView } from './ModalCreateCTL.view';
import { UITitle } from '@components/_shared/Title';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import {
    CreateConfigCTLPayload,
    useCreateCurrentCtlMutation,
    useCtlQuery,
    useShowcaseConfigCTLQuery,
} from '@src/redux/config/configs';
import { notificationEasy } from '@src/utils';

type Props = {
    opened: boolean;
    onClose: () => void;
};

type FormProps = {
    ctl_id: number;
    ctl_name: string;
    path: string;
    category: string;
    parent: number;
};

export const ModalCreateCTL: React.FC<Props> = ({ opened, onClose }) => {
    const cx = useStyles(styles);

    // Query
    const { data: configsCTL, refetch: refetchConfigsCTL } = useShowcaseConfigCTLQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    const { refetch: refetchCTL } = useCtlQuery();

    // Mutations
    const [createCTL, { isLoading: isLoadingCreate }] = useCreateCurrentCtlMutation();

    const normalConfigsList = useMemo(
        () =>
            configsCTL?.length
                ? configsCTL.map((item) => ({
                    label: item.entity_name,
                    value: item.id,
                }))
                : [],
        [configsCTL],
    );

    const onSubmit = async (data: FormProps) => {
        const payload: CreateConfigCTLPayload = {
            entity_id: data.ctl_id,
            entity_name: data.ctl_name,
            entity_path: data.path,
            entity_category: data.category,
            parent: data.parent,
        };

        const res: any = await createCTL(payload);

        if (res?.data) {
            onClose();
            refetchCTL();
            refetchConfigsCTL();
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
            open={opened}
            onCancel={onClose}
            onClose={onClose}
            destroyOnClose
            width={700}
            title={
                <UITitle
                    level={3}
                    className={cx('title')}
                >
                    Добавление новой сущности
                </UITitle>
            }
            footer={null}
        >
            <UIForm
                layout="vertical"
                onFinish={onSubmit}
            >
                <ModalCreateCTLView
                    normalConfigsList={normalConfigsList}
                    isLoadingCreate={isLoadingCreate}
                />
            </UIForm>
        </UIModal>
    );
};
