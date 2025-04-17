import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';

import { useStyles } from '@hooks/useStyles';

import { StorageService } from '@services/index';

import {
    UpdateBranch,
    useBranchListQuery,
    useUpdateBranchMutation,
} from '@src/redux/branches/branches';
import {
    TBitBucketPayload,
    useBitbucketMutation,
} from '@src/redux/deploy/deploy';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy, notificationWithBtn } from '@src/utils';

import { RepositoriesView } from './Repositories.view';
import styles from './styles.module.scss';

type Props = {
    isReference: boolean;
};

type FormProps = {
    dateAndTimeBranch: string | undefined;
    status: number | undefined;
    repositoriesBranch: string;
    repositoriesVersion: string;
};

const storageService = StorageService.getInstance();

export const Repositories: React.FC<Props> = ({ isReference }) => {
    const cx = useStyles(styles);

    const [form] = Form.useForm();
    const { id } = useParams();
    const [repoLink, setRepoLink] = useState('');
    const { role } = useAppSelector((store) => store.auth);

    const { data: branch, refetch: refetchBranch } = useBranchListQuery(
        id as string,
        {
            skip: !id,
        }
    );

    const clearRepoLink = () => setRepoLink('');

    useEffect(() => {
        if (branch) {
            form.setFieldsValue({
                repositoriesVersion: branch.datamart_version,
                status: branch.load_status,
                repositoriesBranch: branch.name,
                dateAndTimeBranch: branch.upload_date_time,
            });
        }
    }, [branch]);

    // Mutations
    const [updateRepository, { isLoading: isLoadingUpdate }] =
        useUpdateBranchMutation();
    const [bitbucket, { isLoading: isLinkLoading }] = useBitbucketMutation();

    const onBitBucketRequest = async () => {
        const version = storageService.getItem('version');

        if (id && !isReference && version) {
            const payload: TBitBucketPayload = {
                id,
                project_version: `v${version}`,
            };

            const res: any = await bitbucket(payload);

            if (res?.data) {
                notificationEasy({
                    content: 'Запрос на создание репозитория успешно отправлен',
                });

                setRepoLink(res?.data.repo_link);
                refetchBranch();
            } else {
                notificationWithBtn({
                    type: 'error',
                    title: 'Ошибка',
                    btnText: 'Закрыть',
                    btnType: 'dashed',
                    className: cx('containerNotification'),
                    content: (
                        <span className={cx('contentNotification')}>
                            {Array.isArray(res?.error.data.detail) ? (
                                <ol type="1" className={cx('listNotification')}>
                                    {res?.error.data.detail.map(
                                        (item: string) => <li>{item}</li>
                                    )}
                                </ol>
                            ) : (
                                res?.error.data.detail
                            )}
                        </span>
                    ),
                });
            }
        }
    };

    const onChangeField = debounce(async (field: FormProps) => {
        if (isReference) return;

        const payload: UpdateBranch = {
            id: String(id),
            datamart_version: field.repositoriesVersion,
        };

        const res: any = await updateRepository(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Данные успешно обновлены',
            });
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при обновлении данных',
            });
        }
    }, 700);

    return (
        <UIForm
            onValuesChange={(_, allValues) => onChangeField(allValues)}
            layout="vertical"
            form={form}>
            <RepositoriesView
                isLoadingUpdate={isLoadingUpdate}
                isLinkLoading={isLinkLoading}
                repoLink={repoLink}
                role={role}
                onBitBucketRequest={onBitBucketRequest}
                clearRepoLink={clearRepoLink}
            />
        </UIForm>
    );
};
