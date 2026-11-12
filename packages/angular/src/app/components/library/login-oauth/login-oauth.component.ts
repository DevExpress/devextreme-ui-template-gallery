import { Component, computed, inject, signal } from '@angular/core';
import { DxButtonModule, DxButtonTypes } from 'devextreme-angular/ui/button';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.scss'],
  imports: [
    DxButtonModule
  ]
})
export class LoginOauthComponent {
  private themeService = inject(ThemeService);

  btnStylingMode = computed<DxButtonTypes.ButtonStyle>(
    () => this.themeService.isDark() ? 'outlined' : 'contained',
  );
}
