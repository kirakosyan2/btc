import React from 'react';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { LinkButton } from '@components/_shared/LinkButton';
import { TextShorter } from '@components/_shared/TextShorter';

import { useStyles } from '@hooks/useStyles';

import { InitiativesList } from '@src/redux/initiative/initiative';

import styles from './styles.module.scss';

type Props = InitiativesList;

export const InitiativeItem: React.FC<Props> = ({
    name,
    confluence_link,
    id,
}) => {
    const cx = useStyles(styles);

    return (
        <UICard className={cx('container')}>
            <UIFlex className={cx('btn')}>
                <TextShorter
                    tooltip
                    title={name}
                    className={cx('paragraph')}
                    classNameText={cx('title')}>
                    {name}
                </TextShorter>
                <UIFlex className={cx('buttonGroup')}>
                    <LinkButton to={`/initiative/${id}`}>
                        <UIButton type="primary" size="large">
                            Просмотр
                        </UIButton>
                    </LinkButton>
                    <LinkButton to={confluence_link} target="_blank">
                        <UIButton size="large">Confluence</UIButton>
                    </LinkButton>
                </UIFlex>
            </UIFlex>
        </UICard>
    );
};
