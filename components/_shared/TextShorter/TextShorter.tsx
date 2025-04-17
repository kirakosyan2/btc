import React, { ReactNode, useState } from 'react';
import { useStyles } from '@hooks/useStyles';
import styles from './styles.module.scss';
import { UITooltip } from '../Tooltip';
import { TooltipPlacement } from 'antd/es/tooltip';

type Props = {
    className?: string;
    tooltip?: boolean;
    children?: ReactNode;
    title?: string;
    placement?: TooltipPlacement;
    classNameText?: string;
};

export const TextShorter: React.FC<Props> = ({
    tooltip,
    title,
    className,
    children,
    placement,
    classNameText,
}) => {
    const cx = useStyles(styles);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        setShowTooltip(event.currentTarget.scrollWidth > event.currentTarget.clientWidth);
    };

    if (tooltip && showTooltip) {
        return (
            <div className={cx(className, 'wrapper')}>
                <UITooltip
                    placement={placement}
                    title={title}
                >
                    <div
                        className={cx('content')}
                        onMouseEnter={tooltip ? onMouseEnter : undefined}
                    >
                        <span className={cx(classNameText)}>{children}</span>
                    </div>
                </UITooltip>
            </div>
        );
    }

    return (
        <div
            className={cx(className, 'content', 'wrapper')}
            onMouseEnter={tooltip ? onMouseEnter : undefined}
        >
            <span className={cx(classNameText)}>{children}</span>
        </div>
    );
};
