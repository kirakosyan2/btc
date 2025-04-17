import { useAppSelector } from '@src/redux/store';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LayoutMain } from '.';

export const LayoutProtected: React.FC = () => {
    const { authorized } = useAppSelector((selector) => selector.auth);

    return authorized ? (
        <LayoutMain>
            <Outlet />
        </LayoutMain>
    ) : (
        <Navigate to="/user/login" />
    );
};
