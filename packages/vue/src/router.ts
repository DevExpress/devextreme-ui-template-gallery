import { createRouter, createWebHashHistory } from 'vue-router';
import defaultLayout from '@/layouts/side-nav-outer-toolbar.vue';
import simpleLayout from '@/layouts/single-card.vue';
import { authInfo } from '@/auth';

// Eager imports for all pages
import CrmContactList from '@/pages/crm-contact-list.vue';
import CrmContactDetails from '@/pages/crm-contact-details.vue';
import PlanningTaskList from '@/pages/planning-task-list.vue';
import PlanningTaskDetails from '@/pages/planning-task-details.vue';
import PlanningScheduler from '@/pages/planning-scheduler.vue';
import AnalyticsDashboard from '@/pages/analytics-dashboard.vue';
import AnalyticsSalesAnalysis from '@/pages/analytics-sales-analysis.vue';
import AnalyticsGeography from '@/pages/analytics-geography.vue';
import SignInForm from '@/pages/sign-in-form.vue';
import RegisterForm from '@/pages/register-form.vue';
import ResetPasswordForm from '@/pages/reset-password-form.vue';
import UserProfile from '@/pages/user-profile.vue';

function loadAuthComponent(ComponentFileName: string) {
   
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
      path: '/sign-in',
      name: 'sign-in',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Sign In',
      },
      props: { resetLink: '/reset-password', createAccountLink: '/register' },
      component: loadAuthComponent('login-form'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      props: { signInLink: '/sign-in', buttonLink: '/sign-in' },
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Reset Password',
        description: 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.',
      },
      component: loadAuthComponent('reset-password-form'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Register',
      },
      props: { redirectLink: '/sign-in', buttonLink: '/sign-in' },
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
      { from: '/create-account', to: '/register' },
      { from: '/login', to: '/sign-in' },
    ].map((redirect) => ({ path: redirect.from, redirect: redirect.to })),
    ...[
      { name: 'crm-contact-list', component: CrmContactList },
      { name: 'crm-contact-details', component: CrmContactDetails },
      { name: 'planning-task-list', component: PlanningTaskList },
      { name: 'planning-task-details', component: PlanningTaskDetails },
      { name: 'planning-scheduler', component: PlanningScheduler },
      { name: 'analytics-dashboard', component: AnalyticsDashboard },
      { name: 'analytics-sales-analysis', component: AnalyticsSalesAnalysis },
      { name: 'analytics-geography', component: AnalyticsGeography },
      { name: 'sign-in-form', component: SignInForm },
      { name: 'register-form', component: RegisterForm },
      { name: 'reset-password-form', component: ResetPasswordForm },
      { name: 'user-profile', component: UserProfile },
    ].map(({ name, component }) => ({
      path: `/${name}`,
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component,
    })),
    ...[
      { from: '/analytics-sales-report', to: '/analytics-sales-analysis' },
      { from: '/sign-up-form', to: '/register-form' },
    ].map((redirect) => ({ path: redirect.from, redirect: redirect.to })),
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
