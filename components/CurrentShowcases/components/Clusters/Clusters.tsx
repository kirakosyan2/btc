import { TourProps } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { Icon } from '@components/_shared/Icon';
import { UITitle } from '@components/_shared/Title';
import { UITooltip } from '@components/_shared/Tooltip';
import { UITour } from '@components/_shared/Tour';
import { UITypography } from '@components/_shared/Typography';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { eUserRoles } from '@src/redux/auth/auth';
import {
    ShowcaseCluster,
    ShowcaseCreateCluster,
    ShowcaseDeleteCluster,
    useClustersQuery,
    useCreateClustersMutation,
    useDeleteClusterMutation,
} from '@src/redux/showcases/showcase';
import { useAppSelector } from '@src/redux/store';
import {
    NormalClustersList,
    useClusterNamesQuery,
} from '@src/redux/types/type';
import { notificationEasy } from '@src/utils';

import { RenderCardsClusters } from './RenderCardsClusters';
import styles from './styles.module.scss';

type Props = {
    isReference: boolean;
};

export type OptGroupClustersListNames = {
    label?: string;
    options: NormalClustersList[];
};

export type OptGroupClustersList = {
    stand?: string;
    options: ShowcaseCluster[];
};

export const Clusters: React.FC<Props> = ({ isReference }) => {
    const cx = useStyles(styles);
    const { id: etl_id } = useParams();
    const { role } = useAppSelector((store) => store.auth);

    const [nameCluster, setNameCluster] = useState<number>();
    const { isOpened, openPopup, closePopup } = usePopupControls();

    // Query
    const { data: clustersList, isLoading: isLoadingClustersList } =
        useClustersQuery(etl_id as string, {
            skip: !etl_id,
        });

    const { data: clustersNamesList, isLoading: isLoadingClustersNames } =
        useClusterNamesQuery(undefined, {
            skip: !etl_id,
        });

    // Mutation
    const [createCluster, { isLoading: isLoadingCreateCluster }] =
        useCreateClustersMutation();
    const [deleteCluster] = useDeleteClusterMutation();

    const normClustersNamesList: OptGroupClustersListNames[] = useMemo(() => {
        return clustersNamesList?.length
            ? clustersNamesList.reduce(
                  (acc: OptGroupClustersListNames[], val) => {
                      const meta = val.meta;
                      const option = { label: val.label, value: val.value };
                      if (!acc.find((item) => item.label === meta)) {
                          acc.push({ label: meta, options: [option] });
                      } else {
                          acc
                              .find((item) => item.label === meta)
                              ?.options.push(option);
                      }
                      return acc;
                  },
                  []
              )
            : [];
    }, [clustersNamesList]);

    const normClustersList: OptGroupClustersList[] = useMemo(() => {
        return clustersList?.length
            ? clustersList.reduce((acc: OptGroupClustersList[], val) => {
                  const meta = val.stand;
                  const option = { ...val };
                  if (!acc.find((item) => item.stand === meta)) {
                      acc.push({ stand: meta, options: [option] });
                  } else {
                      acc
                          .find((item) => item.stand === meta)
                          ?.options.push(option);
                  }
                  return acc;
              }, [])
            : [];
    }, [clustersList]);

    const refName = useRef(null);
    const refBtn = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => refName.current,
            nextButtonProps: {
                children: 'Далее',
            },
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => refBtn.current,
            nextButtonProps: {
                children: 'Закрыть',
            },
            prevButtonProps: {
                children: 'Назад',
            },
        },
    ];

    const handleCreateCluster = async () => {
        if (isReference) return;

        const payload: ShowcaseCreateCluster = {
            etl: Number(etl_id),
            cluster_type: Number(nameCluster),
        };

        const res: any = await createCluster(payload);

        if (res?.data) {
            notificationEasy({
                content: 'Кластер создан',
            });
            setNameCluster(undefined);
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при создании кластера',
            });
        }
    };

    const handleDeleteCluster = async (id: string) => {
        if (isReference) return;

        const payload: ShowcaseDeleteCluster = {
            etl_id: String(etl_id),
            id: id,
        };
        const res: any = await deleteCluster(payload);
        if (res?.data) {
            notificationEasy({
                content: 'Кластер удален',
            });
            setNameCluster(undefined);
        } else {
            notificationEasy({
                type: 'error',
                content:
                    res?.error.data.detail ??
                    'Произошла ошибка при удалении кластера',
            });
        }
    };

    return (
        <>
            <UICard className={cx('container')}>
                <UITitle level={3} className={cx('title')}>
                    Кластеры
                </UITitle>

                <UIFlex align="center" gap={10}>
                    <div
                        ref={refName}
                        style={{
                            width: '100%',
                        }}>
                        <FormSelect
                            formProps={{
                                layout: 'vertical',
                                label: (
                                    <UITitle level={5}>
                                        Название кластера
                                    </UITitle>
                                ),
                                required: true,
                                className: cx('containerItem'),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ],
                            }}
                            selectProps={{
                                placeholder: 'Выберите название кластера',
                                options: normClustersNamesList ?? [],
                                loading: isLoadingClustersNames,
                                disabled:
                                    isLoadingClustersNames ||
                                    [eUserRoles.BUISNESS].includes(
                                        role as eUserRoles
                                    ),
                                value: nameCluster,
                                onChange: setNameCluster,
                                size: 'large',
                            }}
                        />
                    </div>
                    <div ref={refBtn}>
                        <UIButton
                            className={cx('btnCreate')}
                            size="large"
                            type="primary"
                            disabled={
                                !nameCluster ||
                                isLoadingCreateCluster ||
                                [eUserRoles.BUISNESS].includes(
                                    role as eUserRoles
                                )
                            }
                            loading={isLoadingCreateCluster}
                            onClick={handleCreateCluster}>
                            Добавить кластер
                        </UIButton>
                    </div>
                </UIFlex>
                {normClustersList.map((item) => (
                    <RenderCardsClusters
                        key={`${item.stand}${new Date().getMilliseconds()}`}
                        role={role}
                        stand={item.stand}
                        clustersList={item.options ?? []}
                        isLoadingClustersList={isLoadingClustersList}
                        deleteCluster={handleDeleteCluster}
                    />
                ))}

                {!isLoadingClustersList && normClustersList.length === 0 && (
                    <UITypography className={cx('emptyText')}>
                        Нет данных
                    </UITypography>
                )}

                {isReference && (
                    <UITooltip title="Описание блока" className={cx('icon')}>
                        <span>
                            <Icon
                                type="question-circle-outlined"
                                onClick={openPopup}
                            />
                        </span>
                    </UITooltip>
                )}
            </UICard>

            {isReference && (
                <UITour open={isOpened} steps={steps} onClose={closePopup} />
            )}
        </>
    );
};
