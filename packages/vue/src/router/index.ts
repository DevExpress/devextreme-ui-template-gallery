import { createRouter, createWebHashHistory } from 'vue-router';
import CrmContactList from '@/pages/crm-contact-list/crm-contact-list.vue';
import CrmContactForm from '@/pages/crm-contact-form/crm-contact-form.vue';
import LoginForm from '@/pages/login-form.vue';
import defaultLayout from '../layouts/side-nav-outer-toolbar.vue';
import simpleLayout from '../layouts/single-card.vue';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/crm-contact-list',
    },
    {
      path: '/login-form',
      name: 'login-form',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        noFooter: true,
        title: 'Sign In',
      },
      component: LoginForm,
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
