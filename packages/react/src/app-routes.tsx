import { CRMContactForm, CRMContactList, PlanningTaskList, PlanningTaskDetails, AnalyticsDashboard, AnalyticsSalesReport, AnalyticsGeography } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
  {
    path: '/crm-contact-form',
    element: CRMContactForm,
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
];

export const appRoutes = routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
