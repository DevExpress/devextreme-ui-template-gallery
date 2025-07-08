import {Component, inject} from '@angular/core';
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
  btnStylingMode: DxButtonTypes.ButtonStyle;

  private themeService = inject(ThemeService);

  constructor() {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode = value ? 'outlined' : 'contained';
    });
  }


}
