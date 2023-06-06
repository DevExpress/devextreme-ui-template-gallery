import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../../services';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
})
export class ChangePasswordFormComponent implements OnInit, OnDestroy {
  loading = false;

  formData: any = {};

  recoveryCode = '';

  paramMapSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramMapSubscription = this.route.paramMap.subscribe((params) => {
      this.recoveryCode = params.get('recoveryCode') || '';
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { password } = this.formData;
    this.loading = true;

    const result = await this.authService.changePassword(password, this.recoveryCode);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/auth/login']);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => e.value === this.formData.password;

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
  ],
  declarations: [ChangePasswordFormComponent],
  exports: [ChangePasswordFormComponent],
})
export class ChangePasswordFormModule { }
