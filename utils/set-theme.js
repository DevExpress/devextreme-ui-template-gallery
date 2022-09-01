const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { argv, exit, cwd } = require('process');
const packages = require('./packages');

const filesForChange = {
  angular: 'angular.json',
  vue: 'src/main.js',
  react: 'src/App.tsx',
};

const variablesPath = 'src/variables.scss';

const changeThemesMeta = (theme) => {
  const baseTheme = theme.split('.')[0];
  const bundleName = theme.replace('generic.', '');
  const themeParts = bundleName.replace('material.', '').split('.');
  const color = themeParts[0];
  const mode = themeParts[1];

  packages.forEach((packageName) => {
    const appPath = join(cwd(), 'packages', packageName);
    const appVariablesPath = join(appPath, variablesPath);
    const fileForChange = join(appPath, filesForChange[packageName]);

    // main import
    const contentForChange = readFileSync(fileForChange, 'utf8');
    writeFileSync(fileForChange, contentForChange.replace(/material\.blue\..+?(?=\.scss)/, bundleName));

    // variables.scss
    const variablesContentForChange = readFileSync(appVariablesPath, 'utf8');
    let newVariablesContent = variablesContentForChange.replace('blue', color);
    if (baseTheme === 'generic') {
      newVariablesContent = newVariablesContent.replace(/material/g, baseTheme);
      newVariablesContent = newVariablesContent.replace(', $mode: "light"', '');
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
