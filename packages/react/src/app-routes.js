import { withNavigationWatcher } from './contexts/navigation';
import { CrmContactListPage } from './pages';

const routes = [
  {
    path: '/crm-contact-list',
    component: CrmContactListPage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
