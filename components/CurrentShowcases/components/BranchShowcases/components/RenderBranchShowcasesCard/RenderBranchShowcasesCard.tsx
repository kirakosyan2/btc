import React from 'react';

import { UIFlex } from '@components/_shared/Flex';

import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';
import { ShowcaseCurrentBranches } from '@src/redux/showcases/showcase';

import { TCreateBranch } from '../../BranchShowcases';
import { BranchShowcasesCard } from '../BranchShowcasesCard';
import { CardAddBranch } from '../CardAddBranch';
import { SkeletonBranchShowcase } from '../SkeletonBranchShowcase';
import styles from './styles.module.scss';

type Props = {
    currBranches: ShowcaseCurrentBranches[];
    isLoading: boolean;
    role: eUserRoles | null;
    isLoadingCurrBranches: boolean;
    handleCreateBranch: (data: TCreateBranch) => void;
};
export const RenderBranchShowcasesCard: React.FC<Props> = ({
    currBranches,
    isLoading,
    role,
    isLoadingCurrBranches,
    handleCreateBranch,
}) => {
    const cx = useStyles(styles);

    return (
        <>
            <UIFlex className={cx('container')} gap={40}>
                {!isLoadingCurrBranches ? (
                    currBranches.map((item) => (
                        <BranchShowcasesCard key={item.id} data={item} />
                    ))
                ) : (
                    <SkeletonBranchShowcase />
                )}

                <CardAddBranch
                    isLoading={isLoading}
                    disabled={[eUserRoles.BUISNESS].includes(
                        role as eUserRoles
                    )}
                    isEmptyBranch={currBranches.length === 0}
                    onClick={handleCreateBranch}
                />
            </UIFlex>
        </>
    );
};
