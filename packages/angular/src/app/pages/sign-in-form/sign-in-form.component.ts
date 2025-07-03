import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardAuthComponent, LoginFormComponent } from 'src/app/components';

@Component({
    selector: 'app-sign-in-form',
    templateUrl: './sign-in-form.component.html',
    styleUrls: ['./sign-in-form.component.scss'],
    standalone: false
})
export class AppSignInComponent {
  constructor() { }
}

@NgModule({
  imports: [
    CommonModule,
    LoginFormComponent,
    CardAuthComponent,
  ],
  providers: [],
  exports: [AppSignInComponent],
  declarations: [AppSignInComponent],
})
export class AppSignInModule { }
