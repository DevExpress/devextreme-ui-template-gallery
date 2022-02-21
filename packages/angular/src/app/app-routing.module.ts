import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';

import { CrmContactListComponent } from './pages/crm-contact-list/crm-contact-list.component';
import { CrmContactFormComponent } from './pages/crm-contact-form/crm-contact-form.component';
import { PlaningTaskListComponent } from './pages/planing-task-list/planing-task-list.component';

const routes: Routes = [
  {
    path: 'crm-contact-list',
    component: CrmContactListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'crm-contact-form',
    component: CrmContactFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'planning-task-list',
    component: PlaningTaskListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'crm-contact-list'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
