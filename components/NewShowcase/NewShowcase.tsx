import { UIForm } from '@components/_shared/Form';
import React from 'react';
import { NewShowcaseView } from './NewShowcase.view';
import { useInitiativeListQuery } from '@src/redux/initiative/initiative';
import { useFormatsListQuery } from '@src/redux/format/format';
import { useCreateShowcaseMutation } from '@src/redux/showcases/showcase';
import { notificationEasy } from '@src/utils';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/redux/store';

type FormProps = {
    initiative: number;
    name: string;
    confluence_link: string;
    format: number;
};

export const NewShowcase: React.FC = () => {
    const navigate = useNavigate();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: initiativeList, isLoading: isLoadingInitiatives } = useInitiativeListQuery();
    const { data: formatsList, isLoading: isLoadingFormats } = useFormatsListQuery();

    // Mutations
    const [createShowcase, { isLoading: isLoadingCreate }] = useCreateShowcaseMutation();

    const onSubmit = async (data: FormProps) => {
        const res: any = await createShowcase(data);

        if (res?.data) {
            notificationEasy({
                content: 'Витрина успешно создана',
            });
            navigate(`/showcase/${res.data.id}/`);
        } else {
            for (const [key, value] of Object.entries(res?.error?.data)) {
                notificationEasy({
                    type: 'error',
                    content: `${key !== 'detail' ? key + ':' : ''} ${value}`,
                });
            }
        }
    };

    return (
        <UIForm
            onFinish={onSubmit}
            layout="vertical"
        >
            <NewShowcaseView
                initiativeList={initiativeList ?? []}
                formatsList={formatsList ?? []}
                isLoadingInitiatives={isLoadingInitiatives}
                isLoadingFormats={isLoadingFormats}
                isLoadingCreate={isLoadingCreate}
                role={role}
            />
        </UIForm>
    );
};
