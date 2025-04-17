import React, { useEffect } from 'react';
import { ParticipantPSIView } from './ParticipantPSI.view';
import { UIForm } from '@components/_shared/Form';
import {
    UpdateReleaseList,
    useReleaseListQuery,
    useUpdateReleaseListMutation,
} from '@src/redux/types/type';
import { Form } from 'antd';
import { useDevelopersQuery } from '@src/redux/developers/developers';
import { notificationEasy } from '@src/utils';
import { debounce } from 'lodash';
import { useParams } from 'react-router-dom';
import { UUID } from '@src/types/types';
import { useAppSelector } from '@src/redux/store';

type FormProps = {
    product_owner: string;
    fullNameDKA: string;
    fullNameRM: string;
    fullNameLS: string;
    fullNameApproving: string;
    id: string;
};

export const ParticipantPSI: React.FC = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query

    const { data: developersList, isLoading: isLoadingDevelopers } = useDevelopersQuery();

    // Mutations
    const { data: PSI } = useReleaseListQuery(id as UUID, {
        skip: !id,
    });

    const [updatePSI, { isLoading: isLoadingUpdatePSI }] = useUpdateReleaseListMutation();

    useEffect(() => {
        if (PSI) {
            form.setFieldsValue({
                product_owner: PSI.product_owner,
                fullNameDKA: PSI.architector_dka_sigma_login,
                fullNameRM: PSI.release_manager,
                fullNameLS: PSI.release_2ls,
                fullNameApproving: PSI.release_approuver,
            });
        }
    }, [PSI]);

    const onChangeField = debounce(async (field: FormProps) => {
        const payload: UpdateReleaseList = {
            id: String(id),
            product_owner: field.product_owner,
            architector_dka_sigma_login: field.fullNameDKA,
            release_manager: field.fullNameRM,
            release_2ls: field.fullNameLS,
            release_approuver: field.fullNameApproving,
        };

        const res: any = await updatePSI(payload);

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
            form={form}
            layout="vertical"
            onValuesChange={(_, allValues) => onChangeField(allValues)}
        >
            <ParticipantPSIView
                isLoadingDevelopers={isLoadingDevelopers}
                developersList={developersList ?? []}
                isLoadingUpdatePSI={isLoadingUpdatePSI}
                role={role}
            />
        </UIForm>
    );
};
