import { FC } from 'react';
import { RouteObject } from 'react-router-dom';

import { BranchShowcases } from '@components/BranchShowcase';
import { NewShowcase } from '@components/NewShowcase';
import { ShowcaseConfig } from '@components/ShowcaseConfig';

import { LayoutProtected, LayoutUnauthorizedProxy } from './layout';
import { AuthPage } from './pages/AuthPage';
import { BlocksPage } from './pages/BlocksPage';
import { CreateAcesPage } from './pages/CreateAcesPage';
import { CreateInitiativePage } from './pages/CreateInitiativePage';
import { CurrentShowcasesPage } from './pages/CurrentShowcasesPage';
import { CustomersPage } from './pages/CustomersPage';
import { GraphsPage } from './pages/GraphsPage/GraphsPage';
import { InitiativePage } from './pages/InitiativePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PersonalCabinetPage } from './pages/PersonalCabinetPage';
import { FAQPage } from './pages/QAPage/QAPage';
import { ReleasePage } from './pages/ReleasePage';
import { S2TPage } from './pages/S2TPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { TeamsPage } from './pages/TeamsPage';
import { TestPage } from './pages/TestPage';
import { TestResultationPage } from './pages/TestResultationPage';

type IRouterConfig = RouteObject & {
    breadcrumbs?: IBreadcrumbs;
    children?: IRouterConfig[];
    layout?: boolean;
    access?: string[];
};

type IBreadcrumbs = {
    name?: string;
    icon?: FC;
};

const routes: IRouterConfig[] = [
    {
        path: '/',
        element: <LayoutUnauthorizedProxy />,
        children: [
            {
                path: 'user/login',
                element: <AuthPage />,
            },
            {
                path: 'user/registration',
                element: <AuthPage />,
            },
            {
                path: 'user/password/recovery',
                element: <AuthPage />,
            },
            {
                path: 'user/password/reset',
                element: <AuthPage />,
            },
        ],
    },
    {
        path: '/administaration',
        element: <LayoutProtected />,
        children: [
            {
                path: 'blocks',
                element: <BlocksPage />,
            },
            {
                path: 'teams',
                element: <TeamsPage />,
            },
            {
                path: 'customers',
                element: <CustomersPage />,
            },
            {
                path: 'initiative',
                element: <CreateInitiativePage />,
            },
            {
                path: 'aces',
                element: <CreateAcesPage />,
            },
        ],
    },
    {
        path: '/etl',
        element: <LayoutProtected />,
        children: [
            {
                path: 'config/update',
                element: <ShowcaseConfig />,
            },
            {
                path: 'create_etl',
                element: <NewShowcase />,
            },
            {
                path: 'subscribes',
                element: <div>Ведутся технические работы.</div>,
            },
        ],
    },
    {
        path: '/s2t',
        element: <LayoutProtected />,
        children: [
            {
                path: 'generate',
                element: <S2TPage />,
            },
        ],
    },
    {
        path: '/',
        element: <LayoutProtected />,
        children: [
            {
                path: 'graphs',
                element: <GraphsPage />,
            },
        ],
    },
    {
        path: '/',
        element: <LayoutProtected />,
        children: [
            {
                path: 'initiative',
                element: <InitiativePage />,
            },
            {
                path: 'initiative/:id',
                element: <ShowcasePage />,
            },
            {
                path: 'showcase/:id',
                element: <CurrentShowcasesPage />,
            },
            {
                path: 'showcase/reference/:id',
                element: <CurrentShowcasesPage />,
            },
            {
                path: 'branch/:id',
                element: <BranchShowcases />,
            },
            {
                path: 'branch/reference/:id',
                element: <BranchShowcases />,
            },
            {
                path: 'cabinet',
                element: <PersonalCabinetPage />,
            },
            {
                path: 'release/:id',
                element: <ReleasePage />,
            },
            {
                path: 'support',
                element: <FAQPage />,
            },
            {
                path: 'test',
                element: <TestPage />,
            },
            {
                path: 'test/statistic',
                element: <TestResultationPage />,
            },
        ],
    },
    // TODO: Сделать переход на несуществующую страницу
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

export default routes;

export type { IBreadcrumbs, IRouterConfig };
