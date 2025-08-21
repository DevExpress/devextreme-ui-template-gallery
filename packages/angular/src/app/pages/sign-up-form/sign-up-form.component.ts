import { Component } from '@angular/core';

import { CardAuthComponent, CreateAccountFormComponent } from 'src/app/components';

@Component({
    selector: 'app-sign-up-form',
    templateUrl: './sign-up-form.component.html',
    styleUrls: ['./sign-up-form.component.scss'],
    imports: [
      CreateAccountFormComponent,
      CardAuthComponent,
    ],
})
export class AppSignUpComponent {

  defaultLink = '/sign-in-form';

  buttonLink = '/sign-up-form';
}
