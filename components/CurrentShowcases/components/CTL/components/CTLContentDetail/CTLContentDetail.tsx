import { TabsProps } from 'antd';
import React, { useMemo } from 'react';

import { UITabs } from '@components/_shared/Tabs';

import { CTLContentTab } from '../CTLContentTab';

type Props = {
    stream_id?: number;
    ctl_id?: React.Key;
};
export const CTLContentDetail: React.FC<Props> = ({ stream_id, ctl_id }) => {
    const items: TabsProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: 'Target таблицы',
                children: (
                    <CTLContentTab
                        stream_id={stream_id}
                        ctl_id={ctl_id}
                        name="target_tables"
                    />
                ),
            },
            {
                key: '2',
                label: 'Staging таблицы',
                children: (
                    <CTLContentTab
                        stream_id={stream_id}
                        ctl_id={ctl_id}
                        name="stage_tables"
                    />
                ),
            },
            {
                key: '3',
                label: 'Hists',
                children: (
                    <CTLContentTab
                        stream_id={stream_id}
                        ctl_id={ctl_id}
                        name="hists"
                    />
                ),
            },
            {
                key: '4',
                label: 'Локальные параметры потока',
                children: (
                    <CTLContentTab
                        stream_id={stream_id}
                        ctl_id={ctl_id}
                        name="local_vars"
                    />
                ),
            },
        ],
        [stream_id, ctl_id]
    );

    return <UITabs items={items} tabPosition="left" />;
};
