import React from 'react'
import styles from './styles.module.scss'
import { useStyles } from '@hooks/useStyles'
import { UICard } from '@components/_shared/Card'
import { UITitle } from '@components/_shared/Title'
import { TResultTest } from '@src/redux/test/test'
import { UIProgressBar } from '@components/_shared/ProgressBar'
import { UIFlex } from '@components/_shared/Flex'
import { UITypography } from '@components/_shared/Typography'
import { LinkButton } from '@components/_shared/LinkButton'

type Props = {
    data?: TResultTest
    bordered?: boolean
    isMyStatistic?: boolean
}

export const ResultTest: React.FC<Props> = ({ data, bordered = true, isMyStatistic = true }) => {
    const cx = useStyles(styles)


    return (
        <UICard className={cx('container')} bordered={bordered}>
            <UIFlex vertical justify='center' align='center'>
                <UITitle className={cx('title')}>Результат</UITitle>
                <UIProgressBar type='circle' percent={data?.score} strokeColor={Number(data?.score) > 80 ? '#52c41a' : 'red'} format={(percent) => `${percent}%`} />
            </UIFlex>
            <UIFlex vertical className={cx('content')}>
                <UITypography className={cx('text', 'correct')}>Даны верные ответы на вопросы:</UITypography>
                <ul>
                    {data?.correct_questions.map((item) => (
                        <li key={item} className={cx('question', 'correct')}>{item}</li>
                    ))}
                </ul>

                <UITypography className={cx('text', 'incorrect')} style={{ marginTop: 20 }}>Даны неверные ответы на вопросы:</UITypography>
                <ul>
                    {data?.incorrect_questions.map((item) => (
                        <li key={item} className={cx('question', 'incorrect')}>{item}</li>
                    ))}
                </ul>
            </UIFlex>

            {isMyStatistic && (
                <UIFlex justify='center' className={cx('containerBtn')}>
                    <LinkButton to={'/test/statistic'} className={cx('btn')}>Моя статистика</LinkButton>
                </UIFlex>
            )}
        </UICard>
    )
}
