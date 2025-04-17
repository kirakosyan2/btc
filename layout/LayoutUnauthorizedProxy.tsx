import { useAppSelector } from '@src/redux/store';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutMain } from './LayoutMain';

export const LayoutUnauthorizedProxy: React.FC = () => {
  const location = useLocation();
  const naviagte = useNavigate();
  const { authorized } = useAppSelector((selector) => selector.auth);

  useEffect(() => {
    if (location.pathname === '/' && !authorized) {
      naviagte('/user/login');
    }

    if (location.pathname === '/' && authorized) {
      naviagte('/initiative');
    }
  }, [location, authorized]);

  return (
    <LayoutMain>
      <Outlet />
    </LayoutMain>
  );
};
