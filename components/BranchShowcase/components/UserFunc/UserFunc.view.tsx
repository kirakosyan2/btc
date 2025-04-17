import { Divider } from 'antd';
import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { FormJavaEditor } from '@components/_shared/Form/FormJavaEditor';
import { FormScalaEditor } from '@components/_shared/Form/FormScalaEditor';
import { FormXMLEditor } from '@components/_shared/Form/FormXMLEditor';
import { UISpinner } from '@components/_shared/Spinner';
import { TreeFolder } from '@components/_shared/TreeFolder';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import gigacode from '@assets/images/gigacode.png';

import { TFolders } from '@src/redux/directoriesAndFiles/directoriesAndFiles';

import { ModalUpload } from './ModalUpload';
import styles from './styles.module.scss';

type Props = {
    data: TFolders[];
    expansion: string;
    isLoadingCreateFolder: boolean;
    isLoadingCreateFile: boolean;
    isLoadingFolders: boolean;
    isLoadingGigaCode: boolean;
    setExpansion: React.Dispatch<React.SetStateAction<string>>;
    getFileData: (fileId: string, expansion: string) => void;
    updateFilename: (fileId: string, filename: string) => void;
    updateFoldername: (folderId: string, folderName: string) => void;
    deleteFile: (file_id: string) => void;
    deleteFolder: (folder_id: string) => void;
    createFolder: (parent: string | null) => void;
    createFile: (folder: string | null) => void;
    onFixCode: () => void;
};

export const UserFuncView: React.FC<Props> = ({
    data,
    expansion,
    isLoadingCreateFolder,
    isLoadingCreateFile,
    isLoadingFolders,
    isLoadingGigaCode,
    setExpansion,
    getFileData,
    updateFilename,
    updateFoldername,
    deleteFile,
    deleteFolder,
    createFolder,
    createFile,
    onFixCode,
}) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();

    return (
        <>
            <UIFlex vertical className={cx('container')} gap={20}>
                <UIFlex className={cx('container')} gap={20}>
                    {!isLoadingFolders ? (
                        <TreeFolder
                            data={data}
                            isLoadingCreateFolder={isLoadingCreateFolder}
                            isLoadingCreateFile={isLoadingCreateFile}
                            setExpansion={setExpansion}
                            getFileData={getFileData}
                            updateFilename={updateFilename}
                            updateFoldername={updateFoldername}
                            deleteFile={deleteFile}
                            deleteFolder={deleteFolder}
                            createFolder={createFolder}
                            createFile={createFile}
                            openModalUpload={openPopup}
                        />
                    ) : (
                        <UIFlex
                            className={cx('spinner')}
                            justify="center"
                            align="center">
                            <UISpinner size="large" />
                        </UIFlex>
                    )}

                    <Divider type="vertical" className={cx('divider')} />

                    {/* TODO: Объединить все editor в один компонент */}
                    {expansion === 'scala' && (
                        <FormScalaEditor
                            formProps={{
                                name: 'editor',
                                className: cx('editor'),
                            }}
                        />
                    )}

                    {expansion === 'java' && (
                        <FormJavaEditor
                            formProps={{
                                name: 'editor',
                                className: cx('editor'),
                            }}
                        />
                    )}

                    {expansion === 'xml' && (
                        <FormXMLEditor
                            formProps={{
                                name: 'editor',
                                className: cx('editor'),
                            }}
                        />
                    )}

                    {expansion && (
                        <UIFlex
                            justify="flex-end"
                            align="center"
                            gap={40}
                            className={cx('btnContainer')}>
                            {['java', 'scala'].includes(expansion) && (
                                <img
                                    src={gigacode}
                                    className={cx(
                                        'imageGigaCode',
                                        isLoadingGigaCode ? 'disabled' : ''
                                    )}
                                    alt="GigaCode"
                                    onClick={onFixCode}
                                />
                            )}
                            <UIButton type="primary" htmlType="submit">
                                Сохранить
                            </UIButton>
                        </UIFlex>
                    )}
                </UIFlex>
            </UIFlex>

            <ModalUpload open={isOpened} onClose={closePopup} />
        </>
    );
};
