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
  const themeMarker = 'theme-';

  themeName = themeName || getCurrentTheme();

  [...(document.styleSheets as unknown as any[])]
    .filter((styleSheet) => styleSheet?.href?.includes(themeMarker))
    .forEach((styleSheet) => {
      styleSheet.disabled = !styleSheet?.href?.includes(`${themeMarker}${themeName}`);
    });

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
  styleUrls: [],
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
