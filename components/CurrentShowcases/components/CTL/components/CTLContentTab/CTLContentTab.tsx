import { Form } from 'antd';
import React, { useEffect } from 'react';

import { UIForm } from '@components/_shared/Form';

import { ListProps } from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import {
    TUpdateStreamPayload,
    useGetStreamQuery,
    useUpdateStreamMutation,
} from '@src/redux/streamV2/streamV2';
import { notificationEasy } from '@src/utils';

import { CTLContentTabView } from './CTLContentTab.view';

type Props = {
    name: TabNames;
    stream_id?: number;
    ctl_id?: React.Key;
};

export type TabNames =
    | 'target_tables'
    | 'stage_tables'
    | 'hists'
    | 'local_vars';

type FormProps = {
    target_tables?: ListProps[];
    stage_tables?: ListProps[];
    hists?: ListProps[];
    local_vars?: ListProps[];
};

export const CTLContentTab: React.FC<Props> = ({ stream_id, ctl_id, name }) => {
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: ctlSettings } = useGetStreamQuery(
        {
            stream_id: String(stream_id),
            ctl_id: String(ctl_id),
        },
        {
            skip: !stream_id || !ctl_id,
        }
    );

    // Mutations
    const [updateStream] = useUpdateStreamMutation();

    useEffect(() => {
        if (ctlSettings && !!ctlSettings?.[name]?.length) {
            form.setFieldsValue({
                [name]: ctlSettings[name] ?? [],
            });
        }
    }, [ctlSettings, stream_id]);

    // TODO: сделать динамичный тип
    const onSubmit = async (data: FormProps) => {
        const payload: TUpdateStreamPayload = {
            stream_id: Number(stream_id),
            ctl_id: ctl_id as React.Key,
            [name]: data?.[name]?.length
                ? data?.[name]?.map((item) => ({
                      key: item.key,
                      value: item.value ?? '',
                  }))
                : [],
        };

        const res: any = await updateStream(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно сохранены',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при сохранении данных',
            });
        }
    };

    return (
        <UIForm layout="vertical" form={form} onFinish={onSubmit}>
            <CTLContentTabView name={name} role={role} />
        </UIForm>
    );
};
