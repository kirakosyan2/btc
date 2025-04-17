import { CSSProperties } from 'react';
import { NodeApi, TreeApi } from 'react-arborist';

import { UIButton } from '@components/_shared/Button';
import { Icon } from '@components/_shared/Icon';
import { UIInput } from '@components/_shared/Input';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
    style: CSSProperties;
    node: NodeApi<any>;
    tree: TreeApi<any>;
    dragHandle?: (el: HTMLDivElement | null) => void;
    preview?: boolean;
};

export const Node = ({ node, style, dragHandle, tree }: Props) => {
    const cx = useStyles(styles);

    return (
        <div
            className={cx(
                `node-container`,
                `${node.state.isSelected ? 'isSelected' : ''}`
            )}
            style={style}
            ref={dragHandle}>
            <div
                className={cx('node-content')}
                onClick={() => node.isInternal && node.toggle()}>
                {node.isLeaf ? (
                    <>
                        <span className={cx('arrow')}></span>
                        <span className={cx('file-folder-icon')}>
                            <Icon
                                type="file-filled"
                                size="ms"
                                className={cx('file-icon')}
                            />
                        </span>
                    </>
                ) : (
                    <>
                        <span className={cx('arrow')}>
                            {node.isOpen ? (
                                <Icon type="caret-down-filled" size="xs" />
                            ) : (
                                <Icon type="caret-right-filled" size="xs" />
                            )}
                        </span>
                        <span className={cx('file-folder-icon')}>
                            <Icon
                                type="folder-filled"
                                size="ms"
                                className={cx('folder-icon')}
                            />
                        </span>
                    </>
                )}
                <span className={cx('node-text')}>
                    {node.isEditing ? (
                        <UIInput
                            defaultValue={node.data?.name}
                            onFocus={(e) => e.currentTarget.select()}
                            onBlur={() => node.reset()}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') node.reset();
                                if (e.key === 'Enter')
                                    node.submit(e.currentTarget.value);
                            }}
                            autoFocus
                        />
                    ) : (
                        <span>{node.data?.name}</span>
                    )}
                </span>
            </div>

            {node.level !== 0 && (
                <div className={cx('file-actions')}>
                    <div className={cx('folderFileActions')}>
                        <UIButton onClick={() => node.edit()} title="Rename...">
                            <Icon type="edit-outlined" size="xs" />
                        </UIButton>
                        <UIButton
                            onClick={() => tree.delete(node.id)}
                            title="Delete">
                            <Icon type="close-outlined" size="xs" />
                        </UIButton>
                    </div>
                </div>
            )}
        </div>
    );
};
