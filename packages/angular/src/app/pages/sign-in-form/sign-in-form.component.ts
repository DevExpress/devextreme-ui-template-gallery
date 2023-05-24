import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardAuthModule, LoginFormModule } from 'src/app/components';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class AppSignInComponent {
  constructor() { }
}

@NgModule({
  imports: [
    CommonModule,
    LoginFormModule,
    CardAuthModule,
  ],
  providers: [],
  exports: [AppSignInComponent],
  declarations: [AppSignInComponent],
})
export class AppSignInModule { }
