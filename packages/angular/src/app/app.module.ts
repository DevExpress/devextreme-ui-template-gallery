import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import {
  FooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './shared/components';

import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { CrmContactListModule } from './pages/crm-contact-list/crm-contact-list.component';
import { CrmContactFormModule } from './pages/crm-contact-form/crm-contact-form.component';
import { PlanningTaskListModule } from './pages/planning-task-list/planning-task-list.component';
import { PlanningTaskDetailsModule } from './pages/planning-task-details/planning-task-details.component';
import { AnalyticsDashboardModule } from './pages/analytics-dashboard/analytics-dashboard.component';
import { AnalyticsSalesReportModule } from './pages/analytics-sales-report/analytics-sales-report.component';
import { AnalyticsGeographyModule } from './pages/analytics-geography/analytics-geography.component'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,

    CrmContactListModule,
    CrmContactFormModule,
    PlanningTaskListModule,
    PlanningTaskDetailsModule,
    AnalyticsDashboardModule,
    AnalyticsSalesReportModule,
    AnalyticsGeographyModule,

    AppRoutingModule,
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent],
})
export class AppModule { }
