import { Component } from '@angular/core';

import { CardAuthComponent, ResetPasswordFormComponent } from 'src/app/components';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  imports: [
    CardAuthComponent,
    ResetPasswordFormComponent,
  ],
})
export class AppResetPasswordComponent {

  defaultLink = '/sign-in-form';

  buttonLink = '/reset-password-form';
}

