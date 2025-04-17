import React from 'react';

// import { UIButton } from '@components/_shared/Button';
import { UICard } from '@components/_shared/Card';
import { UIFlex } from '@components/_shared/Flex';
import { UIModal } from '@components/_shared/Modal';
import { UITitle } from '@components/_shared/Title';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { UserFunc } from '../UserFunc';
import styles from './styles.module.scss';

export const UserFuncBlock: React.FC = () => {
    const cx = useStyles(styles);
    const { isOpened, closePopup } = usePopupControls();

    return (
        <UICard>
            <UIFlex vertical>
                <UITitle level={3} className={cx('title')}>
                    Пользовательские функции
                </UITitle>

                {/* <UIFlex justify="center">
                    <UIButton
                        onClick={openPopup}
                        size="large"
                        type="primary"
                        className={cx('btn')}>
                        Переопределить пользовательские функции
                    </UIButton>
                </UIFlex> */}

                <UIModal
                    open={isOpened}
                    onClose={closePopup}
                    onCancel={closePopup}
                    destroyOnClose
                    footer={null}
                    style={{
                        top: 10,
                        height: '100vh',
                    }}
                    width={'100%'}
                    height={'100%'}>
                    <UserFunc />
                </UIModal>
            </UIFlex>
        </UICard>
    );
};
