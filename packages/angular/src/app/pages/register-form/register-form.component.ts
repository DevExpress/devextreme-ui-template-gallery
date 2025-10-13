import { Component, NgModule } from '@angular/core';

import {
  CardAuthComponent,
  CreateAccountFormComponent,
} from 'src/app/components';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  imports: [
    CardAuthComponent,
    CreateAccountFormComponent
  ]
})
export class AppRegisterComponent {

  defaultLink = '/sign-in-form';

  buttonLink = '/register-form';

  constructor() { }
}

