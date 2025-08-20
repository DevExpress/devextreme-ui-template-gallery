import { Component, NgModule } from '@angular/core';

import { CardAuthModule, CreateAccountFormModule } from 'src/app/components';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class AppRegisterComponent {

  defaultLink = '/sign-in-form';

  buttonLink = '/register-form';

  constructor() { }
}

@NgModule({
  imports: [
    CreateAccountFormModule,
    CardAuthModule,
  ],
  providers: [],
  exports: [AppRegisterComponent],
  declarations: [AppRegisterComponent],
})
export class AppRegisterComponentModule { }

