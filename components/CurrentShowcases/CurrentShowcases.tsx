import { FloatButton } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { UIFlex } from '@components/_shared/Flex';
import { UIFloatButton } from '@components/_shared/FloatButton';
import { Icon, IconsType } from '@components/_shared/Icon';

import { useStyles } from '@hooks/useStyles';

import { Bitbacket } from './components/Bitbacket';
import { BranchShowcases } from './components/BranchShowcases';
import { CTL } from './components/CTL';
import { Checklist } from './components/Checklist';
import { Clusters } from './components/Clusters';
import { Devops } from './components/Devops';
import { GlobalsParams } from './components/GlobalsParams';
import { Jenkins } from './components/Jenkins';
import { Kibana } from './components/Kibana/Kibana';
import { Showcase } from './components/Showcase';
import styles from './styles.module.scss';

type Section = {
    name: string;
    component: React.ComponentType<{ isReference: boolean }>;
    icon: IconsType;
    tooltip: string;
};

export const CurrentShowcases: React.FC = () => {
    const cx = useStyles(styles);
    const isReference = location.pathname.includes('reference');

    const sections: Section[] = useMemo(
        () => [
            {
                name: 'showcase',
                component: Showcase,
                icon: 'bold-outlined',
                tooltip: 'Витрина',
            },
            {
                name: 'bitbucket',
                component: Bitbacket,
                icon: 'bitbuket',
                tooltip: 'BitBucket',
            },
            {
                name: 'globalsParams',
                component: GlobalsParams,
                icon: 'global-outlined',
                tooltip: 'Глобальные CTL параметры',
            },
            {
                name: 'clusters',
                component: Clusters,
                icon: 'cluster-outlined',
                tooltip: 'Кластеры',
            },
            {
                name: 'devops',
                component: Devops,
                icon: 'cloud-outlined',
                tooltip: 'DevOps',
            },
            {
                name: 'ctl',
                component: CTL,
                icon: 'forko-utlined',
                tooltip: 'CTL сущности',
            },
            {
                name: 'kibana',
                component: Kibana,
                icon: 'area-chart-outlined',
                tooltip: 'Журналирование (Kibana)',
            },
            {
                name: 'branchShowcases',
                component: BranchShowcases,
                icon: 'apartment-outlined',
                tooltip: 'Ветки витрины',
            },
            {
                name: 'jenkins',
                component: Jenkins,
                icon: 'tool-outlined',
                tooltip: 'Jenkins',
            },
            {
                name: 'checkList',
                component: Checklist,
                icon: 'form-outlined',
                tooltip: 'Чек-лист',
            },
        ],
        []
    );

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    const refs = useMemo(
        () =>
            sections.reduce(
                (acc, { name }) => {
                    acc[name] = useRef<HTMLDivElement>(null);
                    return acc;
                },
                {} as Record<string, React.RefObject<HTMLDivElement>>
            ),
        []
    );

    const scrollToRef = useCallback((ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <>
            <UIFlex className={cx('container')} vertical gap={40}>
                {sections.map(({ name, component: Component }) => (
                    <div key={name} ref={refs[name]} className={cx('block')}>
                        <Component isReference={isReference} />
                    </div>
                ))}
            </UIFlex>
            <FloatButton.Group
                shape="square"
                style={{ right: 2000, bottom: 60 }}>
                {sections.map(({ name, icon, tooltip }) => (
                    <UIFloatButton
                        key={name}
                        icon={
                            <Icon
                                className={cx('icon')}
                                type={icon}
                                size="ms"
                            />
                        }
                        tooltip={tooltip}
                        onClick={() => scrollToRef(refs[name])}
                    />
                ))}
            </FloatButton.Group>
        </>
    );
};
