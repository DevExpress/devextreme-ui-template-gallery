import { withNavigationWatcher } from './contexts/navigation';
import { CRMContactForm, CRMContactList, PlanningTaskDetails, PlanningTaskList } from './pages';

const routes = [
    {
      path: '/crm-contact-form',
      component: CRMContactForm,
      
    },
    {
      path: '/crm-contact-list',
      component: CRMContactList
    },
    {
      path: '/planning-task-list',
      component: PlanningTaskList
    },
    {
      path: '/planning-task-details',
      component: PlanningTaskDetails
    }
  ];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
