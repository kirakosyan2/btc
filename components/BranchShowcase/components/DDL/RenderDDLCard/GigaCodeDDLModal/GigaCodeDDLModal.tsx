import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';
import { UIModal } from '@components/_shared/Modal';

import { SaveDDLPayload, useSaveDDLMutation } from '@src/redux/DDL/DDL';
import { useDdlCurrentBranchQuery } from '@src/redux/branches/branches';
import { GigaCodeResponce } from '@src/redux/gigaCode/gigaCode';
import { notificationEasy } from '@src/utils';

import { GigaCodeModalDetail } from '../GigaCodeModalDetail';

// TODO: Переписать
type Props = {
    opened: boolean;
    onClose: () => void;
    gigaCodeData?: GigaCodeResponce;
    onApplyChanges?: (sqlCode: string) => void;
    ddl_id?: number;
};

export const GigaCodeDDLModal: React.FC<Props> = ({
    onClose,
    opened,
    gigaCodeData,
    ddl_id,
}) => {
    const [form] = Form.useForm();
    const { id: branch_id } = useParams();

    // Query
    const { refetch: refetchBranchData } = useDdlCurrentBranchQuery(
        branch_id as string,
        {
            skip: !branch_id,
        }
    );

    // Mutations
    const [saveDDL] = useSaveDDLMutation();

    useEffect(() => {
        if (gigaCodeData) {
            form.setFieldsValue({
                comment: gigaCodeData.answer.comment,
                sql_code: gigaCodeData.answer.code,
            });
        }
    }, [gigaCodeData]);

    const handleApplyChanges = async () => {
        const sqlCode = form.getFieldValue('sql_code');
        const payload: SaveDDLPayload = {
            ddl_id: String(ddl_id),
            branch_id: String(branch_id),
            code: sqlCode,
        };

        const res: any = await saveDDL(payload);

        if (res?.data) {
            notificationEasy({
                content: 'DDL сохранен',
            });

            refetchBranchData();
            onClose();
        } else {
            notificationEasy({
                type: 'error',
                content: 'Произошла ошибка при сохранении DDL',
            });
        }
    };

    return (
        <UIModal
            open={opened}
            onClose={onClose}
            onCancel={onClose}
            width={1400}
            footer={null}
            destroyOnClose>
            <UIForm form={form}>
                <GigaCodeModalDetail
                    onApply={handleApplyChanges}
                    onCancel={onClose}
                />
            </UIForm>
        </UIModal>
    );
};
