import {
  Component, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from "devextreme-angular";

import { currentTheme, refreshTheme } from 'devextreme/viz/themes';

type Theme = 'dark'| 'light';

const storageKey = 'themeViewer';

function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || 'light';
}

export function switchTheme(themeName?: Theme) {
  const themePrefix = 'theme-';
  const body = document.querySelector('body');

  if (!body) {
    return;
  }

  themeName = themeName || getCurrentTheme();

  body.className = `${body.className.replace(/\s*theme-((light)|(dark))\s*/, ' ')} ${themePrefix + themeName}`;

  window.localStorage[storageKey] = themeName;

  currentTheme(`material.${themeName}`);
  refreshTheme();
}

@Component({
  selector: 'theme-switcher',
  template: `
    <dx-button class="theme-button"
               [icon]="'assets/icons/' + (theme !== 'dark' ? 'moon' : 'sun') +'.svg'"
               (click)="onClickButton()">
    </dx-button>
`,
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  theme = getCurrentTheme();

  onClickButton() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';

    switchTheme(this.theme)
  }
}

@NgModule({
  imports: [CommonModule, DxButtonModule],
  declarations: [ThemeSwitcherComponent],
  exports: [ThemeSwitcherComponent],
})
export class ThemeSwitcherModule { }
