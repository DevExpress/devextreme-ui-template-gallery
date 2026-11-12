import { Injectable, signal } from '@angular/core';

import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { current } from 'devextreme/ui/themes'

const themes = ['light', 'dark'] as const;

type Theme = typeof themes[number];

function getNextTheme(theme?: Theme): Theme {
  if (theme === undefined) {
    return themes[0];
  }
  return themes[themes.indexOf(theme) + 1] ?? themes[0];
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'app-theme';
  private themeMarker = 'theme-';

  currentTheme: Theme = window.localStorage[this.storageKey] || getNextTheme();

  public isDark = signal<boolean>(this.currentTheme === 'dark');

  private getThemeStyleSheets() {
    return   Array.from(document.styleSheets).filter(
      (styleSheet) => styleSheet?.href?.includes(this.themeMarker)
    );
  }

  setAppTheme(theme = this.currentTheme) {
    this.getThemeStyleSheets().forEach((styleSheet) => {
      styleSheet.disabled = !styleSheet?.href?.includes(`${this.themeMarker}${theme}`);
    });

    this.currentTheme = theme;
    this.isDark.set(this.currentTheme === 'dark');

    const regexTheme = new RegExp(`\\.(${themes.join('|')})`, 'g');
    currentVizTheme(currentVizTheme().replace(regexTheme, `.${theme}`));
    refreshTheme();
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  isFluent(): boolean {
    return current().includes('fluent');
  }

  switchTheme() {
    const newTheme = getNextTheme(this.currentTheme);
    this.setAppTheme(newTheme);
    window.localStorage[this.storageKey] = newTheme;
  }
}
