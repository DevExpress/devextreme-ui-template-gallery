import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { Injectable } from '@angular/core';

const themes = ['light', 'dark'] as const;

type Theme = typeof themes[number];

function getNextTheme(theme?: Theme) {
  return themes[themes.indexOf(theme) + 1] || themes[0];
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'app-theme';
  private themeMarker = 'theme-';

  currentTheme: Theme = window.localStorage[this.storageKey] || getNextTheme();

  private getThemeStyleSheets() {
    return   Array.from(document.styleSheets).filter(
      (styleSheet) => styleSheet?.href?.includes(this.themeMarker)
    );
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
    this.setAppTheme(getNextTheme(this.currentTheme));
  }
}
