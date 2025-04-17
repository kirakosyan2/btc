import React, {
    ChangeEvent,
    useCallback,
    useDeferredValue,
    useRef,
    useState,
} from 'react';
import { NodeApi, Tree } from 'react-arborist';
import { IdObj } from 'react-arborist/dist/module/types/utils';

import { useStyles } from '@hooks/useStyles';

import { TFolders } from '@src/redux/directoriesAndFiles/directoriesAndFiles';

import { UIButton } from '../Button';
import { UIFlex } from '../Flex';
import { Icon } from '../Icon';
import { UIInput } from '../Input';
import { Node } from './Node';
import styles from './styles.module.scss';

export type Props = {
    data: TFolders[];
    isLoadingCreateFolder: boolean;
    isLoadingCreateFile: boolean;
    indent?: number;
    rowHeight?: number;
    setExpansion: React.Dispatch<React.SetStateAction<string>>;
    getFileData: (fileId: string, expansion: string) => void;
    updateFilename: (fileId: string, filename: string) => void;
    updateFoldername: (folderId: string, folderName: string) => void;
    deleteFile: (file_id: string) => void;
    deleteFolder: (folder_id: string) => void;
    createFolder: (parent: string | null) => void;
    createFile: (folder: string | null) => void;
    openModalUpload: () => void;
};

type TRename = {
    id: string;
    name: string;
    node: NodeApi<TFolders>;
};

type TDelete = {
    ids: string[];
    nodes: NodeApi<TFolders>[];
};

type TCreate = {
    index: number;
    parentId: string | null;
    parentNode: NodeApi<TFolders> | null;
    type: 'internal' | 'leaf';
};

export const TreeFolder: React.FC<Props> = ({
    data,
    isLoadingCreateFolder,
    isLoadingCreateFile,
    indent = 24,
    rowHeight = 32,
    setExpansion,
    getFileData,
    updateFilename,
    updateFoldername,
    deleteFile,
    deleteFolder,
    createFolder,
    createFile,
    openModalUpload,
}) => {
    const cx = useStyles(styles);

    const [term, setTerm] = useState('');
    const treeRef = useRef<any>(null);

    const defferedTerm = useDeferredValue(term);

    const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        setTerm(search);
    }, []);

    const onSearchTerm = useCallback(
        (node: NodeApi<TFolders>, term: string) => {
            return node.data.name?.toLowerCase()?.includes(term.toLowerCase());
        },
        []
    );

    const createFileFolder = (
        <UIFlex gap={20} justify="space-between">
            <UIFlex gap={10}>
                <UIButton
                    onClick={() => treeRef.current.createInternal()}
                    title="Новая папка"
                    loading={isLoadingCreateFolder}
                    disabled={isLoadingCreateFolder}>
                    <Icon type="folder-add-outlined" size="xxs" />
                </UIButton>
                <UIButton
                    onClick={() => treeRef.current.createLeaf()}
                    title="Новый файл"
                    loading={isLoadingCreateFile}
                    disabled={isLoadingCreateFile}>
                    <Icon type="file-add-outlined" size="xxs" />
                </UIButton>
                <UIButton title="Загрузить архив" onClick={openModalUpload}>
                    <Icon type="upload-outlined" size="xxs" />
                </UIButton>
            </UIFlex>
            <UIInput placeholder="Поиск..." value={term} onChange={onSearch} />
        </UIFlex>
    );

    const getInfoFile = (tree: NodeApi<TFolders>[]) => {
        const filInfo = tree[0];

        if (filInfo) {
            const expansion = filInfo.data.name.split('.')[1];

            if (expansion) {
                getFileData(filInfo.data.id, expansion);
            } else {
                setExpansion('');
            }
        }
    };

    const onChangeName = ({ id, name, node }: TRename) => {
        if (node.isLeaf) {
            updateFilename(id, name);
        } else {
            updateFoldername(id, name);
        }
    };

    const onDelete = ({ ids, nodes }: TDelete) => {
        const node = nodes[0];
        const isFile = node.isLeaf;

        if (isFile) {
            deleteFile(ids[0]);
        } else {
            deleteFolder(ids[0]);
        }
    };

    const onCreate = ({
        type,
        parentId,
    }: TCreate): IdObj | Promise<IdObj | null> | null => {
        if (type === 'internal') {
            createFolder(parentId);
        }

        if (type === 'leaf') {
            createFile(parentId);
        }

        return null;
    };

    return (
        <div>
            {createFileFolder}
            <Tree
                className={cx('tree')}
                ref={treeRef}
                data={data}
                indent={indent}
                rowHeight={rowHeight}
                searchTerm={defferedTerm}
                searchMatch={onSearchTerm}
                onCreate={onCreate}
                onSelect={getInfoFile}
                onRename={onChangeName}
                onDelete={onDelete}>
                {Node}
            </Tree>
        </div>
    );
};
