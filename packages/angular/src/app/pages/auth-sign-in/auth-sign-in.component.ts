import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardAuthModule, LoginFormModule } from 'src/app/components';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-sign-in.component.html',
  styleUrls: ['./auth-sign-in.component.scss']
})
export class AuthSignInComponent {
  constructor() { }
}

@NgModule({
  imports: [
    CommonModule,
    LoginFormModule,
    CardAuthModule,
  ],
  providers: [],
  exports: [AuthSignInComponent],
  declarations: [AuthSignInComponent],
})
export class AuthLoginModule { }
