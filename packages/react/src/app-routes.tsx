import { CRMContactForm, CRMContactList, PlanningTaskList, PlanningTaskDetails } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
      path: '/crm-contact-form',
      element: CRMContactForm,
    },
    {
      path: '/crm-contact-list',
      element: CRMContactList
    },
    {
      path: '/planning-task-list',
      element: PlanningTaskList
    },
    {
      path: '/planning-task-details',
      element: PlanningTaskDetails
    }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
