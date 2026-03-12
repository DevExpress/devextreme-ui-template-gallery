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
  const isGeneric = baseTheme === 'generic';
  const color = isGeneric ? '' : namePart;
  const isDark = theme.includes('.dark');
  const isCompact = /compact$/.test(theme);
  const baseBundleName = isGeneric ? '' : `${baseTheme}.${color}.`;

  packages.forEach((packageName) => {
    const appPath = join(cwd(), 'packages', packageName);
    const appVariablesPath = join(appPath, variablesPath[packageName]);
    const cssFilesWithThemeImports = [].concat(filesForChange[packageName]);
    const appFilesToSetDefaultThemeMode = [].concat(themeJsFiles[packageName]);

    cssFilesWithThemeImports.forEach(
      (file) => setCssThemeImports(join(appPath, file), baseBundleName, isCompact),
    );

    appFilesToSetDefaultThemeMode.forEach(
      (file) => setAppDefaultThemeMode(join(appPath, file), isDark),
    );

    setCssThemeVariables(appVariablesPath, {
      baseTheme, color, isGeneric, isCompact,
    });
  });
};

const theme = argv[2];

console.log(`Set theme ${theme}`);

if (!/(material|fluent)\.\w+\.(dark|light)(\.compact)?$/.test(theme)
    && !/generic\.(dark|light)(\.compact)?/.test(theme)
) {
  console.error(`Failed to set theme ${theme}!`);
  console.log('Usage set-theme.js <themename>. Variants: (material|fluent).<color>.(dark|light).(compact)? or generic.(dark|light).(compact)?');
  exit(1);
}

function setCssThemeImports(fileForChange, baseBundleName, isCompact) {
  writeFileSync(
    fileForChange,
    readFileSync(fileForChange, 'utf8')
      .replace(
        /(scss\/bundles\/dx\.)(.+\.){0,2}(dark|light)(\.compact)?(\.scss)?/g,
        `$1${baseBundleName}$3${isCompact ? '.compact' : ''}$5`,
      ),
  );
}

function setAppDefaultThemeMode(fileForChange, isDark) {
  const jsThemeFileContent = readFileSync(fileForChange, 'utf8');
  const jsThemesRegExp = /const themes([^=]+)= \[[^\]]+]/;

  if (!jsThemesRegExp.test(jsThemeFileContent)) {
    throw new Error(`Theme settings not found in ${fileForChange}`);
  }

  writeFileSync(fileForChange, jsThemeFileContent.replace(
    jsThemesRegExp,
    `const themes$1= [${isDark ? "'dark', 'light'" : "'light', 'dark'"}]`,
  ));
}

function setCssThemeVariables(appVariablesPath, {
  baseTheme, color, isGeneric, isCompact,
}) {
  const variablesContentForChange = readFileSync(appVariablesPath, 'utf8');

  const cssColorsSettings = isGeneric ? '$color: $theme-mode' : `$color: "${color}", $mode: $theme-mode`;

  const newVariablesContent = variablesContentForChange
    .replace(/(material|fluent|generic)/g, baseTheme)
    .replace(/\(\$size: "[^"]+"\)/, `($size: "${isCompact ? 'compact' : 'default'}")`)
    .replace(/(colors['"] as \* with )\([^)]+\)/, `$1(${cssColorsSettings})`);

  writeFileSync(appVariablesPath, newVariablesContent);
}

changeThemesMeta(theme);
