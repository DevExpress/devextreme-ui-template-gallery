import { createRouter, createWebHashHistory } from 'vue-router';
import defaultLayout from '../layouts/side-nav-outer-toolbar.vue';
import CrmContactList from '@/pages/crm-contact-list/crm-contact-list.vue';
import CrmContactForm from '@/pages/crm-contact-form/crm-contact-form.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/crm-contact-list',
    },
    {
      path: '/crm-contact-list',
      name: 'crm-contact-list',
      meta: {
        // requiresAuth: true,
        layout: defaultLayout,
      },
      component: CrmContactList,
    },
    {
      path: '/crm-contact-form',
      name: 'crm-contact-form',
      meta: {
        // requiresAuth: true,
        layout: defaultLayout,
      },
      component: CrmContactForm,
    },
  ],
});

export default router;
