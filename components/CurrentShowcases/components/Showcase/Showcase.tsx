import { debounce } from 'lodash';

import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UIForm } from '@components/_shared/Form';

import { useStyles } from '@hooks/useStyles';

import { useInitiativeListQuery } from '@src/redux/initiative/initiative';
import {
    ShowcaseUpdateBase,
    useBaseQuery,
    useUpdateBaseMutation,
} from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import { notificationEasy } from '@src/utils';

import { ShowcaseView } from './Showcase.view';
import styles from './styles.module.scss';

type Props = {
    isReference: boolean;
};

type FormProps = {
    confluence_link: string;
    name: string;
    initiative: number;
    owner_email: string;
};

export const Showcase: React.FC<Props> = ({ isReference }) => {
    const cx = useStyles(styles);
    const { id } = useParams();
    const [form] = Form.useForm();
    const { role } = useAppSelector((store) => store.auth);

    // Query
    const { data: initiativesList, isLoading: isLoadingInitiative } =
        useInitiativeListQuery();
    const { data: dataBase, isLoading: isLoadingBase } = useBaseQuery(
        id as string,
        {
            skip: !id,
        }
    );

    // Mutations
    const [updateBase, { isLoading: isLoadingUpdate }] =
        useUpdateBaseMutation();

    useEffect(() => {
        if (dataBase) {
            form.setFieldsValue({
                initiative: dataBase.initiative,
                confluence_link: dataBase.confluence_link,
                name: dataBase.name,
                owner_email: dataBase.owner_email,
            });
        }
    }, [dataBase]);

    const onChangeField = debounce(async (field: FormProps) => {
        if (isReference) return;

        const payload: ShowcaseUpdateBase = {
            id: String(id),
            ...field,
        };

        const res: any = await updateBase(payload);

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
            className={cx('form')}
            layout="vertical"
            form={form}>
            <ShowcaseView
                initiativesList={initiativesList ?? []}
                isLoadingInitiative={isLoadingInitiative}
                isLoadingBase={isLoadingBase}
                isLoadingUpdate={isLoadingUpdate}
                role={role}
            />
        </UIForm>
    );
};
