import React from 'react';

import { UIFlex } from '@components/_shared/Flex';
import { UITitle } from '@components/_shared/Title';

import { useStyles } from '@hooks/useStyles';

import { RenderInitiativeItems } from './components/RenderInitiativeItems/RenderInitiativeItems';
import styles from './styles.module.scss';

export const InitiativeView: React.FC = () => {
    const cx = useStyles(styles);

    return (
        <div>
            <UITitle level={2} className={cx('title')}>
                Инициативы
            </UITitle>
            <UIFlex>
                <RenderInitiativeItems />
            </UIFlex>
        </div>
    );
};
