import React, { useMemo } from 'react';
import { UICard } from '@components/_shared/Card';
import { CollapseProps } from 'antd';
import { ParticipantPSI } from './components/ParticipantPSI/ParticipantPSI';
import { UICollapse } from '@components/_shared/Collapse';
import { IssueRelease } from './components/IssuePSI/IssueRelease';
import { useStyles } from '@hooks/useStyles';
import styles from './styles.module.scss';
import { UITitle } from '@components/_shared/Title';
import { UIAlert } from '@components/_shared/Alert';
import { UITypography } from '@components/_shared/Typography';
import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { useCreateReleaseMutation } from '@src/redux/types/type';
import { notificationEasy } from '@src/utils';
import { useParams } from 'react-router-dom';

export const Release: React.FC = () => {
    const cx = useStyles(styles);
    const { id } = useParams();

    const [createRealese] = useCreateReleaseMutation();

    const items_psi: CollapseProps['items'] = useMemo(
        () => [
            {
                key: 'psi',
                label: <UITitle level={5}> Проверьте участников ПСИ</UITitle>,
                children: <ParticipantPSI />,
            },
        ],
        [],
    );

    const items_issue: CollapseProps['items'] = useMemo(
        () => [
            {
                key: 'issue',
                label: <UITitle level={5}>Issue Release 2.0</UITitle>,
                children: <IssueRelease />,
            },
        ],
        [],
    );

    const handleCreateRelease = async () => {
        const res: any = await createRealese(id as string);

        if (res?.data) {
            notificationEasy({
                content: 'Релиз успешно создан',
            });
        } else {
            notificationEasy({
                type: 'error',
                content: 'Произошла ошибка при создании релиза',
            });
        }
    };

    return (
        <UICard>
            <UITitle
                className={cx('title')}
                level={2}
            >
                Создание релиза в Jira
            </UITitle>
            <UIAlert
                className={cx('aletr')}
                message={
                    <UITypography strong>
                        Для создания релиза в Jira проверьте корректность данных (измените при
                        необходимости) и нажмите "Создать релиз в Jira"
                    </UITypography>
                }
            />
            <UIFlex vertical>
                <UICollapse
                    items={items_psi}
                    className={cx('CollapseItem')}
                />
                <UICollapse
                    items={items_issue}
                    className={cx('CollapseItem')}
                />
            </UIFlex>
            <div className={cx('btn')}>
                <UIButton
                    type="primary"
                    size="large"
                    onClick={handleCreateRelease}
                >
                    Создать релиз в Jira
                </UIButton>
            </div>
        </UICard>
    );
};
