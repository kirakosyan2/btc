import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { Icon } from '@components/_shared/Icon';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';
import { DataCurrentBranch } from '@src/redux/branches/branches';

import { SkeletonDDLCard } from '../SkeletonDDLCard';
import { DDLCard } from './DDLCard';
import { ModalDetailDDL } from './ModalDetailDDL';
import styles from './styles.module.scss';

type Props = {
    ddlList: DataCurrentBranch[];
    role: eUserRoles | null;
    isLoadingDelete: boolean;
    isLoadingDDLData: boolean;
    onCreateDDL: () => void;
    onSaveDDL: (ddl_id: number, value: string) => void;
    onDelete: (ddl_id: number) => void;
    onUpdateQueue: (ddl_id: any[]) => void;
};

export const RenderCardDDL: React.FC<Props> = ({
    ddlList,
    role,
    isLoadingDelete,
    isLoadingDDLData,
    onCreateDDL,
    onSaveDDL,
    onDelete,
    onUpdateQueue,
}) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const [idDDL, setIdDDL] = useState<number>();
    const [normList, setNormList] = useState(ddlList);

    useEffect(() => {
        if (ddlList) {
            setNormList(ddlList);
        }
    }, [ddlList]);

    const openDetailDDLModal = (id: number) => {
        return () => {
            setIdDDL(id);
            openPopup();
        };
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        const newTaskIds = normList;
        const [removed] = newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, removed);

        const payload: number[] = newTaskIds.map((item) => item.id);

        setNormList(newTaskIds);
        onUpdateQueue(payload);
    };

    const handleDeleteDDL = (id: number) => {
        return () => {
            onDelete(id);
        };
    };

    return (
        <>
            <UIFlex className={cx('container')} gap={40}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="blog-list">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={cx('container')}>
                                {!isLoadingDDLData ? (
                                    normList.map((item, index) => (
                                        <DDLCard
                                            key={item.id}
                                            index={index}
                                            data={item}
                                            isLoadingDelete={isLoadingDelete}
                                            onSaveDDL={onSaveDDL}
                                            openDetailDDLModal={openDetailDDLModal(
                                                item.id
                                            )}
                                            onDelete={handleDeleteDDL(item.id)}
                                        />
                                    ))
                                ) : (
                                    <SkeletonDDLCard />
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <UICard className={cx('addBlock')}>
                    <Icon
                        type="plus-circle-outlined"
                        className={cx('icon')}
                        size="lg"
                        onClick={
                            ![eUserRoles.BUISNESS].includes(role as eUserRoles)
                                ? onCreateDDL
                                : () => {}
                        }
                    />
                </UICard>
            </UIFlex>

            {/* TODO: вынести в верхнеуровневый компонент */}
            <ModalDetailDDL
                opened={isOpened}
                onClose={closePopup}
                idDDL={idDDL}
            />
        </>
    );
};
