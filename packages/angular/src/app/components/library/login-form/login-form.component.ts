import { CommonModule } from '@angular/common';
import {Component, Input, OnInit, inject} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { LoginOauthComponent } from 'src/app/components/library/login-oauth/login-oauth.component';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxButtonModule, DxButtonTypes } from 'devextreme-angular/ui/button';
import notify from 'devextreme/ui/notify';
import { AuthService, IResponse, ThemeService } from 'src/app/services';

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
export class LoginFormComponent implements OnInit {
  @Input() resetLink = '/auth/reset-password';

  @Input() createAccountLink = '/auth/register';

  private authService = inject(AuthService);

  private router = inject(Router);

  private themeService = inject(ThemeService);

  defaultAuthData: IResponse;

  btnStylingMode: DxButtonTypes.ButtonStyle;

  passwordMode = 'password';

  loading = false;

  formData: any = {};

  passwordEditorOptions = {
    placeholder: 'Password',
    stylingMode:'filled',
    mode: this.passwordMode,
    value: 'password',
  }

  constructor() {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode = value ? 'outlined' : 'contained';
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData;
    this.loading = true;

    const result = await this.authService.logIn(email, password);
    this.loading = false;
    if (!result.isOk) {
      notify(result.message, 'error', 2000);
    }
  }

  onCreateAccountClick = () => {
    this.router.navigate([this.createAccountLink]);
  };

  async ngOnInit(): Promise<void> {
    this.defaultAuthData = await this.authService.getUser();
  }
}

