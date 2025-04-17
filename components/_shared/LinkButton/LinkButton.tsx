import React, { ReactNode } from 'react';
import { Link, To } from 'react-router-dom';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
    to: To;
    children: ReactNode;
    className?: string;
    target?: React.HTMLAttributeAnchorTarget;
    ref?: React.MutableRefObject<null>;
};

export const LinkButton: React.FC<Props> = ({
    to,
    children,
    className,
    target,
    ref,
}) => {
    const cx = useStyles(styles);

    return (
        <Link
            to={to}
            className={cx('link', className)}
            target={target}
            ref={ref}>
            {children}
        </Link>
    );
};
