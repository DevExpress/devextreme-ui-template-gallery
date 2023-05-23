// import './app-themes';

import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { ref } from 'vue';

const loadStylesImports = () => {
  const prefix = './styles/app-theme';
  return Promise.all([
    import(/* webpackChunkName: "theme-light" */ `${prefix}-light.scss`),
    import(/* webpackChunkName: "theme-dark" */ `${prefix}-dark.scss`),
  ]);
};

const themes = ['light', 'dark'] as const;

type Theme = typeof themes[number];

function getNextTheme(theme?: Theme) {
  return themes[themes.indexOf(theme as Theme) + 1] || themes[0];
}

class ThemeService {
  private readonly storageKey = 'app-theme';

  private readonly themeMarker = 'theme-';

  isStylesLoaded = ref(false);

  currentTheme = ref<Theme>(this.getCurrentTheme());

  constructor() {
    loadStylesImports().then(() => {
      this.isStylesLoaded.value = true;
      this.setAppTheme();
    });
  }

  getCurrentTheme(): Theme {
    return window.localStorage[this.storageKey] || getNextTheme();
  }

  isThemeStyleSheet = (styleSheet: CSSStyleSheet, theme: Theme | '' = '') => !!styleSheet?.href?.includes(`${this.themeMarker + theme}`);

  private getThemeStyleSheets() {
    return Array.from(document.styleSheets).filter(
      (stylesheet) => this.isThemeStyleSheet(stylesheet),
    );
  }

  setAppTheme(theme = this.currentTheme.value) {
    this.getThemeStyleSheets().forEach((styleSheet) => {
      styleSheet.disabled = !this.isThemeStyleSheet(styleSheet, theme);
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
