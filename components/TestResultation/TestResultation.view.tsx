import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';

import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { UIProgressBar } from '@components/_shared/ProgressBar';
import { UIStatistic, UIStatisticProps } from '@components/_shared/Statistic';
import { UITitle } from '@components/_shared/Title';
import { UITypography } from '@components/_shared/Typography';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { Results, Statistic } from '@src/redux/test/test';

import { CardTest } from './components/CardTest';
import { ModalResultTest } from './components/ModalResultTest';
import styles from './styles.module.scss';

type Props = {
    statistic?: Statistic;
    resultsList: Results[];
};
export const TestResultationView: React.FC<Props> = ({
    statistic,
    resultsList,
}) => {
    const cx = useStyles(styles);
    const navigate = useNavigate();
    const { isOpened, openPopup, closePopup } = usePopupControls();
    const [id, setId] = useState<number>();

    const goToTestPage = () => {
        navigate('/test');
    };

    const openModalStatistic = (id: number) => {
        return () => {
            setId(id);
            openPopup();
        };
    };

    const formatter: UIStatisticProps['formatter'] = (value) => (
        <CountUp end={value as number} />
    );

    return (
        <>
            <UICard style={{ marginBottom: 20 }}>
                <UIFlex vertical style={{ marginBottom: 60 }} align="center">
                    <UITitle className={cx('title')} level={4}>
                        Лучший результат
                    </UITitle>

                    <UIFlex vertical align="center">
                        <UIProgressBar
                            percent={statistic?.best_score}
                            type="circle"
                            format={(format) => `${format}%`}
                            strokeColor={
                                Number(statistic?.best_score) > 80
                                    ? '#52c41a'
                                    : 'red'
                            }
                        />
                    </UIFlex>
                </UIFlex>

                <UIFlex justify="space-between">
                    <UIStatistic
                        title="Количество попыток"
                        formatter={formatter}
                        className={cx('statistic', 'normal')}
                        value={statistic?.attemts_cnt}
                    />
                    <UIStatistic
                        title="Успешных попыток"
                        formatter={formatter}
                        className={cx('statistic', 'success')}
                        valueStyle={{ color: '#2db099' }}
                        value={statistic?.success_res_cnt}
                    />
                    <UIStatistic
                        title="Неудачных попыток"
                        formatter={formatter}
                        className={cx('statistic', 'wrong')}
                        valueStyle={{ color: '#dc3545' }}
                        value={statistic?.unsuccessfull_cnt}
                    />
                </UIFlex>
            </UICard>
            <UICard
                classNames={{
                    body: cx('cards'),
                }}>
                <UITitle className={cx('title')} level={4}>
                    Мои попытки
                </UITitle>

                <UIFlex className={cx('container')} gap={40} wrap>
                    {resultsList.length ? (
                        resultsList.map((item) => (
                            <CardTest
                                {...item}
                                onClick={openModalStatistic(item.id)}
                            />
                        ))
                    ) : (
                        <UITypography className={cx('text')}>
                            Нет данных
                        </UITypography>
                    )}
                </UIFlex>
            </UICard>

            <UIFlex justify="center" className={cx('containerBtn')}>
                <UIButton
                    size="large"
                    type="primary"
                    className={cx('btn')}
                    onClick={goToTestPage}>
                    Пройти тест
                </UIButton>
            </UIFlex>

            <ModalResultTest opened={isOpened} id={id} onClose={closePopup} />
        </>
    );
};
