import { Component, NgModule } from '@angular/core';
import { DxButtonModule, DxButtonTypes } from 'devextreme-angular/ui/button';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.scss']
})
export class LoginOauthComponent {
  btnStylingMode: DxButtonTypes.ButtonStyle;

  constructor(private themeService: ThemeService) {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode = value ? 'outlined' : 'contained';
    });
  }


}

@NgModule({
  imports: [
    DxButtonModule
  ],
  declarations: [LoginOauthComponent],
  exports: [LoginOauthComponent],
})
export class LoginOauthModule { }
