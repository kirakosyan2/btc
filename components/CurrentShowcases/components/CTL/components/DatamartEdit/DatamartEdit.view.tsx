import { Splitter, TreeProps } from 'antd';
import React, { Key } from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { Icon } from '@components/_shared/Icon';
import { UITree } from '@components/_shared/Tree';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { TCTLTreeRequest } from '@src/redux/showcases/showcase';

import { CardData } from '../CardData';
import { ModalCreateCTL } from '../ModalCreateCTL';
import { ModalStreams } from '../ModalStreams';
import styles from './styles.module.scss';

type Props = {
    dataCtl: TCTLTreeRequest[];
    ctlID?: Key;
    defaultKeySelected: string[];
    onSelect: TreeProps['onSelect'];
};

export const DatamartEditView: React.FC<Props> = ({
    dataCtl,
    ctlID,
    defaultKeySelected,
    onSelect,
}) => {
    const cx = useStyles(styles);

    const { isOpened, openPopup, closePopup } = usePopupControls();
    const {
        isOpened: isOpenedModalSteam,
        openPopup: openedModalSteam,
        closePopup: closeModalSteam,
    } = usePopupControls();

    return (
        <>
            <UICard style={{ marginTop: '40px' }}>
                <Splitter>
                    <Splitter.Panel
                        defaultSize="30%"
                        min="30%"
                        max="40%"
                        style={{
                            overflowY: 'hidden',
                        }}>
                        <UIFlex
                            vertical
                            justify="space-between"
                            className={cx('panelLeft')}>
                            {defaultKeySelected &&
                                defaultKeySelected.length > 0 && (
                                    <UITree
                                        showLine
                                        defaultExpandParent
                                        defaultSelectedKeys={defaultKeySelected}
                                        switcherIcon={
                                            <Icon
                                                type="down-outlined"
                                                size="xs"
                                            />
                                        }
                                        treeData={dataCtl}
                                        onSelect={onSelect}
                                    />
                                )}

                            <UIButton onClick={openPopup}>
                                Добавить новую сущность
                            </UIButton>
                        </UIFlex>
                    </Splitter.Panel>
                    {ctlID !== undefined && (
                        <Splitter.Panel>
                            <CardData
                                ctlID={ctlID}
                                openedModalSteam={openedModalSteam}
                            />
                        </Splitter.Panel>
                    )}
                </Splitter>
            </UICard>

            <ModalCreateCTL isOpened={isOpened} onClose={closePopup} />
            <ModalStreams
                ctl_id={ctlID}
                isOpen={isOpenedModalSteam}
                onClose={closeModalSteam}
            />
        </>
    );
};
