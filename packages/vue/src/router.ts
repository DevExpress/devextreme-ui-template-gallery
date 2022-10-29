import { createRouter, createWebHashHistory } from 'vue-router';
import defaultLayout from '@/layouts/side-nav-outer-toolbar.vue';
import simpleLayout from '@/layouts/single-card.vue';
import { authInfo } from '@/auth';

function loadComponent(ComponentFileName: string) {
  // eslint-disable-next-line func-call-spacing
  return () => import (/* webpackChunkName: "login" */ `@/pages/${ComponentFileName}.vue`);
}

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
        title: 'Sign In',
      },
      component: loadComponent('login-form'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Reset Password',
        description: 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.',
      },
      component: loadComponent('reset-password-form'),
    },
    {
      path: '/create-account',
      name: 'create-account',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Sign Up',
      },
      component: loadComponent('create-account-form'),
    },
    {
      path: '/change-password/:recoveryCode',
      name: 'change-password',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Change Password',
      },
      component: loadComponent('change-password-form'),
    },
    {
      path: '/crm-contact-list',
      name: 'crm-contact-list',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: loadComponent('crm-contact-list/crm-contact-list'),
    },
    {
      path: '/crm-contact-details',
      name: 'crm-contact-details',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: loadComponent('crm-contact-details/crm-contact-details'),
    },
    {
      path: '/planning-task-list',
      name: 'planning-task-list',
      meta: {
        // requiresAuth: true,
        layout: defaultLayout,
      },
      component: loadComponent('planning-task-list/planning-task-list'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login-form' && authInfo.loggedIn()) {
    next({ name: 'home' });
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authInfo.loggedIn()) {
      next({
        name: 'login-form',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
