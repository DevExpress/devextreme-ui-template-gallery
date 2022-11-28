import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { appInfo } from './app-info';
import { appRoutes } from './app-routes';
import { SideNavOuterToolbar as SideNavBarLayout } from './layouts';

export const Content = () => {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <Routes>
        {appRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path='*' element={<Navigate to='/crm-contact-list' />} />
      </Routes>
    </SideNavBarLayout>
  );
};
