import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './shared/components';
import { AuthGuardService } from './shared/services';

import { CrmContactListComponent } from './pages/crm-contact-list/crm-contact-list.component';
import { CrmContactDetailsComponent } from './pages/crm-contact-details/crm-contact-details.component';
import { PlanningTaskListComponent } from './pages/planning-task-list/planning-task-list.component';
import { PlanningTaskDetailsComponent } from './pages/planning-task-details/planning-task-details.component';
import { AnalyticsDashboardComponent } from './pages/analytics-dashboard/analytics-dashboard.component';
import { AnalyticsSalesReportComponent } from './pages/analytics-sales-report/analytics-sales-report.component';
import { AnalyticsGeographyComponent } from './pages/analytics-geography/analytics-geography.component';

const routes: Routes = [
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
    component: PlanningTaskDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'analytics-dashboard',
    component: AnalyticsDashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'analytics-sales-report',
    component: AnalyticsSalesReportComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'analytics-geography',
    component: AnalyticsGeographyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'crm-contact-list',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
