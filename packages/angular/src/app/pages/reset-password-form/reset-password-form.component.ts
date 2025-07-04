import { Component, NgModule } from '@angular/core';


import { CardAuthComponent, ResetPasswordFormComponent } from 'src/app/components';

@Component({
    selector: 'app-reset-password-form',
    templateUrl: './reset-password-form.component.html',
    styleUrls: ['./reset-password-form.component.scss'],
    standalone: false
})
export class AppResetPasswordComponent {

  defaultLink = '/sign-in-form';

  buttonLink = '/reset-password-form';

  constructor() { }

}

@NgModule({
  imports: [
    CardAuthComponent,
    ResetPasswordFormComponent,
  ],
  providers: [],
  exports: [AppResetPasswordComponent],
  declarations: [AppResetPasswordComponent],
})
export class AppResetPasswordModule { }

