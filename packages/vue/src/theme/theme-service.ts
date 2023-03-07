import './theme-dark';
import './theme-light';
import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { ref } from 'vue';

type Theme = 'dark' | 'light';

class ThemeService {
  private readonly storageKey = 'themeViewer';

  private readonly themeMarker = 'theme-';

  currentTheme = ref<Theme>(this.getCurrentTheme());

  getCurrentTheme(): Theme {
    return window.localStorage[this.storageKey] || 'light';
  }

  private getThemeStyleSheets() {
    return [...document.styleSheets as unknown as CSSStyleSheet[]]
      .filter((styleSheet) => styleSheet?.href?.includes(this.themeMarker));
  }

  setAppTheme(themeName = this.currentTheme.value) {
    const enabledStyleSheet: CSSStyleSheet[] = [];

    this.getThemeStyleSheets().forEach((styleSheet) => {
      if (styleSheet?.href?.includes(`${this.themeMarker}${themeName}`)) {
        enabledStyleSheet.push(styleSheet);
      } else {
        styleSheet.disabled = true;
      }
    });

    enabledStyleSheet.forEach((styleSheet) => {
      styleSheet.disabled = false;
    });

    this.currentTheme.value = themeName;

    window.localStorage[this.storageKey] = themeName;

    currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${themeName}.compact`));
    refreshTheme();
  }

  switchAppTheme() {
    this.setAppTheme(this.currentTheme.value === 'dark' ? 'light' : 'dark');
  }
}

export const themeService = new ThemeService();
