import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';
import { RenderBranchShowcasesCard } from './components/RenderBranchShowcasesCard';
import { ShowcaseCurrentBranches } from '@src/redux/showcases/showcase';
import { eUserRoles } from '@src/redux/auth/auth';
import { TCreateBranch } from './BranchShowcases';

type Props = {
    currBranches: ShowcaseCurrentBranches[];
    isLoading: boolean;
    role: eUserRoles | null;
    isLoadingCurrBranches: boolean;
    handleCreateBranch: (data: TCreateBranch) => void;
};

export const BranchShowcasesView: React.FC<Props> = ({
    currBranches,
    isLoading,
    role,
    isLoadingCurrBranches,
    handleCreateBranch,
}) => {
    const cx = useStyles(styles);

    return (
        <UICard className={cx('container')}>
            <UITitle
                level={3}
                className={cx('title')}
            >
                Ветки витрины
            </UITitle>

            <RenderBranchShowcasesCard
                currBranches={currBranches}
                isLoading={isLoading}
                role={role}
                isLoadingCurrBranches={isLoadingCurrBranches}
                handleCreateBranch={handleCreateBranch}
            />
        </UICard>
    );
};
