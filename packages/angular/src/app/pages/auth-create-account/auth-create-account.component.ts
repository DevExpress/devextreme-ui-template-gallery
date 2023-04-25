import { Component, NgModule } from '@angular/core';

import { CardAuthModule, CreateAccountFormModule } from 'src/app/components';

@Component({
  selector: 'app-auth-create-account',
  templateUrl: './auth-create-account.component.html',
  styleUrls: ['./auth-create-account.component.scss']
})
export class AuthCreateAccountComponent {

  defaultLink = '/sign-in-form';

  buttonLink = '/sign-up-form';

  constructor() { }
}

@NgModule({
  imports: [
    CreateAccountFormModule,
    CardAuthModule,
  ],
  providers: [],
  exports: [AuthCreateAccountComponent],
  declarations: [AuthCreateAccountComponent],
})
export class AuthCreateAccountModule { }

