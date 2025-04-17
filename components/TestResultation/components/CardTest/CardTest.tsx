import { UIButton } from '@components/_shared/Button'
import { UICard } from '@components/_shared/Card'
import { UITypography } from '@components/_shared/Typography'
import React from 'react'
import styles from './styles.module.scss'
import { useStyles } from '@hooks/useStyles'
import { TextShorter } from '@components/_shared/TextShorter'

type Props = {
    quiz_name: string;
    created_at: string;
    onClick: () => void
}

export const CardTest: React.FC<Props> = ({ quiz_name, created_at, onClick }) => {
    const cx = useStyles(styles)

    return (
        <UICard className={cx('card')}>
            <UITypography className={cx('text')}>
                <UITypography
                    className={cx('text')}
                    strong
                >
                    Тест:
                </UITypography>
                <TextShorter tooltip title={quiz_name}>{quiz_name}</TextShorter>
            </UITypography>
            <UITypography className={cx('text')}>
                <UITypography
                    className={cx('text')}
                    strong
                >
                    Дата:
                </UITypography>
                {created_at}
            </UITypography>
            <UIButton
                className={cx('btn')}
                size="middle"
                onClick={onClick}
            >
                Просмотр
            </UIButton>
        </UICard>
    )
}

