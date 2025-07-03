import { CommonModule } from '@angular/common';
import {Component, inject, Input, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { LoginOauthModule } from 'src/app/components/library/login-oauth/login-oauth.component';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {AuthService, IResponse} from 'src/app/services';

@Component({
    selector: 'app-create-account-form',
    templateUrl: './create-account-form.component.html',
    styleUrls: ['./create-account-form.component.scss'],
    imports: [
      CommonModule,
      RouterModule,
      LoginOauthModule,
      DxFormModule,
      DxLoadIndicatorModule,
    ]
})
export class CreateAccountFormComponent implements OnInit {
  @Input() redirectLink = '/auth/login';

  @Input() buttonLink = '/auth/login';

  loading = false;

  defaultAuthData: IResponse;

  formData: any = {};

  private authService = inject(AuthService);
  private router = inject(Router);

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData;
    this.loading = true;

    const result = await this.authService.createAccount(email, password);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate([this.buttonLink]);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => e.value === this.formData.password;

  async ngOnInit(): Promise<void> {
    this.defaultAuthData = await this.authService.getUser();
  }
}
