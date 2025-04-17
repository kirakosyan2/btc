import React from 'react';
import styles from './styles.module.scss';
import { UIButton } from '@components/_shared/Button';
import { Flex } from 'antd';
import { useStyles } from '@hooks/useStyles';
import { FormTextArea } from '@components/_shared/Form/FormTextArea/FormTextArea';

type Props = {
    description: string;
    label: string;
    onClick: () => void;
};
export const CardSpark: React.FC<Props> = ({ onClick, description, label }) => {
    const cx = useStyles(styles);

    return (
        <Flex
            vertical
            gap={20}
            className={cx('container')}
        >
            <FormTextArea
                formProps={{
                    name: 'preset',
                    label: label,
                }}
                textAreaProps={{
                    defaultValue: description,
                    className: cx('textarea'),
                    readOnly: true,
                }}
            />
            <UIButton
                size="large"
                onClick={onClick}
            >
                Выбрать
            </UIButton>
        </Flex>
    );
};
