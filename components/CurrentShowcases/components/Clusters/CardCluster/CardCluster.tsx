import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UICard } from '@components/_shared/Card';
import { UITypography } from '@components/_shared/Typography';
import { UIButton } from '@components/_shared/Button';
import { ShowcaseCluster } from '@src/redux/showcases/showcase';
import { UIFlex } from '@components/_shared/Flex';
import { TextShorter } from '@components/_shared/TextShorter';

type Props = {
    disabled: boolean;
    data: ShowcaseCluster;
    onClick: () => void;
    deleteCluster: () => void;
};

export const CardCluster: React.FC<Props> = ({ disabled, data, onClick, deleteCluster }) => {
    const cx = useStyles(styles);

    return (
        <UICard className={cx('container')}>
            <UITypography className={cx('text')}>
                <UITypography
                    className={cx('text')}
                    strong
                >
                    Название:
                </UITypography>
                <TextShorter
                    tooltip
                    title={data.name}
                >
                    {data.name}
                </TextShorter>
            </UITypography>
            <UITypography className={cx('text')}>
                <UITypography
                    className={cx('text')}
                    strong
                >
                    Стенд:
                </UITypography>
                <TextShorter
                    tooltip
                    title={data.stand}
                >
                    {data.stand}
                </TextShorter>
            </UITypography>
            <UITypography className={cx('text')}>
                <UITypography
                    className={cx('text')}
                    strong
                >
                    Yarn:
                </UITypography>
                {data.yarn_queue}
            </UITypography>
            <UITypography className={cx('text')}>
                <UITypography
                    className={cx('text')}
                    strong
                >
                    Realm:
                </UITypography>
                {data.realm}
            </UITypography>
            <UITypography className={cx('text')}>
                <UITypography
                    className={cx('text')}
                    strong
                >
                    CTL-профиль:
                </UITypography>
                {data.ctl_profile}
            </UITypography>
            <UIFlex gap={10}>
                <UIButton
                    className={cx('btn')}
                    size="middle"
                    onClick={onClick}
                >
                    Настроить
                </UIButton>
                <UIButton
                    className={cx('btn', 'danger')}
                    size="middle"
                    disabled={disabled}
                    onClick={deleteCluster}
                >
                    Удалить
                </UIButton>
            </UIFlex>
        </UICard>
    );
};
