const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { argv, exit, cwd } = require('process');

const packages = ['angular']; // require('./packages');

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
  const color = isGenericTheme ? '' : namePart;
  const isDarkTheme = theme.includes('.dark');
  const isCompact = /compact$/.test(theme);
  const baseBundleName = isGenericTheme ? '' : `${baseTheme}.${color}.`;

  packages.forEach((packageName) => {
    const appPath = join(cwd(), 'packages', packageName);
    const appVariablesPath = join(appPath, variablesPath[packageName]);
    const cssFilesWithThemeImports = [].concat(filesForChange[packageName]);
    const themeAppFilesForSwitchThemeMode = [].concat(themeJsFiles[packageName]);

    cssFilesWithThemeImports.forEach(
      (file) => setCssThemeImports(join(appPath, file), baseBundleName, isCompact),
    );

    themeAppFilesForSwitchThemeMode.forEach(
      (file) => switchThemeModeAppFile(join(appPath, file), isDarkTheme),
    );

    setCssThemeVariables(appVariablesPath, {
      baseTheme, color, isGenericTheme, isCompact,
    });
  });
};

const theme = argv[2];

console.log(`Set theme ${theme}`);

if (!/(material|fluent)\.\w+\.(dark|light)(\.compact)?$/.test(theme)
    && !/generic\.(dark|light)\.compact/.test(theme)
) {
  console.error(`Failed to set theme ${theme}!`);
  console.log('Usage set-theme.js <themename>. Variants: (material|fluent).<color>.(dark|light).(compact)? or generic.(dark|light).compact');
  exit(1);
}

function setCssThemeImports(fileForChange, baseBundleName, isCompact) {
  writeFileSync(
    fileForChange,
    readFileSync(fileForChange, 'utf8')
      .replace(/(scss\/bundles\/dx\.)(.+?\.)*?(dark|light)(\.compact)?(\.scss)?("|')/g,
        `$1${baseBundleName}$3${isCompact ? '.compact' : ''}$5$6`),
  );
}

function switchThemeModeAppFile(fileForChange, isDarkTheme) {
  const jsThemeFileContent = readFileSync(fileForChange, 'utf8');
  const jsThemesRegExp = /const themes([^=]+)= \[[^\]]+]/;

  if (!jsThemesRegExp.test(jsThemeFileContent)) {
    throw new Error(`Theme settings not found in ${fileForChange}`);
  }

  writeFileSync(fileForChange, jsThemeFileContent.replace(jsThemesRegExp,
    `const themes$1= [${isDarkTheme ? "'dark', 'light'" : "'light', 'dark'"}]`));
}

function setCssThemeVariables(appVariablesPath, {
  baseTheme, color, isGenericTheme, isCompact,
}) {
  const variablesContentForChange = readFileSync(appVariablesPath, 'utf8');

  const cssColorsSettings = isGenericTheme ? '$color: $theme' : `$color: "${color}", $mode: $theme`;

  const newVariablesContent = variablesContentForChange
    .replace(/(material|fluent|generic)/g, baseTheme)
    .replace(/\(\$size: "[^"]+"\)/, `($size: "${isCompact ? 'compact' : 'default'}")`)
    .replace(/(colors("|') as \* with )\([^)]+\)/, `$1(${cssColorsSettings})`);

  writeFileSync(appVariablesPath, newVariablesContent);
}

changeThemesMeta(theme);
