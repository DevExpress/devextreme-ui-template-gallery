import { Routes } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './components';
import { AuthGuardService } from './services';

import { SideNavOuterToolbarComponent, UnauthenticatedContentComponent } from './layouts';

import { CrmContactListComponent } from './pages/crm-contact-list/crm-contact-list.component';
import { CrmContactDetailsComponent } from './pages/crm-contact-details/crm-contact-details.component';
import { PlanningTaskListComponent } from './pages/planning-task-list/planning-task-list.component';
import { PlanningTaskDetailsComponent } from './pages/planning-task-details/planning-task-details.component';
import { AnalyticsDashboardComponent } from './pages/analytics-dashboard/analytics-dashboard.component';
import { AnalyticsSalesAnalysisComponent } from './pages/analytics-sales-analysis/analytics-sales-analysis.component';
import { AnalyticsGeographyComponent } from './pages/analytics-geography/analytics-geography.component';
import { PlanningSchedulerComponent } from './pages/planning-scheduler/planning-scheduler.component';
import { AppSignInComponent } from './pages/sign-in-form/sign-in-form.component';
import { AppRegisterComponent } from './pages/register-form/register-form.component';
import { AppResetPasswordComponent } from './pages/reset-password-form/reset-password-form.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: UnauthenticatedContentComponent,
    children: [
      {
        path: 'sign-in',
        component: LoginFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'register',
        component: CreateAccountFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'change-password/:recoveryCode',
        component: ChangePasswordFormComponent,
        canActivate: [AuthGuardService],
      },
      ...[
        { from: 'create-account', to: 'register' },
        { from: 'login', to: 'sign-in' },
      ].map(redirect => ({ path: redirect.from, redirectTo: redirect.to, pathMatch: 'full' as const })),
      {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    component: SideNavOuterToolbarComponent,
    children: [
      {
        path: 'crm-contact-list',
        component: CrmContactListComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'crm-contact-details',
        component: CrmContactDetailsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'planning-task-list',
        component: PlanningTaskListComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'planning-task-details',
        component: PlanningTaskDetailsComponent
      },
      {
        path: 'planning-scheduler',
        component: PlanningSchedulerComponent
      },
      {
        path: 'analytics-dashboard',
        component: AnalyticsDashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'analytics-sales-analysis',
        component: AnalyticsSalesAnalysisComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'analytics-geography',
        component: AnalyticsGeographyComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'sign-in-form',
        component: AppSignInComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'register-form',
        component: AppRegisterComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'reset-password-form',
        component: AppResetPasswordComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      ...[
        { from: 'analytics-sales-report', to: 'analytics-sales-analysis' },
        { from: 'sign-up-form', to: 'register-form' },
      ].map(redirect => ({ path: redirect.from, redirectTo: redirect.to, pathMatch: 'full' as const })),
      {
        path: '**',
        redirectTo: 'crm-contact-list',
        pathMatch: 'full',
      },
    ]
  },
];
