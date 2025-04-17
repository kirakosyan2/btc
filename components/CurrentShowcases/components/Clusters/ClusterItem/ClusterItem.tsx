import React, { useEffect } from 'react';
import { ClusterItemView } from './ClusterItem.view';
import { UIForm } from '@components/_shared/Form';
import { Form } from 'antd';
import {
    ShowcaseUpdateCurrentCluster,
    ListProps,
    useCurrentClusterQuery,
    useUpdateCurrentClustersMutation,
} from '@src/redux/showcases/showcase';
import { useParams } from 'react-router-dom';
import { notificationEasy } from '@src/utils';
import { useAppSelector } from '@src/redux/store';

type Props = {
    currClusterId?: number;
    onClose: () => void;
};

type FormProps = {
    ctl: string;
    yarn: string;
    realm: string;
    source_tables: ListProps[];
    base: string;
    resourse: string;
    tuz_prefix: string;
};
export const ClusterItem: React.FC<Props> = ({ currClusterId, onClose }) => {
    const [form] = Form.useForm();
    const { id: datamart_id } = useParams();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: currCluster } = useCurrentClusterQuery(
        { id: String(currClusterId), etl_id: String(datamart_id) },
        {
            skip: !datamart_id || !currClusterId,
        },
    );

    // Mutations
    const [updateCluster, { isLoading: isLoadingCluster }] = useUpdateCurrentClustersMutation();

    useEffect(() => {
        if (currCluster) {
            form.setFieldsValue({
                ctl: currCluster.ctl_profile,
                yarn: currCluster.yarn_queue,
                realm: currCluster.realm,
                source_tables: currCluster.source_tables,
                base: currCluster.spark_conf.spark_submit_cmd_main,
                tuz_prefix: currCluster.tuz_prefix,
                resourse: currCluster.spark_conf.spark_submit_cmd_additional?.trim(),
            });
        }
    }, [currCluster]);

    const onSubmit = async (data: FormProps) => {
        const payload: ShowcaseUpdateCurrentCluster = {
            ctl_profile: data.ctl,
            yarn_queue: data.yarn,
            realm: data.realm,
            tuz_prefix: data.tuz_prefix,
            source_tables: data.source_tables,
            spark_conf: {
                spark_submit_cmd_main: data.base,
                spark_submit_cmd_additional: data.resourse,
            },
            cluster_type: Number(currClusterId),
            etl: Number(datamart_id),
        };

        const res: any = await updateCluster(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Кластер успешно изменен',
            });

            onClose();
        } else {
            for (const value of Object.values(res?.error?.data)) {
                notificationEasy({
                    type: 'error',
                    content: ` ${value}`,
                });
            }
        }
    };

    return (
        <UIForm
            onFinish={onSubmit}
            layout="vertical"
            form={form}
        >
            <ClusterItemView
                form={form}
                isLoadingCluster={isLoadingCluster}
                role={role}
            />
        </UIForm>
    );
};
