import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { LoginOauthComponent } from 'src/app/components/library/login-oauth/login-oauth.component';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxButtonModule, DxButtonTypes } from 'devextreme-angular/ui/button';
import notify from 'devextreme/ui/notify';
import { AuthService, defaultUser, ThemeService } from 'src/app/services';

type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    LoginOauthComponent,
    DxFormModule,
    DxLoadIndicatorModule,
    DxButtonModule,
  ]
})
export class LoginFormComponent {
  @Input() resetLink = '/auth/reset-password';

  @Input() createAccountLink = '/auth/register';

  private authService = inject(AuthService);

  private router = inject(Router);

  private themeService = inject(ThemeService);

  formData = signal<LoginFormData>({
    email: defaultUser.email ?? '',
    password: 'password',
  });

  btnStylingMode = signal<DxButtonTypes.ButtonStyle>(
    this.themeService.getCurrentTheme() === 'dark' ? 'outlined' : 'contained',
  );

  passwordMode = 'password';

  loading = signal(false);

  passwordEditorOptions = {
    placeholder: 'Password',
    stylingMode: 'filled',
    mode: this.passwordMode,
  };

  constructor() {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode.set(value ? 'outlined' : 'contained');
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData();
    this.loading.set(true);

    const result = await this.authService.logIn(email, password);
    this.loading.set(false);
    if (!result.isOk) {
      notify(result.message, 'error', 2000);
    }
  }

  onCreateAccountClick = () => {
    this.router.navigate([this.createAccountLink]);
  };
}

