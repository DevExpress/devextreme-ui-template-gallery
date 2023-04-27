import { createRouter, createWebHashHistory } from 'vue-router';
import defaultLayout from '@/layouts/side-nav-outer-toolbar.vue';
import simpleLayout from '@/layouts/single-card.vue';
import { authInfo } from '@/auth';

function loadAuthComponent(ComponentFileName: string) {
  // eslint-disable-next-line func-call-spacing
  return () => import (/* webpackChunkName: "auth" */ `@/components/library/${ComponentFileName}.vue`);
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/crm-contact-list',
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Sign In',
      },
      props: { resetLink: '/reset-password', createAccountLink: '/create-account' },
      component: loadAuthComponent('login-form'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      props: { signInLink: '/login', buttonLink: '/login' },
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Reset Password',
        description: 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.',
      },
      component: loadAuthComponent('reset-password-form'),
    },
    {
      path: '/create-account',
      name: 'create-account',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Sign Up',
      },
      props: { redirectLink: '/login', buttonLink: '/login' },
      component: loadAuthComponent('create-account-form'),
    },
    {
      path: '/change-password/:recoveryCode',
      name: 'change-password',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Change Password',
      },
      component: loadAuthComponent('change-password-form'),
    },
    ...[
      'crm-contact-list',
      'crm-contact-details',
      'planning-task-list',
      'planning-task-details',
      'analytics-dashboard',
      'analytics-sales-report',
      'analytics-geography',
      'sign-in-form',
      'sign-up-form',
      'reset-password-form',
      'user-profile',
    ].map((name) => ({
      path: `/${name}`,
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      // eslint-disable-next-line func-call-spacing
      component: () => import (/* webpackChunkName: "pages" */ `@/pages/${name}.vue`),
    })),
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
