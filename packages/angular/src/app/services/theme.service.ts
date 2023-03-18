import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { Injectable } from '@angular/core';

type Theme = 'dark'| 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'app-theme';
  private themeMarker = 'theme-';

  currentTheme: Theme = window.localStorage[this.storageKey] || 'light';

  private getThemeStyleSheets() {
    return   [...(document.styleSheets as unknown as CSSStyleSheet[])]
      .filter((styleSheet) => styleSheet?.href?.includes(this.themeMarker));
  }

  setAppTheme(theme = this.currentTheme) {

    this.getThemeStyleSheets().forEach((styleSheet) => {
      styleSheet.disabled = !styleSheet?.href?.includes(`${this.themeMarker}${theme}`);
    });

    this.currentTheme = window.localStorage[this.storageKey] = theme;

    currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${theme}.compact`));
    refreshTheme();
  }

  switchTheme() {
    this.setAppTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
  }
}
