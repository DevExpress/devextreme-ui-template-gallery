import {
  CRMContactDetails,
  CRMContactList,
  PlanningTaskList,
  PlanningTaskDetails,
  AnalyticsDashboard,
  AnalyticsSalesReport,
  AnalyticsGeography,
  SignInPage,
  SignUpPage,
  ResetPasswordPage
} from './pages';
import { withNavigationWatcher } from './contexts/navigation';

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
    path: '/analytics-dashboard',
    element: AnalyticsDashboard,
  },
  {
    path: '/analytics-sales-report',
    element: AnalyticsSalesReport,
  },
  {
    path: '/analytics-geography',
    element: AnalyticsGeography,
  },
  {
    path: '/signin-form-page',
    element: SignInPage,
  },
  {
    path: '/signup-form-page',
    element: SignUpPage,
  },
  {
    path: '/reset-password-form-page',
    element: ResetPasswordPage,
  }
];

export const appRoutes = routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
