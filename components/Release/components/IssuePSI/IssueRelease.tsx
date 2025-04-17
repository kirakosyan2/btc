import React, { useEffect } from 'react';
import { IssueReleaseView } from './IssueRelease.view';
import { UIForm } from '@components/_shared/Form';
import {
    UpdateReleaseList,
    useReleaseListQuery,
    useTypesCheckListsQuery,
    useUpdateReleaseListMutation,
} from '@src/redux/types/type';
import { Form } from 'antd';
import { debounce } from 'lodash';
import { notificationEasy } from '@src/utils';
import { UUID } from '@src/types/types';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@src/redux/store';

type FormProps = {
    id: string;
    summary: string;
    release_type: string;
    ci_subsystem: string;
    ci_pkap_as: string;
    nexus_distributive_link: string;
    target_of_pci: string;
    story_key: string;
    special_condition: string;
    result_of_pci: string;
    description: string;
};

export type optionCheckListList = {
    label: string;
    value: string;
};

export const IssueRelease: React.FC = () => {
    const [form] = Form.useForm();
    const { id } = useParams();
    // Query
    const { data: ISSUE } = useReleaseListQuery(id as UUID, {
        skip: !id,
    });
    const { role } = useAppSelector((store) => store.auth);

    // Mutations

    const [updateISSUE] = useUpdateReleaseListMutation();

    const { data: optionsCheckList } = useTypesCheckListsQuery();

    useEffect(() => {
        if (ISSUE) {
            form.setFieldsValue({
                summary: ISSUE.summary,
                release_type: ISSUE.release_type,
                ci_subsystem: ISSUE.ci_subsystem,
                ci_pkap_as: ISSUE.ci_pkap_as,
                nexus_distniputive: ISSUE.nexus_distributive_link,
                target_of_pci: ISSUE.target_of_pci,
                story_key: ISSUE.story_key,
                special_condition: ISSUE.special_conditions,
                result_of_pci: ISSUE.result_of_pci,
                description: ISSUE.description,
            });
        }
    }, [ISSUE]);

    const onChangeField = debounce(async (field: FormProps) => {
        const payload: UpdateReleaseList = {
            id: String(ISSUE?.id),
            summary: field.summary,
            release_type: field.release_type,
            ci_subsystem: field.ci_subsystem,
            ci_pkap_as: field.ci_pkap_as,
            nexus_distributive_link: field.nexus_distributive_link,
            target_of_pci: field.target_of_pci,
            story_key: field.story_key,
            special_condition: field.special_condition,
            result_of_pci: field.result_of_pci,
            description: field.description,
        };

        const res: any = await updateISSUE(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно обновлены',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при обновлении данных',
            });
        }
    }, 700);

    return (
        <UIForm
            onValuesChange={(_, allValues) => onChangeField(allValues)}
            form={form}
            layout="vertical"
        >
            <IssueReleaseView optionsCheckList={optionsCheckList ?? []}
                role={role} />
        </UIForm>
    );
};
