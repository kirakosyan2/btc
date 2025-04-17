import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormInput } from '@components/_shared/Form/FormInput';
import { Icon } from '@components/_shared/Icon';

import { useStyles } from '@hooks/useStyles';

import { DataCurrentBranch } from '@src/redux/branches/branches';

import styles from './styles.module.scss';

type Props = {
    data: DataCurrentBranch;
    isLoadingDelete: boolean;
    index: number;
    onSaveDDL: (ddl_id: number, value: string) => void;
    openDetailDDLModal: () => void;
    onDelete: () => void;
};

export const DDLCard: React.FC<Props> = ({
    data,
    isLoadingDelete,
    index,
    onSaveDDL,
    openDetailDDLModal,
    onDelete,
}) => {
    const cx = useStyles(styles);

    return (
        <Draggable key={data.id} draggableId={String(data.id)} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={cx('container')}>
                    <UICard className={cx('container')}>
                        <UIFlex className={cx('containerBtn')} gap={10}>
                            <Icon
                                type="holder-outlined"
                                className={cx('icon')}
                            />
                            <FormInput
                                formProps={{
                                    style: { width: '100%' },
                                    label: 'Название DDL',
                                }}
                                inputProps={{
                                    defaultValue: data.name,
                                    onBlur: (e) =>
                                        onSaveDDL(data.id, e.target.value),
                                }}
                            />
                            <UIButton
                                className={cx('btn')}
                                type="primary"
                                size="middle"
                                onClick={openDetailDDLModal}>
                                Настроить DDL
                            </UIButton>
                            <UIButton
                                className={cx('btn', 'danger')}
                                size="middle"
                                loading={isLoadingDelete}
                                disabled={isLoadingDelete}
                                onClick={onDelete}>
                                Удалить DDL
                            </UIButton>
                        </UIFlex>
                    </UICard>
                </div>
            )}
        </Draggable>
    );
};
