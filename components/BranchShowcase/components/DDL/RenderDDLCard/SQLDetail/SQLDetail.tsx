import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';

import { usePopupControls } from '@hooks/usePopupControls';

import {
    SaveDDLPayload,
    useCurrentDDLQuery,
    useSaveDDLMutation,
} from '@src/redux/DDL/DDL';
import { useDdlCurrentBranchQuery } from '@src/redux/branches/branches';
import { useUpdateGigaCodeDDLMutation } from '@src/redux/gigaCode/gigaCode';
import { useAppSelector } from '@src/redux/store';
import { useUservarsQuery } from '@src/redux/userparams/userparams';
import { notificationEasy } from '@src/utils';

import { GigaCodeDDLModal } from '../GigaCodeDDLModal';
import { SQLDetailView } from './SQLDetail.view';

type Props = {
    idDDL?: number;
    isReference: boolean;
};

type FormProps = {
    sql: string;
};

export const SQLDetail: React.FC<Props> = ({ idDDL, isReference }) => {
    const [form] = Form.useForm();
    const { id: branch_id } = useParams();

    const { isOpened, openPopup, closePopup } = usePopupControls();

    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { refetch: refetchBranchData } = useDdlCurrentBranchQuery(
        branch_id as string,
        {
            skip: !branch_id,
        }
    );

    const { data: userParams } = useUservarsQuery(branch_id as string, {
        skip: !branch_id,
    });

    const { data: currentDDL } = useCurrentDDLQuery(
        { branch_id: String(branch_id), id: String(idDDL) },
        {
            skip: !idDDL || !branch_id,
        }
    );

    // Mutations
    const [saveDDL, { isLoading: isLoadingSave }] = useSaveDDLMutation();

    const [updateGigaCode, { isLoading: isLoadingOpen, data: gigaCodeData }] =
        useUpdateGigaCodeDDLMutation();

    useEffect(() => {
        if (currentDDL) {
            form.setFieldsValue({
                sql: currentDDL.code,
            });
        }
    }, [currentDDL]);

    const handleOpenGigaCodeModal = async () => {
        const sqlEditor = await form.getFieldValue('sql');

        const res: any = await updateGigaCode({
            sql_code: sqlEditor,
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

    const onSubmit = async ({ sql }: FormProps) => {
        if (isReference) return;

        const payload: SaveDDLPayload = {
            ddl_id: String(idDDL),
            branch_id: String(branch_id),
            code: sql,
        };

        const res: any = await saveDDL(payload);

        if (res?.data) {
            notificationEasy({
                content: 'DDL сохранен',
            });

            refetchBranchData();
        } else {
            notificationEasy({
                type: 'error',
                content: 'Произошла ошибка при сохранении DDL',
            });
        }
    };

    return (
        <>
            <UIForm onFinish={onSubmit} form={form}>
                <SQLDetailView
                    userParams={userParams}
                    role={role}
                    isLoadingSave={isLoadingSave}
                    onGigaCodeClick={handleOpenGigaCodeModal}
                    isLoadingOpen={isLoadingOpen}
                />
            </UIForm>

            <GigaCodeDDLModal
                ddl_id={idDDL}
                opened={isOpened}
                onClose={closePopup}
                gigaCodeData={gigaCodeData}
            />
        </>
    );
};
