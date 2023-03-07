import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';

type Theme = 'dark'| 'light';

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'themeViewer';
  private themeMarker = 'theme-';

  currentTheme: Theme = window.localStorage[this.storageKey] || 'light';

  private getThemeStyleSheets() {
    return   [...(document.styleSheets as unknown as CSSStyleSheet[])]
      .filter((styleSheet) => styleSheet?.href?.includes(this.themeMarker));
  }

  setAppTheme(themeName = this.currentTheme) {

    this.getThemeStyleSheets().forEach((styleSheet) => {
      styleSheet.disabled = !styleSheet?.href?.includes(`${this.themeMarker}${themeName}`);
    });

    this.currentTheme = window.localStorage[this.storageKey] = themeName;

    currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${themeName}.compact`));
    refreshTheme();
  }

  switchTheme() {
    this.setAppTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
  }
}
