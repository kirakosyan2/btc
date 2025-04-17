import React, { useCallback } from 'react';

import { UIModal } from '@components/_shared/Modal';

import { useStyles } from '@hooks/useStyles';

import { CheckData } from '../ModalContent/CheckData';
import { CoalesceFiles } from '../ModalContent/CoalesceFiles';
import { HDFS2KAFKA } from '../ModalContent/HDFS2KAFKA';
import { History } from '../ModalContent/History';
import { Increment } from '../ModalContent/Increment';
import { KAFKA2HDFS } from '../ModalContent/KAFKA2HDFS';
import { RA } from '../ModalContent/RA';
import { STG } from '../ModalContent/STG';
import styles from './styles.module.scss';

type Props = {
    type: string;
    open: boolean;
    threadId: string;
    onClose: () => void;
};

export const ModalNodeDetail: React.FC<Props> = ({
    type,
    threadId,
    open,
    onClose,
}) => {
    const cx = useStyles(styles);

    const renderContent = useCallback(
        (typeContent: string) => {
            switch (typeContent) {
                case 'get_increment':
                    return <Increment threadId={threadId} onClose={onClose} />;

                case 'dm_preStage':
                    return <STG threadId={threadId} onClose={onClose} />;

                case 'history':
                    return <History threadId={threadId} onClose={onClose} />;

                case 'data_qualityCheck':
                    return <CheckData threadId={threadId} onClose={onClose} />;

                case 'coalesce_files':
                    return (
                        <CoalesceFiles threadId={threadId} onClose={onClose} />
                    );

                case 'move_table':
                    return <RA threadId={threadId} onClose={onClose} />;

                case 'hdfs2kafka':
                    return <HDFS2KAFKA threadId={threadId} onClose={onClose} />;
                case 'kafka2hdfs':
                    return <KAFKA2HDFS threadId={threadId} onClose={onClose} />;

                default:
                    return null;
            }
        },
        [type]
    );

    return (
        <UIModal
            open={open}
            onClose={onClose}
            onCancel={onClose}
            destroyOnClose
            footer={null}
            width={1200}
            className={cx('modal')}>
            {renderContent(type)}
        </UIModal>
    );
};
