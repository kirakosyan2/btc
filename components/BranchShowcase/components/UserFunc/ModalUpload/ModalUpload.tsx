import { UploadProps } from 'antd';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { DragAndDropFile } from '@components/_shared/DragAndDropFile';
import { UIFlex } from '@components/_shared/Flex';
import { Icon } from '@components/_shared/Icon';
import { UIModal } from '@components/_shared/Modal';
import { UISpinner } from '@components/_shared/Spinner';
import { UITitle } from '@components/_shared/Title';
import { UITypography } from '@components/_shared/Typography';

import { useStyles } from '@hooks/useStyles';

import { useUploadFileMutation } from '@src/redux/directoriesAndFiles/directoriesAndFiles';
import { notificationEasy } from '@src/utils';

import styles from './styles.module.scss';

type Props = {
    open: boolean;
    onClose: () => void;
};

const ACCEPT = ['zip', 'rar', '7zip'];

export const ModalUpload: FC<Props> = ({ open, onClose }) => {
    const cx = useStyles(styles);
    const { id: branch_id } = useParams();

    // Mutations
    const [uploadFile, { isLoading: isLoadingUpload }] =
        useUploadFileMutation();

    const props: UploadProps = {
        accept: ACCEPT.map((item) => `.${item}`).join(', '),
        showUploadList: false,
        multiple: false,

        customRequest: ({ onSuccess }) => {
            if (onSuccess) {
                onSuccess('');
            }
        },
        beforeUpload: async (file) => {
            if (branch_id) {
                const formData = new FormData();
                formData.append('project', file);

                const res: any = await uploadFile({
                    branch_id,
                    formData,
                });

                if (res?.data?.root_folder_id) {
                    notificationEasy({
                        content: 'Файл успешно загружен',
                    });

                    onClose();
                } else {
                    notificationEasy({
                        type: 'error',
                        content: 'Произошла ошибка при загрузке файла',
                    });
                }
            }
        },
    };

    return (
        <UIModal
            open={open}
            onCancel={onClose}
            onClose={onClose}
            footer={false}
            destroyOnClose
            title={
                <UITitle level={3} className={cx('title')}>
                    Загрузить архив
                </UITitle>
            }>
            <UIFlex className={cx('container')}>
                <DragAndDropFile
                    {...props}
                    className={cx('dragging')}
                    disabled={isLoadingUpload}>
                    {isLoadingUpload ? (
                        <UISpinner className={cx('spinner')} size="large" />
                    ) : (
                        <Icon
                            type="inbox-outlined"
                            size="lg"
                            className={cx('icon')}
                        />
                    )}

                    <UITypography className={cx('text')}>
                        Кликните или перетащите архив в эту область для загрузки
                    </UITypography>
                </DragAndDropFile>
            </UIFlex>
        </UIModal>
    );
};
