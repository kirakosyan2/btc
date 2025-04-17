import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { Checks } from '@src/redux/DQC/DQC';
import { CheckContent } from './CheckContent';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { eUserRoles } from '@src/redux/auth/auth';
import { addDQCCheck } from '@src/redux/DQC/DQCCheck.slice';

type Props = {
    threadId: string;
    onClose: () => void;
};

export const TabCheck: React.FC<Props> = ({ threadId }) => {
    const cx = useStyles(styles);
    const dispatch = useAppDispatch();

    const { role } = useAppSelector((store) => store.auth);

    const addCheck = () => {
        const payload: Checks = {
            id: `${new Date().getMilliseconds() + Math.random()}`,
            name: '',
            value: '',
            description: '',
            enabled: false,
            is_blocker: false,
            is_incident: false,
        };

        dispatch(addDQCCheck(payload));
    };

    return (
        <UIFlex
            vertical
            gap={40}
        >
            <UIFlex justify="center">
                <UIButton
                    size="large"
                    type="primary"
                    className={cx('btn')}
                    disabled={[eUserRoles.BUISNESS].includes(role as eUserRoles)}
                    onClick={addCheck}
                >
                    Добавить проверку
                </UIButton>
            </UIFlex>

            <CheckContent threadId={threadId} />
        </UIFlex>
    );
};
