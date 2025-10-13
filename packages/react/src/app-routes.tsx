import React from 'react';
import {
  CRMContactDetails,
  CRMContactList,
  PlanningScheduler,
  PlanningTaskList,
  PlanningTaskDetails,
  AnalyticsDashboard,
  AnalyticsSalesAnalysis,
  AnalyticsGeography,
  SignInPage,
  RegisterPage,
  ResetPasswordPage,
  UserProfile
} from './pages';
import { withNavigationWatcher } from './contexts/navigation';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: '/crm-contact-details',
    element: CRMContactDetails,
  },
  {
    path: '/crm-contact-list',
    element: CRMContactList,
  },
  {
    path: '/planning-task-list',
    element: PlanningTaskList,
  },
  {
    path: '/planning-task-details',
    element: PlanningTaskDetails,
  },
  {
    path: '/planning-scheduler',
    element: PlanningScheduler,
  },
  {
    path: '/analytics-dashboard',
    element: AnalyticsDashboard,
  },
  {
    path: '/analytics-sales-analysis',
    element: AnalyticsSalesAnalysis,
  },
  {
    path: '/analytics-geography',
    element: AnalyticsGeography,
  },
  {
    path: '/sign-in-form',
    element: SignInPage,
  },
  {
    path: '/register-form',
    element: RegisterPage,
  },
  {
    path: '/reset-password-form',
    element: ResetPasswordPage,
  },
  {
    path: '/user-profile',
    element: UserProfile,
  },
];

const redirects = [
  { from: '/analytics-sales-report', to: '/analytics-sales-analysis' },
  { from: '/sign-up-form', to: '/register-form' },
];

const redirectRoutes = redirects.map(({ from, to }) => ({
  path: from,
  element: <Navigate to={to} replace />,
}));

export const appRoutes = [
  ...routes.map((route) => ({
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  })),
  ...redirectRoutes,
];
