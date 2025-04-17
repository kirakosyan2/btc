import React from 'react';
import styles from './styles.module.scss';
import { useStyles } from '@hooks/useStyles';
import { UICard } from '@components/_shared/Card';
import { UITypography } from '@components/_shared/Typography';
import { UIButton } from '@components/_shared/Button';
import { UIFlex } from '@components/_shared/Flex';
import { UIInput } from '@components/_shared/Input';
import { StreamList } from '@src/redux/stream/stream';

type Props = {
    data: StreamList;
    onClickDetailFlow: () => void;
    onClickDetailGlobalParams: () => void;
};

export const CardDML: React.FC<Props> = ({
    data,
    onClickDetailFlow,
    onClickDetailGlobalParams,
}) => {
    const cx = useStyles(styles);

    return (
        <>
            <UICard className={cx('container')}>
                <UIFlex
                    vertical
                    className={cx('blockTitle')}
                >
                    <UITypography
                        className={cx('text')}
                        strong
                    >
                        Название потока:
                    </UITypography>
                    <UIInput
                        defaultValue={data.name}
                        readOnly
                    />
                </UIFlex>
                <UIFlex
                    className={cx('containerBtn')}
                    vertical
                    gap={10}
                >
                    <UIButton
                        className={cx('btn')}
                        size="middle"
                        onClick={onClickDetailGlobalParams}
                    >
                        Настроить глобальные параметры
                    </UIButton>
                    <UIButton
                        className={cx('btn')}
                        type="primary"
                        size="middle"
                        onClick={onClickDetailFlow}
                    >
                        Настроить граф
                    </UIButton>
                </UIFlex>
            </UICard>
        </>
    );
};
