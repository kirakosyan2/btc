import { useStyles } from '@hooks/useStyles';
import { Select, SelectProps } from 'antd';
import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = SelectProps;

export const UISelect: React.FC<Props> = ({ placeholder, className, ...props }) => {
    const cx = useStyles(styles);

    const NoContent: React.FC = (): ReactNode => <div className={cx('noContent')}>Нет данных</div>;

    return (
        <Select
            {...props}
            className={cx('ant-select', className)}
            notFoundContent={props.notFoundContent ?? <NoContent />}
        />
    );
};

export type { Props as UISelectProps };
