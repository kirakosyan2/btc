import { Splitter, TreeDataNode, TreeProps } from 'antd';
import React, { Key } from 'react';

import { CTLSetting } from './CTLSetting';
import { CardData } from './CardData';
import { ModalCreateCTL } from './ModalCreateCTL';
import styles from './styles.module.scss';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITree } from '@components/_shared/Tree';
import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

type Props = {
    dataCtl?: TreeDataNode[];
    ctlID?: Key;
    defaultKeySelected?: Key[];
    onSelect: TreeProps['onSelect'];
};

export const CTLView: React.FC<Props> = ({
    dataCtl,
    ctlID,
    defaultKeySelected,
    onSelect,
}) => {
    const cx = useStyles(styles);
    const { isOpened, openPopup, closePopup } = usePopupControls();

    return (
        <>
            <UICard>
                <UITitle level={3} className={cx('title')}>
                    CTL
                </UITitle>

                <CTLSetting />

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
                                            defaultSelectedKeys={
                                                defaultKeySelected
                                            }
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
                                <CardData ctlID={ctlID} />
                            </Splitter.Panel>
                        )}
                    </Splitter>
                </UICard>
            </UICard>

            <ModalCreateCTL opened={isOpened} onClose={closePopup} />
        </>
    );
};
