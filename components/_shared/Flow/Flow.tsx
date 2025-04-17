import React, { useCallback, useEffect, useMemo } from 'react';

import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';
import {
    CreateNodePaylaod,
    DeleteEdgePaylaod,
    Nodes,
    UpdateNodePaylaod,
    useCreateNodeMutation,
    useDeleteEdgeMutation,
    useDeleteNodeMutation,
    useNodesQuery,
    useUpdateNodeMutation,
} from '@src/redux/nodes/nodes';
import { notificationEasy } from '@src/utils';

import {
    Background,
    Controls,
    MarkerType,
    MiniMap,
    NodeTypes,
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/style.css';

import { UIButton } from '../Button';
import { CustomNode } from './components/CustomNode/CustomNode';
import styles from './styles.module.scss';

type NewEdges = {
    source: string;
    target: string;
};

type NormNewEdges = {
    [key: string]: number[];
};

type NormEdge = {
    id: string;
    source: string;
    target: string;
    sourceHandle: string;
    targetHandle: string;
    markerEnd: {
        type: MarkerType;
        width: number;
        height: number;
        color: string;
    };
};

type Props = {
    idDML?: number;
    branchId?: string;
    role: eUserRoles | null;
};

const PRO_OPTIONS = { hideAttribution: true };
const EDGE_OPTIONS = {
    animated: true,
};
const TYPE_NODE = 'textUpdater';
const DEFAULT_NAME = 'Default_name';

export const UIFlow: React.FC<Props> = ({ idDML, branchId, role }) => {
    const cx = useStyles(styles);
    const isReference = location.pathname.includes('reference');

    // Query
    const { data: dataNodes } = useNodesQuery(
        {
            branchId: String(branchId),
            streamId: String(idDML),
        },
        {
            skip: !idDML || !branchId,
        }
    );

    // Mutations
    const [deleteNode] = useDeleteNodeMutation();
    const [createNode, { isLoading: isLoadingCreate }] =
        useCreateNodeMutation();
    const [updateNodes] = useUpdateNodeMutation();
    const [deleteEdges] = useDeleteEdgeMutation();

    const initialNodes = useMemo(
        () =>
            dataNodes
                ? dataNodes?.map(({ id, position, name, ...rest }) => ({
                      id: String(id),
                      position: position,
                      data: { label: name, meta: rest },
                      type: TYPE_NODE,
                  }))
                : [],
        [dataNodes, idDML, branchId]
    );

    // Нормализация связей
    const normEdges = (data: Nodes[]) => {
        const normEdgesArr: NormEdge[] = [];

        data.forEach((item) => {
            item.thread_relations.forEach((relation) => {
                normEdgesArr.push({
                    id: `${new Date().getMilliseconds()} ${Math.random()}`,
                    source: String(item.id),
                    target: String(relation),
                    targetHandle: 'd',
                    sourceHandle: 'b',
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 40,
                        height: 40,
                        color: 'black',
                    },
                });
            });
        });

        return normEdgesArr ?? [];
    };

    const createNewPositionForNewNode = () => {
        const min = Math.min(nodes.length);
        const max = Math.max(nodes.length);
        return {
            x: Math.floor(Math.random() * (max - min + 200)) + min,
            y: Math.floor(Math.random() * (max - min + 200)) + min,
        };
    };

    const isEdit = (role: eUserRoles) => {
        return (
            ![eUserRoles.BUISNESS].includes(role as eUserRoles) && !isReference
        );
    };

    const initialeEdges = useMemo(
        () => normEdges(dataNodes || []),
        [dataNodes]
    );

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialeEdges);

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialeEdges);
    }, [initialeEdges, initialNodes, dataNodes]);

    // Удаление рекламы Flow
    useEffect(() => {
        const elems = document.querySelectorAll(
            '[aria-label="React Flow attribution"]'
        );

        if (elems.length) {
            elems.forEach((elem) => elem.remove());
        }
    }, []);

    const onConnect = useCallback(
        (connection: any) =>
            setEdges((oldEdges) => {
                connection['markerEnd'] = {};
                connection['style'] = {
                    strokeWidth: 2,
                    stroke: 'black',
                };

                const edge = addEdge(connection, oldEdges);

                const newEdges = [
                    ...oldEdges,
                    {
                        source: connection.source,
                        target: connection.target,
                    },
                ];

                onEdgeUpdate(newEdges);
                return edge;
            }),
        [setEdges]
    );

    const onEdgeUpdate = async (newEdges: NewEdges[]) => {
        const normEdges: NormNewEdges = {};

        newEdges.forEach(({ source, target }) => {
            if (normEdges[source]) {
                normEdges[source].push(Number(target));
            } else {
                normEdges[source] = [Number(target)];
            }
        });

        // TODO: подумать над оптимизацией
        for (const [key, value] of Object.entries(normEdges)) {
            const payload = {
                id: key,
                thread_relations: value,
            };

            await updateNodes(payload);
        }
    };

    const onEdgeDelete = useCallback(async (deletedEdge: any[]) => {
        const payload: DeleteEdgePaylaod = {
            sourse: deletedEdge[0]?.source,
            target: deletedEdge[0]?.target,
        };

        const res: any = await deleteEdges(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Связь успешно удалено',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ?? 'Произошла ошибка при удалении',
            });
        }
    }, []);

    const onDeleteNode = useCallback(async (deletedNode: any[]) => {
        const id = String(deletedNode[0].id);
        const res: any = await deleteNode(id);

        if (res?.data) {
            notificationEasy({
                content: 'Граф успешно удален',
            });

            setNodes((prev) =>
                prev.filter((item) => String(item.id) !== String(id))
            );
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ?? 'Произошла ошибка при удалении',
            });
        }
    }, []);

    const addNode = useCallback(async () => {
        const payload: CreateNodePaylaod = {
            branch: String(branchId),
            stream: String(idDML),
            name: DEFAULT_NAME,
            type: TYPE_NODE,
            position: createNewPositionForNewNode(),
            thread_relations: [],
        };

        const res: any = await createNode(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Граф успешно добавлен',
            });

            const { id, position, name, ...rest } = res.data;

            const resData = {
                id: String(id),
                position: position,
                data: { label: name, meta: rest },
                type: TYPE_NODE,
            };

            setNodes((prev) => [...prev, resData]);
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ?? 'Произошла ошибка при удалении',
            });
        }
    }, []);

    const onNodeDragStop = useCallback(
        async (_: React.MouseEvent<Element, MouseEvent>, data: any) => {
            const payload: UpdateNodePaylaod = {
                id: data.id,
                position: {
                    x: Math.round(data.position.x),
                    y: Math.round(data.position.y),
                },
            };

            await updateNodes(payload);
        },
        []
    );

    const nodeTypes: NodeTypes = useMemo(
        () => ({
            textUpdater: (props) => (
                <CustomNode
                    {...props}
                    onNodesDelete={onDeleteNode}
                    role={role}
                />
            ),
        }),
        []
    );

    return (
        <div className={cx('container')}>
            <UIButton
                type="primary"
                onClick={addNode}
                disabled={isLoadingCreate || !isEdit(role as eUserRoles)}
                loading={isLoadingCreate}>
                Добавить объект
            </UIButton>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={
                    isEdit(role as eUserRoles) ? onNodesChange : () => {}
                }
                onEdgesChange={
                    isEdit(role as eUserRoles) ? onEdgesChange : () => {}
                }
                onNodesDelete={
                    isEdit(role as eUserRoles) ? onDeleteNode : () => {}
                }
                onEdgesDelete={
                    isEdit(role as eUserRoles) ? onEdgeDelete : () => {}
                }
                onNodeDragStop={
                    isEdit(role as eUserRoles) ? onNodeDragStop : () => {}
                }
                onConnect={onConnect}
                defaultEdgeOptions={EDGE_OPTIONS}
                fitView
                proOptions={PRO_OPTIONS}
                deleteKeyCode={['Delete']}
                style={{ backgroundColor: '#F7F9FB' }}
                className={cx('react-flow')}>
                <Controls />
                <Background />
                <MiniMap className={cx('map')} />
            </ReactFlow>
        </div>
    );
};
