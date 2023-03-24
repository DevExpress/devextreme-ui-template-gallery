import './theme-dark';
import './theme-light';
import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { ref } from 'vue';

const themes = ['light', 'dark'] as const;

type Theme = typeof themes[number];

function getNextTheme(theme?: Theme) {
  return themes[themes.indexOf(theme as Theme) + 1] || themes[0];
}

class ThemeService {
  private readonly storageKey = 'app-theme';

  private readonly themeMarker = 'theme-';

  currentTheme = ref<Theme>(this.getCurrentTheme());

  getCurrentTheme(): Theme {
    return window.localStorage[this.storageKey] || getNextTheme();
  }

  private getThemeStyleSheets() {
    return Array.from(document.styleSheets).filter(
      (styleSheet) => styleSheet?.href?.includes(this.themeMarker),
    );
  }

  setAppTheme(theme = this.currentTheme.value) {
    this.getThemeStyleSheets().forEach((styleSheet) => {
      styleSheet.disabled = !styleSheet?.href?.includes(`${this.themeMarker}${theme}.`);
    });

    this.currentTheme.value = theme;

    window.localStorage[this.storageKey] = theme;

    currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${theme}.compact`));
    refreshTheme();
  }

  switchAppTheme() {
    this.setAppTheme(getNextTheme(this.currentTheme.value));
  }
}

export const themeService = new ThemeService();
