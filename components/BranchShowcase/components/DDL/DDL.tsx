import { TourProps } from 'antd';
import React, { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { UICard } from '@components/_shared/Card';
import { UIForm } from '@components/_shared/Form';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import {
    DeleteDDLPayload,
    SaveDDLPayload,
    UpdateQueueDDLPayload,
    useCreateDDLMutation,
    useDeleteDDLMutation,
    useSaveDDLMutation,
    useUpdateQueueDDLMutation,
} from '@src/redux/DDL/DDL';
import { useDdlCurrentBranchQuery } from '@src/redux/branches/branches';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { RenderCardDDL } from './RenderDDLCard';
import styles from './styles.module.scss';

type Props = {
    isReference: boolean;
};

export const DDL: React.FC<Props> = ({ isReference }) => {
    const cx = useStyles(styles);
    const { id: branch_id } = useParams();
    const { role } = useAppSelector((store) => store.auth);
    const { isOpened, openPopup, closePopup } = usePopupControls();

    const refBlock = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refBlock.current,
            nextButtonProps: {
                children: 'Далее',
            },
        },
    ];

    // Query
    const {
        data: ddlData,
        isLoading: isLoadingDDLData,
        refetch: refetchBranchData,
    } = useDdlCurrentBranchQuery(branch_id as string, {
        skip: !branch_id,
    });

    // Mutations
    const [crateDDL] = useCreateDDLMutation();
    const [saveDDL] = useSaveDDLMutation();
    const [deleteDDL, { isLoading: isLoadingDelete }] = useDeleteDDLMutation();
    const [updateQueue] = useUpdateQueueDDLMutation();

    const normDDL = useMemo(
        () =>
            ddlData?.length
                ? ddlData.map((item, index) => ({
                      id: item.id,
                      name: item.name,
                      index,
                  }))
                : [],
        [ddlData]
    );

    const onSaveDDL = async (ddl_id: number, value: string) => {
        if (isReference) return;

        const payload: SaveDDLPayload = {
            branch_id: branch_id as string,
            ddl_id: String(ddl_id),
            name: value,
        };
        const res: any = await saveDDL(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Имя DDL сохранено',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при сохранении имени DDL',
            });

            refetchBranchData();
        }
    };

    const onDelete = async (ddl_id: number) => {
        if (isReference) return;

        const payload: DeleteDDLPayload = {
            branch_id: String(branch_id),
            ddl_id: String(ddl_id),
        };

        try {
            await deleteDDL(payload);
            notificationEasy({
                content: 'DDL удален',
            });

            refetchBranchData();
        } catch (error) {
            notificationEasy({
                type: 'error',
                content: 'Произошла ошибка при удалении DDL',
            });
        }
    };

    const onCreateDDL = async () => {
        if (isReference) return;

        const res: any = await crateDDL(String(branch_id));

        if (res?.data) {
            notificationEasy({
                content: 'Новый DDL создан',
            });

            refetchBranchData();
        } else {
            notificationEasy({
                type: 'error',
                content: 'Произошла ошибка при создании DDL',
            });
        }
    };

    const onUpdateQueue = async (ddl_id: number[]) => {
        if (isReference) return;

        const payload: UpdateQueueDDLPayload = {
            branch_id: String(branch_id),
            data: ddl_id,
        };

        await updateQueue(payload);
    };

    return (
        <div ref={refBlock}>
            <UICard className={cx('container')}>
                <UITitle className={cx('title')} level={3}>
                    DDL
                </UITitle>
                <UIForm layout="vertical">
                    <RenderCardDDL
                        ddlList={normDDL}
                        role={role}
                        isLoadingDelete={isLoadingDelete}
                        isLoadingDDLData={isLoadingDDLData}
                        onCreateDDL={onCreateDDL}
                        onSaveDDL={onSaveDDL}
                        onDelete={onDelete}
                        onUpdateQueue={onUpdateQueue}
                    />
                </UIForm>
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
        </div>
    );
};
