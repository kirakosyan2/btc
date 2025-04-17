import { UIModal } from '@components/_shared/Modal';
import React, { useMemo } from 'react';
import { TabsProps } from 'antd';
import { UITabs } from '@components/_shared/Tabs';
import { TabFiles, TabHistory, TabIncrement, TabRA } from './Tabs';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { useStreamQuery } from '@src/redux/stream/stream';
import { TabDQC } from './Tabs/TabDQC';

type Props = {
    open: boolean;
    idDML?: number;
    onClose: () => void;
};

export const ModalDetailGlobalParams: React.FC<Props> = ({ open, idDML, onClose }) => {
    const cx = useStyles(styles);

    // Query
    const { data: config } = useStreamQuery(String(idDML), {
        skip: !idDML,
    });

    const items: TabsProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: 'Модуль извлечения инкремента',
                children: (
                    <TabIncrement
                        data={config?.app_config?.stages?.getIncrement}
                        idDML={idDML}
                        name="Модуль извлечения инкремента"
                        onClose={onClose}
                    />
                ),
            },
            {
                key: '2',
                label: 'Модуль формирования историчности',
                children: (
                    <TabHistory
                        data={config?.app_config?.stages?.historicity}
                        idDML={idDML}
                        name="Модуль формирования историчности"
                        onClose={onClose}
                    />
                ),
            },
            {
                key: '3',
                label: 'Модуль склейки файлов',
                children: (
                    <TabFiles
                        data={config?.app_config?.stages?.coalesceFiles}
                        idDML={idDML}
                        name="Модуль склейки файлов"
                        onClose={onClose}
                    />
                ),
            },
            {
                key: '4',
                label: 'Модуль перемещения данных в PA',
                children: (
                    <TabRA
                        data={config?.app_config?.stages?.moveTable}
                        idDML={idDML}
                        name="Модуль перемещения данных в PA"
                        onClose={onClose}
                    />
                ),
            },
            {
                key: '5',
                label: 'Модуль проверки качества данных',
                children: (
                    <TabDQC
                        data={config?.app_config?.stages?.dataQualityCheck}
                        idDML={idDML}
                        name="Модуль проверки качества данных"
                        onClose={onClose}
                    />
                ),
            },
        ],
        [config],
    );

    return (
        <UIModal
            open={open}
            onClose={onClose}
            onCancel={onClose}
            destroyOnClose
            width={1200}
            footer={null}
            className={cx('modal')}
        >
            <UITabs
                items={items}
                tabPosition="left"
            />
        </UIModal>
    );
};
