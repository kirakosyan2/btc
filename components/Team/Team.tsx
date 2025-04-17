import { UIForm } from '@components/_shared/Form';
import React from 'react';
import { TeamView } from './Team.view';
import { useBlocksQuery } from '@src/redux/block/block';
import { TeamPayload, useCreateTeamMutation } from '@src/redux/teams/teams';
import { notificationEasy } from '@src/utils';
import { Form } from 'antd';

type FormProps = {
    block: number;
    team: string;
    link: string;
};
export const Team: React.FC = () => {
    const [form] = Form.useForm();

    // Query
    const { data: blocksList, isLoading: isLoadingBlocks } = useBlocksQuery();

    // Mutations
    const [createTeam, { isLoading: isLoadingCreate }] = useCreateTeamMutation();

    const onSubmit = async ({ block, team, link }: FormProps) => {
        const poyload: TeamPayload = {
            name: team,
            confluence_link: link,
            block,
        };

        const res: any = await createTeam(poyload);

        if (res?.data) {
            notificationEasy({
                content: 'Команда успешно зарегистирована',
            });

            form.resetFields();
        } else {
            notificationEasy({
                type: 'error',
                content: res?.error.data.detail ?? 'Произошла ошибка при регистрации команды',
            });
        }
    };

    return (
        <UIForm
            onFinish={onSubmit}
            layout="vertical"
            form={form}
        >
            <TeamView
                blocksList={blocksList ?? []}
                isLoadingBlocks={isLoadingBlocks}
                isLoadingCreate={isLoadingCreate}
            />
        </UIForm>
    );
};
