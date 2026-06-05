import { Component, inject, signal } from '@angular/core';
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

  btnStylingMode = signal<DxButtonTypes.ButtonStyle>(
    this.themeService.getCurrentTheme() === 'dark' ? 'outlined' : 'contained',
  );

  constructor() {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode.set(value ? 'outlined' : 'contained');
    });
  }
}
