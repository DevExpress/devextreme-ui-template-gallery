import {
  Component, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from "devextreme-angular";
import { getCurrentTheme, setAppTheme } from 'src/app/theme/theme';
import type { Theme } from 'src/app/theme/theme';

@Component({
  selector: 'theme-switcher',
  template: `
    <dx-button class="theme-button"
               [icon]="'assets/icons/' + (theme !== 'dark' ? 'moon' : 'sun') +'.svg'"
               (click)="onClickButton()">
    </dx-button>
`,
  styleUrls: [],
})
export class ThemeSwitcherComponent {
  theme: Theme = getCurrentTheme();

  onClickButton() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';

    setAppTheme(this.theme)
  }
}

@NgModule({
  imports: [CommonModule, DxButtonModule],
  declarations: [ThemeSwitcherComponent],
  exports: [ThemeSwitcherComponent],
})
export class ThemeSwitcherModule { }
