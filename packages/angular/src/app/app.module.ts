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
  ActivitiesModule,
} from './shared/components';

// import {
//   DxDataGridModule,
//   DxFormModule,
//   DxDrawerModule,
//   DxButtonModule,
//   DxToolbarModule,
//   DxScrollViewModule,
//   DxAccordionModule,
//   DxListModule,
//   DxLoadPanelModule,
//   DxDropDownButtonModule,
//   DxSelectBoxModule,
//   DxTextBoxModule,
// } from 'devextreme-angular';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { CrmContactListModule } from './pages/crm-contact-list/crm-contact-list.component';
import { CrmContactFormModule } from './pages/crm-contact-form/crm-contact-form.component';
import { PlaningTaskListModule } from './pages/planing-task-list/planing-task-list.component';

@NgModule({
  declarations: [
    AppComponent
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

    // DxDataGridModule,
    // DxFormModule,
    // DxDrawerModule,
    // DxButtonModule,
    // DxToolbarModule,
    // DxScrollViewModule,
    // DxAccordionModule,
    // DxListModule,
    // DxLoadPanelModule,
    // DxDropDownButtonModule,
    // DxSelectBoxModule,
    // DxTextBoxModule,

    //ActivitiesModule,
    CrmContactListModule,
    CrmContactFormModule,
    PlaningTaskListModule,
    AppRoutingModule,
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
