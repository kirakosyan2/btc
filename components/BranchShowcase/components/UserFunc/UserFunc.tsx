import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import {
    TFileCreate,
    TFileDelete,
    TFolderCreate,
    TFolderDelete,
    TFolderPayload,
    TUpdateFilePayload,
    TUpdateFolderPayload,
    useCreateFileMutation,
    useCreateFolderMutation,
    useDeleteFileMutation,
    useDeleteFolderMutation,
    useGetFileMutation,
    useGetFoldersQuery,
    useUpdateFileMutation,
    useUpdateFolderMutation,
} from '@src/redux/directoriesAndFiles/directoriesAndFiles';
import { useUpdateGigaCodeDDLMutation } from '@src/redux/gigaCode/gigaCode';
import { notificationEasy } from '@src/utils';

import { ModalGigaCode } from './ModalGigaCode';
import { UserFuncView } from './UserFunc.view';
import styles from './styles.module.scss';

type FormProps = {
    editor: string;
};

export const UserFunc: React.FC = () => {
    const cx = useStyles(styles);
    const { id: branch_id } = useParams();
    const [form] = Form.useForm();

    const { isOpened, openPopup, closePopup } = usePopupControls();

    const [expansion, setExpansion] = useState('');
    const [fileId, setFileId] = useState('');

    // Query
    const { data: folders, isLoading: isLoadingFolders } = useGetFoldersQuery(
        branch_id as string,
        {
            skip: !branch_id,
        }
    );

    // Mutations
    const [getFile, { data: dataEditor }] = useGetFileMutation();
    const [updateFile] = useUpdateFileMutation();
    const [updateFolder] = useUpdateFolderMutation();
    const [deleteFile] = useDeleteFileMutation();
    const [deleteFolder] = useDeleteFolderMutation();
    const [createFolder, { isLoading: isLoadingCreateFolder }] =
        useCreateFolderMutation();
    const [createFile, { isLoading: isLoadingCreateFile }] =
        useCreateFileMutation();

    const [
        updateGigaCode,
        { data: gigaCodeData, isLoading: isLoadingGigaCode },
    ] = useUpdateGigaCodeDDLMutation();

    useEffect(() => {
        if (dataEditor) {
            form.setFieldValue('editor', dataEditor.file_data);
        }
    }, [dataEditor]);

    const getFileData = async (fileId: string, expansionFile: string) => {
        const payload: TFolderPayload = {
            branchId: branch_id as string,
            fileId,
        };

        setExpansion(expansionFile);
        setFileId(fileId);

        const res: any = await getFile(payload);

        if (res.data)
            notificationEasy({
                content: 'Данные успешно получены',
            });

        if (res?.data?.error) {
            notificationEasy({
                type: 'error',
                content:
                    res.data.error ?? 'Произошла ошибка при получении данных',
            });
        }
    };

    const updateFilename = async (fileId: string, filename: string) => {
        const payload: TUpdateFilePayload = {
            branch_id: branch_id as string,
            file_id: fileId,
            name: filename,
        };

        const res: any = await updateFile(payload);

        if (res.data)
            notificationEasy({
                content: 'Имя файла успешно обновлено',
            });

        if (res?.data?.error) {
            notificationEasy({
                type: 'error',
                content:
                    res.data.error ??
                    'Произошла ошибка при обновлении имени файла',
            });
        }
    };

    const updateFoldername = async (folderId: string, folderName: string) => {
        const payload: TUpdateFolderPayload = {
            branch_id: branch_id as string,
            folder_id: folderId,
            name: folderName,
        };

        const res: any = await updateFolder(payload);

        if (res.data)
            notificationEasy({
                content: 'Название папки успешно обновлено',
            });

        if (res?.data?.error) {
            notificationEasy({
                type: 'error',
                content:
                    res.data.error ??
                    'Произошла ошибка при обновлении названия папки',
            });
        }
    };

    const hanleDeleteFile = async (file_id: string) => {
        const payload: TFileDelete = {
            branch_id: branch_id as string,
            file_id,
        };

        const res: any = await deleteFile(payload);

        if (res.data)
            notificationEasy({
                content: 'Файл успешно удален',
            });

        if (res?.data?.error) {
            notificationEasy({
                type: 'error',
                content:
                    res.data.error ?? 'Произошла ошибка при удалении файла',
            });
        }
    };

    const hanleDeleteFolder = async (folder_id: string) => {
        const payload: TFolderDelete = {
            branch_id: branch_id as string,
            folder_id,
        };

        const res: any = await deleteFolder(payload);

        if (res.data)
            notificationEasy({
                content: 'Папка успешно удалена',
            });

        if (res?.data?.error) {
            notificationEasy({
                type: 'error',
                content:
                    res.data.error ?? 'Произошла ошибка при удалении папки',
            });
        }
    };

    const hanleCreateFolder = async (parent: string | null) => {
        const payload: TFolderCreate = {
            branch_id: branch_id as string,
            parent,
        };

        const res: any = await createFolder(payload);

        if (res.data)
            notificationEasy({
                content: 'Папка успешно создана',
            });

        if (res?.data?.error) {
            notificationEasy({
                type: 'error',
                content:
                    res.data.error ?? 'Произошла ошибка при создании папки',
            });
        }
    };

    const hanleCreateFile = async (folder: string | null) => {
        const payload: TFileCreate = {
            branch_id: branch_id as string,
            file_data: '',
            folder,
            name: 'null',
        };

        const res: any = await createFile(payload);

        if (res.data)
            notificationEasy({
                content: 'Файл успешно создан',
            });

        if (res?.data?.error) {
            notificationEasy({
                type: 'error',
                content:
                    res.data.error ?? 'Произошла ошибка при создании файла',
            });
        }
    };

    const updateFileData = async (code: string) => {
        const payload: TUpdateFilePayload = {
            branch_id: branch_id as string,
            file_id: fileId,
            file_data: code,
        };

        const res: any = await updateFile(payload);

        if (res.data)
            notificationEasy({
                content: 'Файл успешно обновлен',
            });

        if (res?.data?.error) {
            notificationEasy({
                type: 'error',
                content:
                    res.data.error ?? 'Произошла ошибка при обновлении файла',
            });
        }
    };

    const onFixCode = async () => {
        const code = await form.getFieldValue('editor');

        const res: any = await updateGigaCode({
            sql_code: code,
        });

        if (res?.data?.answer) {
            openPopup();
        } else {
            notificationEasy({
                type: 'error',
                content: 'Произошла ошибка при отправке кода в GigaCode',
            });
        }
    };

    const onSubmit = async ({ editor }: FormProps) => {
        await updateFileData(editor);
    };

    return (
        <>
            <UICard
                styles={{
                    body: {
                        height: '90vh',
                    },
                }}>
                <UITitle level={3} className={cx('title')}>
                    Пользовательские функции
                </UITitle>
                <Form form={form} onFinish={onSubmit}>
                    <UserFuncView
                        data={folders ?? []}
                        expansion={expansion}
                        isLoadingCreateFolder={isLoadingCreateFolder}
                        isLoadingCreateFile={isLoadingCreateFile}
                        isLoadingFolders={isLoadingFolders}
                        isLoadingGigaCode={isLoadingGigaCode}
                        setExpansion={setExpansion}
                        getFileData={getFileData}
                        updateFilename={updateFilename}
                        updateFoldername={updateFoldername}
                        deleteFile={hanleDeleteFile}
                        deleteFolder={hanleDeleteFolder}
                        createFolder={hanleCreateFolder}
                        createFile={hanleCreateFile}
                        onFixCode={onFixCode}
                    />
                </Form>
            </UICard>

            <ModalGigaCode
                expansion={expansion}
                open={isOpened}
                gigaCodeData={gigaCodeData}
                file_id={fileId}
                onClose={closePopup}
                updateFile={updateFile}
                getFile={getFile}
            />
        </>
    );
};
