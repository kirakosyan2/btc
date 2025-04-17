import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { CheckCard } from '../CheckCard';
import { eUserRoles } from '@src/redux/auth/auth';
import { Checks } from '@src/redux/DQC/DQC';

type Props = {
    data: Checks[];
    isLoadingUpdate: boolean;
    role: eUserRoles | null;
    removeCheck: (id: string) => void;
    onChangeField: (id: string, value: string | boolean, field: string) => void;
};

export const CheckContentView: React.FC<Props> = ({
    data,
    isLoadingUpdate,
    role,
    removeCheck,
    onChangeField,
}) => {
    const cx = useStyles(styles);

    return (
        <UIFlex vertical>
            {data.map((field) => (
                <CheckCard
                    key={field.id}
                    field={field}
                    role={role}
                    remove={() => removeCheck(field.id as string)}
                    onChangeField={onChangeField}
                />
            ))}

            <UIFlex justify="center">
                <UIButton
                    className={cx('btn')}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingUpdate}
                    disabled={isLoadingUpdate || [eUserRoles.BUISNESS].includes(role as eUserRoles)}
                >
                    Сохранить
                </UIButton>
            </UIFlex>
        </UIFlex>
    );
};
