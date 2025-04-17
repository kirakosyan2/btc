import { TreeProps } from 'antd';
import React, { Key, useMemo, useState } from 'react';

import { useCtlQuery } from '@src/redux/config/configs';

import { CTLView } from './CTL.view';

export const CTL: React.FC = () => {
    const [ctlID, setCtlID] = useState<Key>();

    // Query
    const { data: dataCtl } = useCtlQuery();

    const defaultKeySelected = useMemo(() => {
        if (dataCtl && dataCtl.length > 0) {
            return [dataCtl[0]?.key];
        }
        return [];
    }, [dataCtl]);

    const onSelect: TreeProps['onSelect'] = async (selectedKeys) => {
        setCtlID(selectedKeys[0]);
    };

    return (
        <CTLView
            dataCtl={dataCtl}
            ctlID={ctlID ?? dataCtl?.[0].key}
            defaultKeySelected={defaultKeySelected}
            onSelect={onSelect}
        />
    );
};
