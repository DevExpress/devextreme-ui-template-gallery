const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { argv, exit, cwd } = require('process');
const packages = require('./packages');

const filesForChange = {
  angular: 'angular.json',
  vue: ['src/theme/styles/app-theme-dark.scss', 'src/theme/styles/app-theme-light.scss'],
  react: ['src/theme/styles/app-theme-dark.scss', 'src/theme/styles/app-theme-light.scss'],
};

const variablesPath = {
  angular: 'src/app/theme/styles/variables-mixin.scss',
  vue: 'src/theme/styles/variables-mixin.scss',
  react: 'src/theme/styles/variables-mixin.scss',
};

const themeJsFiles = {
  angular: ['src/app/services/theme.service.ts'],
  vue: ['src/theme/theme-service.ts'],
  react: ['src/theme/theme.tsx'],
};

const changeThemesMeta = (theme) => {
  const baseTheme = theme.split('.')[0];
  const bundleName = theme.replace('generic.', '');
  const themeParts = bundleName.replace('material.', '').split('.');
  const mode = themeParts[1];
  const isDarkTheme = theme.includes('.dark.');

  packages.forEach((packageName) => {
    const appPath = join(cwd(), 'packages', packageName);
    const appVariablesPath = join(appPath, variablesPath[packageName]);

    [].concat(filesForChange[packageName]).forEach(
      (file) => {
        const fileForChange = join(appPath, file);

        // main import
        const contentForChange = readFileSync(fileForChange, 'utf8');
        if (baseTheme === 'generic') {
          writeFileSync(fileForChange, contentForChange.replace(/material\.blue\./g, ''));
        }
      },
    );

    [].concat(themeJsFiles[packageName]).forEach(
      (file) => {
        const fileForChange = join(appPath, file);

        const contentForChange = readFileSync(fileForChange, 'utf8');
        if (isDarkTheme) {
          writeFileSync(fileForChange, contentForChange.replace(/const themes =/g,
            "window.localStorage.setItem('app-theme', 'dark');\nconst themes ="));
        }
      },
    );

    // variables.scss
    const variablesContentForChange = readFileSync(appVariablesPath, 'utf8');
    let newVariablesContent = variablesContentForChange;
    if (baseTheme === 'generic') {
      newVariablesContent = variablesContentForChange.replace('"blue"', '$theme');
      newVariablesContent = newVariablesContent.replace(', $mode: $theme', '');
      newVariablesContent = newVariablesContent.replace(/material/g, baseTheme);
    } else {
      newVariablesContent = newVariablesContent.replace('light', mode);
    }

    writeFileSync(appVariablesPath, newVariablesContent);
  });
};

const theme = argv[2];

console.log(`Set theme ${theme}`);

if (!theme) {
  console.log('Usage set-theme.js <themename>');
  exit(1);
}

changeThemesMeta(theme);
