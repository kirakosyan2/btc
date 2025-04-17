import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    CreateBranch,
    useCreateBranchMutation,
} from '@src/redux/branches/branches';
import { useMeQuery } from '@src/redux/personalCabinet/personalCabinet';
import { useCurrentBranchesQuery } from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { BranchShowcasesView } from './BranchShowcases.view';

type Props = {
    isReference: boolean;
};

export type TCreateBranch = {
    name: string;
    type: number;
};

export const BranchShowcases: React.FC<Props> = ({ isReference }) => {
    const { id: etl_id } = useParams();
    const navigate = useNavigate();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const {
        data: currBranches,
        isLoading: isLoadingCurrBranches,
        refetch: refetchCurrBranches,
    } = useCurrentBranchesQuery(etl_id as string, {
        skip: !etl_id,
    });
    const { data: me } = useMeQuery();

    // Mutations
    const [createBranch, { isLoading: isLoadingCreateBranch }] =
        useCreateBranchMutation();

    const handleCreateBranch = async (data: TCreateBranch) => {
        if (isReference) return;

        const payload: CreateBranch = {
            datamart: String(etl_id),
            developer: String(me?.id),
            name: data.name,
            task_type: data.type,
        };

        const res: any = await createBranch(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Ветка успешно создана',
            });

            refetchCurrBranches();

            if (isReference) {
                navigate(`/branch/reference/${res?.data?.id}`);
            } else {
                navigate(`/branch/${res?.data?.id}`);
            }
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error?.data?.detail ??
                    'Произошла ошибка при создании ветки',
            });
        }
    };

    return (
        <BranchShowcasesView
            currBranches={currBranches ?? []}
            isLoading={isLoadingCreateBranch}
            isLoadingCurrBranches={isLoadingCurrBranches}
            role={role}
            handleCreateBranch={handleCreateBranch}
        />
    );
};
