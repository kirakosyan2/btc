import React from 'react';
import { UIForm } from '@components/_shared/Form';
import { TeamSelectionView } from './TeamSelection.view';
import { useTeamsQuery } from '@src/redux/teams/teams';

export const TeamSelection: React.FC = () => {
    const { data: teamsList, isLoading: isLoadingTeams } = useTeamsQuery();

    return (
        <UIForm layout="vertical">
            <TeamSelectionView
                isLoadingTeams={isLoadingTeams}
                teamsList={teamsList ?? []}
            />
        </UIForm>
    );
};
