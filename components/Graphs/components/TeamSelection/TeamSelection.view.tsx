import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UICard } from '@components/_shared/Card';
import { UITitle } from '@components/_shared/Title';
import { FormSelect } from '@components/_shared/Form/FormSelect';
import { TransformTeamsList } from '@src/redux/teams/teams';

type Props = {
    teamsList: TransformTeamsList[];
    isLoadingTeams: boolean;
};

export const TeamSelectionView: React.FC<Props> = ({ teamsList, isLoadingTeams }) => {
    const cx = useStyles(styles);

    return (
        <UICard className={cx('container')}>
            <UITitle
                className={cx('title')}
                level={3}
            >
                Выбор команды
            </UITitle>
            <FormSelect
                formProps={{
                    name: 'team',
                    label: <UITitle level={5}>Команда</UITitle>,
                    rules: [
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ],
                    className: cx('contentItem'),
                }}
                selectProps={{
                    options: teamsList,
                    disabled: isLoadingTeams,
                    placeholder: 'Название команды',
                    size: 'large',
                }}
            />
        </UICard>
    );
};
