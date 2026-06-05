import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { LoginOauthComponent } from 'src/app/components/library/login-oauth/login-oauth.component';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService, defaultUser } from 'src/app/services';

type CreateAccountFormData = {
  email: string;
  password: string;
  confirmedPassword: string;
};

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    LoginOauthComponent,
    DxFormModule,
    DxLoadIndicatorModule,
  ]
})
export class CreateAccountFormComponent {
  @Input() redirectLink = '/auth/sign-in';

  @Input() buttonLink = '/auth/sign-in';

  private authService = inject(AuthService);

  private router = inject(Router);

  loading = signal(false);

  formData = signal<CreateAccountFormData>({
    email: defaultUser.email ?? '',
    password: 'password',
    confirmedPassword: 'password',
  });

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData();
    this.loading.set(true);

    const result = await this.authService.createAccount(email, password);
    this.loading.set(false);

    if (result.isOk) {
      this.router.navigate([this.buttonLink]);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => e.value === this.formData().password;
}
