import { Component, NgModule } from '@angular/core';

import { CardAuthModule, CreateAccountFormModule } from 'src/app/components';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class AppSignUpComponent {

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
  exports: [AppSignUpComponent],
  declarations: [AppSignUpComponent],
})
export class AppSignUpComponentModule { }

