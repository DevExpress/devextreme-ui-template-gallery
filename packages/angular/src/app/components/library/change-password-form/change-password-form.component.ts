import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
  ]
})
export class ChangePasswordFormComponent implements OnInit, OnDestroy {
  loading = false;

  formData: any = {};

  recoveryCode = '';

  paramMapSubscription: Subscription;

  private authService = inject(AuthService);
    private router = inject(Router);
  private route = inject(ActivatedRoute);

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
