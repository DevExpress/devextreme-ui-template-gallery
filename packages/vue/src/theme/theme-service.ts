import './theme-dark';
import './theme-light';
import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { current } from 'devextreme/ui/themes';
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

  isFluent(): boolean {
    return current().includes('fluent');
  }

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
    const regTheme = this.isFluent() ? /\.[a-z]+$/ : /\.[a-z]+\.compact$/;
    const replaceTheme = this.isFluent() ? `.${theme}` : `.${theme}.compact`;
    currentVizTheme(currentVizTheme().replace(regTheme, replaceTheme));
    refreshTheme();
  }

  switchAppTheme() {
    const newTheme = getNextTheme(this.currentTheme.value);
    this.setAppTheme(newTheme);
    window.localStorage[this.storageKey] = newTheme;
  }
}

export const themeService = new ThemeService();
