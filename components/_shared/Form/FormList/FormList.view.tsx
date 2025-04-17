import { UIButton } from '@components/_shared/Button';
import { Icon } from '@components/_shared/Icon';
import { useStyles } from '@hooks/useStyles';
import React, { ReactNode } from 'react';
import styles from './styles.module.scss';
import { UIFlex } from '@components/_shared/Flex';

type Props = {
    children: ReactNode;
    noActions?: boolean;
    className?: string;
    classNameRemoveIcon?: string;
    disabled?: boolean;
    onRemove: () => void;
};

export const FormListView: React.FC<Props> = ({
    children,
    noActions = false,
    className,
    classNameRemoveIcon,
    disabled,
    onRemove,
}) => {
    const cx = useStyles(styles);

    return (
        <div className={cx('container', className)}>
            <UIFlex className={cx('item')}>
                {children}
                {!noActions && (
                    <UIButton
                        className={cx('btn', classNameRemoveIcon)}
                        disabled={disabled}
                        icon={
                            <Icon
                                type="delete-outlined"
                                className={cx('icon', disabled ? '' : 'delete')}
                            />
                        }
                        onClick={onRemove}
                    />
                )}
            </UIFlex>
        </div>
    );
};
