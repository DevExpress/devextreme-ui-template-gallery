import { Component, NgModule } from '@angular/core';

import { CardAuthComponent, CreateAccountFormComponent } from 'src/app/components';

@Component({
    selector: 'app-sign-up-form',
    templateUrl: './sign-up-form.component.html',
    styleUrls: ['./sign-up-form.component.scss'],
    standalone: false
})
export class AppSignUpComponent {

  defaultLink = '/sign-in-form';

  buttonLink = '/sign-up-form';

  constructor() { }
}

@NgModule({
  imports: [
    CreateAccountFormComponent,
    CardAuthComponent,
  ],
  providers: [],
  exports: [AppSignUpComponent],
  declarations: [AppSignUpComponent],
})
export class AppSignUpComponentModule { }

