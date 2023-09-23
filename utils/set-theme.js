const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { argv, exit, cwd } = require('process');

const packages = require('./packages');

const filesForChange = {
  angular: 'angular.json',
  vue: ['src/theme/styles/theme-dx-dark.scss', 'src/theme/styles/theme-dx-light.scss'],
  react: ['src/theme/styles/theme-dx-dark.scss', 'src/theme/styles/theme-dx-light.scss'],
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
  const [baseTheme, namePart] = theme.split('.');
  const isGenericTheme = baseTheme === 'generic';
  const color = isGenericTheme ? 'blue' : namePart;
  const isDarkTheme = theme.includes('.dark');
  const baseBundleName = baseTheme === 'generic' ? '' : `${baseTheme}.${color}.`;

  (theme.includes('fluent') ? ['angular'] : packages).forEach((packageName) => {
    const appPath = join(cwd(), 'packages', packageName);
    const appVariablesPath = join(appPath, variablesPath[packageName]);

    [].concat(filesForChange[packageName]).forEach(
        (file) => {
          const fileForChange = join(appPath, file);

          // main import
          const contentForChange = readFileSync(fileForChange, 'utf8');

          writeFileSync(
              fileForChange,
              contentForChange
                  .replace(/(scss\/bundles\/dx\.)(.+?\.)*?(dark|light)\.compact(\.scss)?("|')/g,
                      `$1${baseBundleName}$3.compact$4$5`),
          );
        },
    );

    [].concat(themeJsFiles[packageName]).forEach(
        (file) => {
          const fileForChange = join(appPath, file);

          const contentForChange = readFileSync(fileForChange, 'utf8');
          if (isDarkTheme) {
            writeFileSync(fileForChange, contentForChange.replace(/const themes = \['light', 'dark']/g, "const themes = ['dark', 'light']"));
          }
        },
    );

    const variablesContentForChange = readFileSync(appVariablesPath, 'utf8');

    let newVariablesContent = variablesContentForChange.replace(/(material|fluent|generic)/g, baseTheme);

    if (isGenericTheme) {
      newVariablesContent = newVariablesContent
          .replace(', $mode: $theme', '')
          .replace(/\$color: "\w+"/, '$color: $theme');
    } else {
      newVariablesContent = newVariablesContent
          .replace('($color: $theme)', `($color: "${color}", $mode: $theme)`);
    }

    writeFileSync(appVariablesPath, newVariablesContent);
  });
};

const theme = argv[2];

console.log(`Set theme ${theme}`);

if (!/(material|fluent)\.\w+\.(dark|light)\.compact/.test(theme)
    && !/generic\.(dark|light)\.compact/.test(theme)
) {
  console.log('Usage set-theme.js <themename>. Variants: (material|fluent).<color>.(dark|light).compact or generic.(dark|light).compact');
  exit(1);
}

changeThemesMeta(theme);
