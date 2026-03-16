import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { current } from 'devextreme/ui/themes';
import { ref } from 'vue';

const themes = ['light', 'dark'] as const;
const storageKey = 'app-theme';
const themePrefix = 'theme-';

type Theme = typeof themes[number];

function getNextTheme(theme?: Theme) {
  return themes[themes.indexOf(theme as Theme) + 1] || themes[0];
}

function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || getNextTheme();
}

const prefixes = ['theme-dx-', 'variables-'];

const loadStylesImports = async () => {
  await Promise.all([
    ...prefixes.flatMap((prefix) => [
      import(`./styles/${prefix}dark.scss`),
      import(`./styles/${prefix}light.scss`),
    ]),
  ]);
};

function isThemeStyleSheet(styleSheet: CSSStyleSheet, theme: Theme): boolean {
  const themeMarker = `${themePrefix}${theme}`;
  // @ts-ignore - Vite env check
  if (import.meta.env.PROD) {
    return !!styleSheet?.href?.includes(`${themeMarker}`);
  } else {
    try {
      const rules = Array.from(styleSheet.cssRules || []);
      return !!rules.find((rule) =>
        (rule as CSSStyleRule)?.selectorText?.includes(`.${themeMarker}`),
      );
    } catch (e) {
      return false;
    }
  }
}

function switchThemeStyleSheets(enabledTheme: Theme) {
  const disabledTheme = getNextTheme(enabledTheme);

  Array.from<CSSStyleSheet>(document.styleSheets).forEach((styleSheet) => {
    styleSheet.disabled = isThemeStyleSheet(styleSheet, disabledTheme);
  });
}

class ThemeService {
  private isLoaded = false;

  currentTheme = ref<Theme>(getCurrentTheme());

  isFluent(): boolean {
    return current().includes('fluent');
  }

  async loadThemes() {
    if (!this.isLoaded) {
      await loadStylesImports();
      this.isLoaded = true;
    }
  }

  async setAppTheme(theme = this.currentTheme.value) {
    await this.loadThemes();

    switchThemeStyleSheets(theme);

    this.currentTheme.value = theme;
    const regexTheme = new RegExp(`\\.(${themes.join('|')})`, 'g');
    currentVizTheme(currentVizTheme().replace(regexTheme, `.${theme}`));
    refreshTheme();
  }

  switchAppTheme() {
    const newTheme = getNextTheme(this.currentTheme.value);
    this.setAppTheme(newTheme);
    window.localStorage[storageKey] = newTheme;
  }
}

export const themeService = new ThemeService();