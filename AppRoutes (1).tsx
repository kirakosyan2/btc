import React from 'react';
import { useRoutes } from 'react-router-dom';
import RouterConfig from './Routes';

export const AppRoutes: React.FC = () => {
  const Router = useRoutes(RouterConfig);
  return Router;
};
