import { TreeProps } from 'antd';
import React, { Key, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useCtlTreeQuery } from '@src/redux/showcases/showcase';

import { DatamartEditView } from './DatamartEdit.view';

export const DatamartEdit: React.FC = () => {
    const { id: datamartID } = useParams();

    const [ctlID, setCtlID] = useState<Key>();

    // Query
    const { data: dataCtl } = useCtlTreeQuery(datamartID as string, {
        skip: !datamartID,
    });

    const defaultKeySelected = useMemo(() => {
        if (dataCtl && dataCtl.length > 0) {
            return [dataCtl[0]?.key];
        }
        return [];
    }, [dataCtl]);

    useEffect(() => {
        if (defaultKeySelected) {
            setCtlID(defaultKeySelected[0]);
        }
    }, [defaultKeySelected]);

    const onSelect: TreeProps['onSelect'] = async (selectedKeys) => {
        setCtlID(selectedKeys[0]);
    };

    return (
        <DatamartEditView
            dataCtl={dataCtl ?? []}
            ctlID={ctlID}
            defaultKeySelected={defaultKeySelected}
            onSelect={onSelect}
        />
    );
};
