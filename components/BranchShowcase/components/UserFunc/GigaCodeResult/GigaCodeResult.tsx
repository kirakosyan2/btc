import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';

import { TUpdateFilePayload } from '@src/redux/directoriesAndFiles/directoriesAndFiles';
import { GigaCodeResponce } from '@src/redux/gigaCode/gigaCode';
import { notificationEasy } from '@src/utils';

import { GigaCodeResultView } from './GigaCodeResult.view';

type Props = {
    expansion: string;
    gigaCodeData?: GigaCodeResponce;
    file_id: string;
    onClose: () => void;
    updateFile: any;
    getFile: any;
};

type FormProps = {
    editor: string;
};

export const GigaCodeResult: React.FC<Props> = ({
    expansion,
    gigaCodeData,
    file_id,
    onClose,
    updateFile,
    getFile,
}) => {
    const [form] = Form.useForm();
    const { id: branch_id } = useParams();
    const [loading, seLoading] = useState(false);

    useEffect(() => {
        if (gigaCodeData) {
            form.setFieldsValue({
                answer: gigaCodeData.answer.comment,
                editor: gigaCodeData.answer?.code ?? '',
            });
        }
    }, [gigaCodeData]);

    // TODO: иправить этот позор, начиная с UserFunc
    const onSubmit = async ({ editor }: FormProps) => {
        seLoading(true);

        const payload: TUpdateFilePayload = {
            branch_id: branch_id as string,
            file_id,
            file_data: editor,
        };

        const res: any = await updateFile(payload);

        await getFile({
            branchId: branch_id as string,
            fileId: file_id,
        });

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно обновлены',
            });
            onClose();
        } else {
            notificationEasy({
                type: 'error',
                content: 'Произошла ошибка при изменении данных',
            });
        }

        seLoading(false);
    };

    return (
        <UIForm form={form} layout="vertical" onFinish={onSubmit}>
            <GigaCodeResultView
                expansion={expansion}
                isLoadingUpdateCode={loading}
                onClose={onClose}
            />
        </UIForm>
    );
};
