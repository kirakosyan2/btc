import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ChecklistView } from './Checklist.view';

import { UIForm } from '@components/_shared/Form';
import { TStoryKey, useCheckListQuery } from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import {
    UpdateReleaseList,
    useSendCheckListMutation,
    useTypesCheckListsQuery,
    useUpdateReleaseListMutation,
} from '@src/redux/types/type';
import { notificationEasy } from '@src/utils';

type Props = {
    isReference: boolean;
};

type FormProps = {
    receiver_email: string;
    release_type: string;
    story_key: TStoryKey[];
    nexus_distributive_link: string;
    product_owner: string;
    architector_dka_sigma_login: string;
    release_manager: string;
    release_2ls: string;
    release_approuver: string;
    description: string;
    comment: string;
};

export type DevelopList = {
    label: string;
    value: string;
};

export const Checklist: React.FC<Props> = ({ isReference }) => {
    const { id: etl_id } = useParams();
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: optionsCheckList, isLoading: isLoadingOptions } =
        useTypesCheckListsQuery();
    const { data: checkList } = useCheckListQuery(etl_id as string, {
        skip: !etl_id,
    });

    // Mutations
    const [updateCheckList, { isLoading: isLoadingUpdateCheckList }] =
        useUpdateReleaseListMutation();

    const [sendMail, { isLoading: isLoadingSendMail }] =
        useSendCheckListMutation();

    useEffect(() => {
        if (checkList) {
            form.setFieldsValue({
                receiver_email: checkList.receiver_email,
                release_type: checkList.release_type,
                story_key: checkList.story_key,
                nexus_distributive_link: checkList.nexus_distributive_link,
                product_owner: checkList.product_owner,
                architector_dka_sigma_login:
                    checkList.architector_dka_sigma_login,
                release_manager: checkList.release_manager,
                release_2ls: checkList.release_2ls,
                release_approuver: checkList.release_approuver,
                description: checkList.description,
                comment: checkList.comment,
            });
        }
    }, [checkList]);

    const onChangeField = debounce(async (fields: FormProps) => {
        if (isReference) return;

        const payload: UpdateReleaseList = {
            id: String(checkList?.id),
            ...fields,
        };

        const res: any = await updateCheckList(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно обновлены',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при обновлении данных',
            });
        }
    }, 700);

    const handleSendMailCL = async () => {
        if (isReference) return;

        const res: any = await sendMail(checkList?.id as string);

        if (res?.data) {
            notificationEasy({
                content: 'Чек-лист успешно отправлен',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    'Произошла ошибка при отправлении чек-листа, попробуйте снова',
            });
        }
    };

    return (
        <UIForm
            layout="vertical"
            form={form}
            onValuesChange={(_, allValues) => onChangeField(allValues)}>
            <ChecklistView
                optionsCheckList={optionsCheckList ?? []}
                isLoadingUpdateCheckList={isLoadingUpdateCheckList}
                isLoadingOptions={isLoadingOptions}
                role={role}
                handleSendMailCL={handleSendMailCL}
                isLoadingSendMail={isLoadingSendMail}
            />
        </UIForm>
    );
};
