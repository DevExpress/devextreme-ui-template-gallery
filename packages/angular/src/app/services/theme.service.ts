import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Theme = 'dark'| 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'themeViewer';
  private themeMarker = 'theme-';

  currentTheme: Theme = window.localStorage[this.storageKey] || 'light';

  public isDark = new BehaviorSubject<boolean>(this.currentTheme === 'dark');

  private getThemeStyleSheets() {
    return   [...(document.styleSheets as unknown as CSSStyleSheet[])]
      .filter((styleSheet) => styleSheet?.href?.includes(this.themeMarker));
  }

  setAppTheme(themeName = this.currentTheme) {

    this.getThemeStyleSheets().forEach((styleSheet) => {
      styleSheet.disabled = !styleSheet?.href?.includes(`${this.themeMarker}${themeName}`);
    });

    this.currentTheme = window.localStorage[this.storageKey] = themeName;
    this.isDark.next(this.currentTheme === 'dark');

    currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${themeName}.compact`));
    refreshTheme();
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  switchTheme() {
    this.setAppTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
  }
}
