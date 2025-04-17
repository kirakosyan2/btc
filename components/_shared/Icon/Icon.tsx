import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { IconSize } from '@src/types/types';

import { IconsType, dictionary } from './dictionary';
import styles from './styles.module.scss';

type Props = {
    type: IconsType;
    size?: IconSize;
    className?: string;
    test_id?: string;
    onClick?: () => void;
};

const iconSizes: Record<IconSize, string> = {
    xxs: 'xxsmall',
    xs: 'xsmall',
    sm: 'small',
    ms: 'msmall',
    md: 'medium',
    lg: 'large',
};

export const Icon: React.FC<Props> = ({
    type,
    size = 'md',
    className,
    test_id,
    onClick,
}) => {
    const cx = useStyles(styles);

    const Icon = dictionary[type];
    const iconSize = iconSizes[size];

    if (!Icon) return null;

    return (
        <div
            className={cx(iconSize, className)}
            data-testid={test_id}
            onClick={onClick}>
            <Icon />
        </div>
    );
};
