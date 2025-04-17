import { UIForm } from '@components/_shared/Form';
import React, { useEffect, useMemo } from 'react';
import { CreateAcesBlockView } from './CreateAcesBlock.view';
import { useTeamsQuery } from '@src/redux/teams/teams';
import { AcesPayload, useCreateAcesMutation } from '@src/redux/aces/aces';
import { notificationEasy } from '@src/utils';
import { Form } from 'antd';
import { useMeQuery } from '@src/redux/personalCabinet/personalCabinet';

type FormProps = {
    team: number;
    aces: string;
    base: string;
    dev: string;
    ift: string;
    uat: string;
    psi: string;
    prom: string;
};
export const CreateAcesBlock: React.FC = () => {
    const [form] = Form.useForm();
    // Query
    const { data: teamsList, isLoading: isLoadingTeams } = useTeamsQuery();
    const { data: me } = useMeQuery();

    // Mutation
    const [createAces, { isLoading: isLoadingCreateAces }] = useCreateAcesMutation();

    const currentTeam = useMemo(
        () => (teamsList && me ? teamsList.find((team) => team.value === me?.team) : undefined),

        [teamsList, me],
    );

    useEffect(() => {
        if (teamsList && me) {
            form.setFieldsValue({
                team: currentTeam?.label,
            });
        }
    }, [me, currentTeam]);

    const onSubmit = async (data: FormProps) => {
        const payload: AcesPayload = {
            dev_prefix: data.dev,
            ift_prefix: data.ift,
            uat_prefix: data.uat,
            pci_prefix: data.psi,
            prom_prefix: data.prom,
            base_prefix: data.base,
            team: currentTeam?.value,
            name: data.aces,
        };
        const res: any = await createAces(payload);

        if (res?.data) {
            notificationEasy({
                content: 'ТУЗ успешно добавлен',
            });
            form.resetFields();

            form.setFieldsValue({
                team: currentTeam?.label,
            });
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при обвновлении ТУЗа',
            });
        }
    };

    return (
        <UIForm
            onFinish={onSubmit}
            layout="vertical"
            form={form}
        >
            <CreateAcesBlockView
                teamsList={teamsList ?? []}
                isLoadingTeams={isLoadingTeams}
                isLoadingCreateAces={isLoadingCreateAces}
            />
        </UIForm>
    );
};
