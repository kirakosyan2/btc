import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';

import { useRepositoryMutation } from '@src/redux/deploy/deploy';
import {
    ShowcaseUpdateBitbucket,
    useBaseQuery,
    useUpdateBaseMutation,
} from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { BitbacketView } from './Bitbacket.view';

type Props = {
    isReference: boolean;
};

type FormProps = {
    name: string;
};
export const Bitbacket: React.FC<Props> = ({ isReference }) => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const {
        data: dataBase,
        isLoading: isLoadingBase,
        refetch: refetchBase,
    } = useBaseQuery(id as string, {
        skip: !id,
    });

    // Mutations
    const [link] = useRepositoryMutation();
    const [updateBitbucket, { isLoading: isLoadingUpdate }] =
        useUpdateBaseMutation();

    const onLinkRequest = async () => {
        if (id && !isReference) {
            const res: any = await link(id);

            if (res?.data) {
                notificationEasy({
                    content: 'Репозиторий создан',
                });

                refetchBase();
            } else {
                notificationEasy({
                    content:
                        res?.error.data.detail ??
                        'При создании репозитория произошла ошибка',
                    type: 'error',
                });
            }
        }
    };

    useEffect(() => {
        if (dataBase) {
            form.setFieldsValue({
                name: dataBase.repo_name,
            });
        }
    }, [dataBase]);

    const onSubmit = async ({ name }: FormProps) => {
        if (isReference) return;

        const payload: ShowcaseUpdateBitbucket = {
            id: String(id),
            repo_name: name,
        };

        const res: any = await updateBitbucket(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Репозиторий изменен',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при изменении репозитория',
            });
        }
    };

    return (
        <UIForm form={form} layout="vertical" onFinish={onSubmit}>
            <BitbacketView
                link={dataBase?.repo_link}
                status={dataBase?.repo_create_status}
                isLoadingData={isLoadingBase || isLoadingUpdate}
                repoName={dataBase?.repo_name}
                role={role}
                onLinkRequest={onLinkRequest}
            />
        </UIForm>
    );
};
