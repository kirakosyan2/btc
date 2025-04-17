import React, { memo, useCallback, useMemo, useState } from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { UIForm } from '@components/_shared/Form';
import { Icon } from '@components/_shared/Icon';
import { UIInput } from '@components/_shared/Input';
import { LinkButton } from '@components/_shared/LinkButton';
import { UISwitch } from '@components/_shared/Switch';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';
import {
    NodeMeta,
    useUpdateActiveNodeitemMutation,
    useUpdateNodeMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';
import { CONFLUENCE_LINK } from '@src/utils/constants';
import { convertStringToBoolean } from '@src/utils/helpers';

import { Handle, Position } from '@xyflow/react';

import { ModalNodeDetail } from './ModalNodeDetail';
import styles from './styles.module.scss';

type Props = {
    onNodesDelete?: (id: any) => void;
    deletable?: boolean;
    dragHandle?: string;
    draggable?: boolean;
    dragging?: boolean;
    height?: number;
    id: string;
    isConnectable?: boolean;
    parentId?: string;
    positionAbsoluteX?: number;
    positionAbsoluteY?: number;
    selectable?: boolean;
    selected?: boolean;
    sourcePosition?: any;
    targetPosition?: any;
    type?: string;
    width?: number;
    zIndex?: number;
    data: {
        label: string;
        meta: NodeMeta;
    };
    role: eUserRoles | null;
};

const DEFAULT_NAME = 'Default_name';

export const CustomNode: React.FC<Props> = memo(
    ({ onNodesDelete, role, ...props }) => {
        const cx = useStyles(styles);
        const { isOpened, openPopup, closePopup } = usePopupControls();
        const [nameFlow, setNameFlow] = useState(
            props.data.label ?? DEFAULT_NAME
        );
        const [showContent, setShowContent] = useState(true);
        const [contentType, setContentType] = useState('');

        const nodeId = [{ id: props.id }];

        const {
            getIncrement,
            historicity,
            moveTable,
            dataQualityCheck,
            coalesceFiles,
            dmPreStage,
            hdfs2kafka,
            kafka2hdfs,
        } = props.data.meta;

        // TODO сделать enum на названия
        const nodeItemNames = useCallback((fieldName: string) => {
            switch (fieldName) {
                case 'get_increment':
                    return 'модуль извлечения инкремента';
                case 'dm_preStage':
                    return 'модуль формирования STG';
                case 'history':
                    return 'модуль формирования историчности';
                case 'data_qualityCheck':
                    return 'модуль проверки качества данных';
                case 'coalesce_files':
                    return 'модуль склейки файлов';
                case 'move_table':
                    return 'модуль перемещения данных в РА';
                case 'hdfs2kafka':
                    return 'модуль hdfs2kafka';
                case 'kafka2hdfs':
                    return 'модуль kafka2hdfs';

                default:
                    break;
            }
        }, []);

        const BLOCKS_CUSTOM_NODE = useMemo(
            () => [
                {
                    id: 1,
                    to: CONFLUENCE_LINK[0].link,
                    type: 'get_increment',
                    textBtn: 'модуль извлечения инкремента',
                    disabled: [eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    ),
                    checked:
                        typeof getIncrement.enabled === 'string'
                            ? convertStringToBoolean(getIncrement.enabled)
                            : getIncrement.enabled,
                },
                {
                    id: 2,
                    to: CONFLUENCE_LINK[5].link,
                    type: 'kafka2hdfs',
                    textBtn: 'модуль kafka2hdfs',
                    disabled: [eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    ),
                    checked:
                        typeof kafka2hdfs.enabled === 'string'
                            ? convertStringToBoolean(kafka2hdfs.enabled)
                            : kafka2hdfs.enabled,
                },
                {
                    id: 3,
                    to: CONFLUENCE_LINK[1].link,
                    type: 'dm_preStage',
                    textBtn: 'модуль формирования stg',
                    disabled: [eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    ),
                    checked:
                        typeof dmPreStage.enabled === 'string'
                            ? convertStringToBoolean(dmPreStage.enabled)
                            : dmPreStage.enabled,
                },
                {
                    id: 4,
                    to: CONFLUENCE_LINK[2].link,
                    type: 'history',
                    textBtn: 'модуль формирования историчности',
                    disabled: [eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    ),
                    checked:
                        typeof historicity.enabled === 'string'
                            ? convertStringToBoolean(historicity.enabled)
                            : historicity.enabled,
                },
                {
                    id: 5,
                    to: CONFLUENCE_LINK[3].link,
                    type: 'data_qualityCheck',
                    textBtn: 'модуль проверки качества данных',
                    disabled: [eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    ),
                    checked:
                        typeof dataQualityCheck.enabled === 'string'
                            ? convertStringToBoolean(dataQualityCheck.enabled)
                            : dataQualityCheck.enabled,
                },
                {
                    id: 6,
                    to: CONFLUENCE_LINK[4].link,
                    type: 'coalesce_files',
                    textBtn: 'модуль склейки файлов',
                    disabled: [eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    ),
                    checked:
                        typeof coalesceFiles.enabled === 'string'
                            ? convertStringToBoolean(coalesceFiles.enabled)
                            : coalesceFiles.enabled,
                },
                {
                    id: 7,
                    to: CONFLUENCE_LINK[5].link,
                    type: 'move_table',
                    textBtn: 'модуль перемещения данных в ра',
                    disabled: [eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    ),
                    checked:
                        typeof moveTable.enabled === 'string'
                            ? convertStringToBoolean(moveTable.enabled)
                            : moveTable.enabled,
                },
                {
                    id: 8,
                    to: CONFLUENCE_LINK[5].link,
                    type: 'hdfs2kafka',
                    textBtn: 'модуль hdfs2kafka',
                    disabled: [eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    ),
                    checked:
                        typeof hdfs2kafka.enabled === 'string'
                            ? convertStringToBoolean(hdfs2kafka.enabled)
                            : hdfs2kafka.enabled,
                },
            ],
            [
                getIncrement.enabled,
                dmPreStage.enabled,
                historicity.enabled,
                dataQualityCheck.enabled,
                coalesceFiles.enabled,
                moveTable.enabled,
            ]
        );

        const [blocks, setBlocks] = useState(BLOCKS_CUSTOM_NODE);

        // Mutations
        const [updateNodeOption, { isLoading: isLoadingUpdateName }] =
            useUpdateNodeMutation();
        const [updateActiveitem] = useUpdateActiveNodeitemMutation();

        const onChangeNameFlow = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                e.stopPropagation();
                const value = e.target.value;
                setNameFlow(value);
            },
            []
        );

        const onBlur = useCallback(async () => {
            const payload = {
                id: props.id,
                name: nameFlow,
            };

            const res: any = await updateNodeOption(payload);

            if (res?.data) {
                notificationEasy({
                    content: 'Имя ноды успешно изменено',
                });
            } else {
                notificationEasy({
                    type: 'error',
                    content:
                        res?.error.data.detail ??
                        'Произошла ошибка при изменении имени ноды',
                });
            }
        }, [nameFlow]);

        const onChangeSwitch = async (field: string, enabled: boolean) => {
            let payload;

            if (field === 'hdfs2kafka' || field === 'kafka2hdfs') {
                const normField = field.split(/(\d+)/).join('_');
                payload = {
                    id: props.id,
                    [normField]: enabled,
                };
            } else {
                payload = {
                    id: props.id,
                    [field]: enabled,
                };
            }

            const res: any = await updateActiveitem(payload);

            if (res?.data) {
                notificationEasy({
                    content: `Параметр "${nodeItemNames(field)}" успешно изменен`,
                });
            } else {
                notificationEasy({
                    type: 'error',
                    content:
                        res?.error.data.detail ??
                        'Произошла ошибка при изменении параметра',
                });
            }
        };

        const toggleShowContent = () => {
            setShowContent((prev) => !prev);

            if (!showContent) {
                setBlocks(BLOCKS_CUSTOM_NODE);
            } else {
                const newBlocks = BLOCKS_CUSTOM_NODE.filter(
                    (block) => block.checked
                );
                setBlocks(newBlocks);
            }
        };

        const openModalDetail = (type: string) => {
            return () => {
                setContentType(type);
                openPopup();
            };
        };

        return (
            <>
                <UIForm>
                    <UICard className={cx('container')}>
                        <Handle
                            type="target"
                            position={Position.Top}
                            id="d"
                            style={{
                                width: '15px',
                                height: '15px',
                                cursor: 'pointer',
                            }}
                        />
                        <div>
                            <UIFlex className={cx('header')}>
                                <UIInput
                                    value={nameFlow}
                                    onChange={onChangeNameFlow}
                                    onBlur={onBlur}
                                    disabled={
                                        isLoadingUpdateName ||
                                        [eUserRoles.BUISNESS].includes(
                                            role as eUserRoles
                                        )
                                    }
                                    placeholder="Введите имя ноды"
                                    size="large"
                                />
                                <Icon
                                    className={cx(
                                        'outlined',
                                        showContent ? 'top' : 'bottom'
                                    )}
                                    type="right-outlined"
                                    onClick={toggleShowContent}
                                />
                            </UIFlex>

                            <div className={cx('content')}>
                                <UIFlex vertical gap={15}>
                                    {blocks.map((block) => (
                                        <UIFlex
                                            justify="space-between"
                                            className={cx('item')}
                                            gap={10}
                                            key={block.id}>
                                            <LinkButton
                                                to={block.to}
                                                target="_blank"
                                                className={cx('iconWrapper')}>
                                                <Icon
                                                    type="confluence"
                                                    size="xs"
                                                    className={cx('icon')}
                                                />
                                            </LinkButton>
                                            <UIButton
                                                type="primary"
                                                className={cx('btn')}
                                                size="large"
                                                onClick={openModalDetail(
                                                    block.type
                                                )}>
                                                {block.textBtn}
                                            </UIButton>
                                            <UISwitch
                                                defaultChecked={block.checked}
                                                onChange={(e) =>
                                                    onChangeSwitch(
                                                        block.type,
                                                        e
                                                    )
                                                }
                                                disabled={[
                                                    eUserRoles.BUISNESS,
                                                ].includes(role as eUserRoles)}
                                            />
                                        </UIFlex>
                                    ))}
                                </UIFlex>
                            </div>

                            <UIFlex justify="center" className={cx('footer')}>
                                <Icon
                                    className={cx('delete')}
                                    type="delete-outlined"
                                    onClick={
                                        [eUserRoles.BUISNESS].includes(
                                            role as eUserRoles
                                        )
                                            ? () => {}
                                            : () => onNodesDelete?.(nodeId)
                                    }
                                />
                            </UIFlex>
                        </div>
                        <Handle
                            type="source"
                            position={Position.Bottom}
                            id="b"
                            style={{
                                width: '15px',
                                height: '15px',
                                cursor: 'pointer',
                            }}
                        />
                    </UICard>
                </UIForm>

                <ModalNodeDetail
                    open={isOpened}
                    type={contentType}
                    threadId={props.id}
                    onClose={closePopup}
                />
            </>
        );
    }
);

CustomNode.displayName = 'CustomNode';
