import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardAuthComponent, LoginFormComponent } from 'src/app/components';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  imports: [
    CommonModule,
    LoginFormComponent,
    CardAuthComponent,
  ]
})
export class AppSignInComponent {
}

