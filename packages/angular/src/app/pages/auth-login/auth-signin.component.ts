import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardAuthModule, LoginFormModule } from 'src/app/components';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent {
  constructor() { }
}

@NgModule({
  imports: [
    CommonModule,
    LoginFormModule,
    CardAuthModule,
  ],
  providers: [],
  exports: [AuthSigninComponent],
  declarations: [AuthSigninComponent],
})
export class AuthLoginModule { }
