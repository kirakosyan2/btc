import React, { useState } from 'react';

import { UIFlex } from '@components/_shared/Flex';
import { UITypography } from '@components/_shared/Typography';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';
import { ShowcaseCluster } from '@src/redux/showcases/showcase';

import { CardCluster } from '../CardCluster';
import { ModalDetail } from '../ModalDetail';
import { SkeletonCardCluster } from '../SkeletonCardCluster';
import styles from './styles.module.scss';

type Props = {
    role: eUserRoles | null;
    clustersList: ShowcaseCluster[];
    isLoadingClustersList: boolean;
    stand?: string;
    deleteCluster: (value: string) => void;
};
export const RenderCardsClusters: React.FC<Props> = ({
    role,
    clustersList,
    isLoadingClustersList,
    stand,
    deleteCluster,
}) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const [currClusterId, setCurrClusterId] = useState<number>();

    const openDetailModal = (id: number) => {
        return () => {
            openPopup();
            setCurrClusterId(id);
        };
    };

    const handleDeleteCluster = (id: string) => {
        return () => {
            deleteCluster(id);
        };
    };

    return (
        <div className={cx('wrapper')}>
            <UITypography className={cx('category')}>{stand}</UITypography>
            <UIFlex className={cx('container')} gap={40}>
                {!isLoadingClustersList &&
                    clustersList &&
                    clustersList.map((item) => (
                        <CardCluster
                            key={item.id}
                            data={item}
                            disabled={[eUserRoles.BUISNESS].includes(
                                role as eUserRoles
                            )}
                            onClick={openDetailModal(item.id)}
                            deleteCluster={handleDeleteCluster(String(item.id))}
                        />
                    ))}

                {isLoadingClustersList && <SkeletonCardCluster />}
            </UIFlex>

            <ModalDetail
                open={isOpened}
                currClusterId={currClusterId}
                onClose={closePopup}
            />
        </div>
    );
};
