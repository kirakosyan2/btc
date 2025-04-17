import React, { useState } from 'react';

import { UIFlex } from '@components/_shared/Flex';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { StreamList } from '@src/redux/stream/stream';

import { ModalDetailFlow } from '../ModalDetailFlow';
import { ModalDetailGlobalParams } from '../ModalDetailGlobalParams';
import { SkeletonCardDML } from '../SkeletonCardDML';
import { CardDML } from './CardDML';
import styles from './styles.module.scss';

type Props = {
    flowList: StreamList[];
    isLoadingFlowList: boolean;
};
export const RenderCardDML: React.FC<Props> = ({
    flowList,
    isLoadingFlowList,
}) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const {
        isOpened: isOpenedGlobal,
        openPopup: openGlobal,
        closePopup: closeGlobal,
    } = usePopupControls();

    const [idDML, setIdDML] = useState<number>();

    const openDetailModal = (id: number) => {
        return () => {
            setIdDML(id);
            openPopup();
        };
    };

    const openDetailGlobalModal = (id: number) => {
        return () => {
            setIdDML(id);
            openGlobal();
        };
    };

    return (
        <>
            <UIFlex className={cx('container')} gap={40}>
                {!isLoadingFlowList &&
                    flowList &&
                    flowList.map((item) => (
                        <CardDML
                            key={item.id}
                            data={item}
                            onClickDetailFlow={openDetailModal(item.id)}
                            onClickDetailGlobalParams={openDetailGlobalModal(
                                item.id
                            )}
                        />
                    ))}

                {isLoadingFlowList && <SkeletonCardDML />}
            </UIFlex>

            <ModalDetailFlow
                open={isOpened}
                idDML={idDML}
                onClose={closePopup}
            />

            <ModalDetailGlobalParams
                open={isOpenedGlobal}
                idDML={idDML}
                onClose={closeGlobal}
            />
        </>
    );
};
