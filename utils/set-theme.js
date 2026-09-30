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

const fluentNextTheme = 'fluent-next';
const fluentNextBaseColor = 'blue';

const changeThemesMeta = (theme) => {
  const [baseTheme, namePart] = theme.split('.');
  const isGeneric = baseTheme === 'generic';
  const isFluentNext = baseTheme === fluentNextTheme;
  const color = isGeneric ? '' : namePart;
  const isDark = theme.includes('.dark');
  const isCompact = /compact$/.test(theme);
  const compactSuffix = isCompact ? '.compact' : '';
  const baseBundleName = isGeneric ? '' : `${baseTheme}.${color}.`;
  const getBundlePath = isFluentNext
    ? (mode) => `devextreme-dist/css/dx.${fluentNextTheme}.${fluentNextBaseColor}.${mode}${compactSuffix}.css`
    : (mode) => `devextreme/scss/bundles/dx.${baseBundleName}${mode}${compactSuffix}.scss`;
  const accentPath = isFluentNext && color !== fluentNextBaseColor
    ? `devextreme-dist/css/accents/${color}.css`
    : '';
  const variablesTheme = isFluentNext
    ? { baseTheme: 'fluent', color: fluentNextBaseColor }
    : { baseTheme, color };

  packages.forEach((packageName) => {
    const appPath = join(cwd(), 'packages', packageName);
    const appVariablesPath = join(appPath, variablesPath[packageName]);
    const cssFilesWithThemeImports = [].concat(filesForChange[packageName]);
    const appFilesToSetDefaultThemeMode = [].concat(themeJsFiles[packageName]);

    cssFilesWithThemeImports.forEach(
      (file) => setCssThemeImports(join(appPath, file), getBundlePath, accentPath),
    );

    appFilesToSetDefaultThemeMode.forEach(
      (file) => setAppDefaultThemeMode(join(appPath, file), isDark),
    );

    setCssThemeVariables(appVariablesPath, {
      ...variablesTheme, isGeneric, isCompact,
    });

    if (isFluentNext) {
      removeThemeModules(appVariablesPath);
    }
  });
};

const theme = argv[2];

console.log(`Set theme ${theme}`);

if (!/(material|fluent|fluent-next)\.[\w-]+\.(dark|light)(\.compact)?$/.test(theme)
    && !/generic\.(dark|light)(\.compact)?/.test(theme)
) {
  console.error(`Failed to set theme ${theme}!`);
  console.log('Usage set-theme.js <themename>. Variants: (material|fluent|fluent-next).<color>.(dark|light).(compact)? or generic.(dark|light).(compact)?');
  exit(1);
}

function setScssAccentImports(content, accentPath) {
  const contentWithoutAccent = content.replace(/@use 'devextreme-dist\/css\/accents\/[\w-]+\.css' as \*;\n/g, '');

  return accentPath
    ? contentWithoutAccent.replace(/(@use '[^']*\/dx\.[^']+' as \*;\n)/g, `$1@use '${accentPath}' as *;\n`)
    : contentWithoutAccent;
}

function setJsonAccentEntries(content, accentPath) {
  const contentWithoutAccent = content.replace(/,\s*\{\s*"input": "devextreme-dist\/css\/accents\/[\w-]+\.css",\s*"bundleName": "[\w-]+"\s*\}/g, '');

  return accentPath
    ? contentWithoutAccent.replace(
      /([ \t]*)\{(\s*)"input": "devextreme[^"]*\/dx\.[^"]+",(\s*)"bundleName": "([\w-]+)"(\s*)\}/g,
      (bundleEntry, indent, beforeInput, beforeBundleName, bundleName, beforeEnd) => `${bundleEntry},\n${indent}{${beforeInput}"input": "${accentPath}",${beforeBundleName}"bundleName": "${bundleName}"${beforeEnd}}`,
    )
    : contentWithoutAccent;
}

function setCssThemeImports(fileForChange, getBundlePath, accentPath) {
  const setAccent = fileForChange.endsWith('.json') ? setJsonAccentEntries : setScssAccentImports;
  const contentWithBundles = readFileSync(fileForChange, 'utf8').replace(
    /devextreme(?:-dist)?\/(?:scss\/bundles|css)\/dx\.(?:[\w-]+\.){0,2}(dark|light)(?:\.compact)?\.s?css/g,
    (bundlePath, mode) => getBundlePath(mode),
  );

  writeFileSync(fileForChange, setAccent(contentWithBundles, accentPath));
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

  let newVariablesContent = variablesContentForChange
    .replace(/(material|fluent|generic)/g, baseTheme)
    .replace(/\(\$size: "[^"]+"\)/, `($size: "${isCompact ? 'compact' : 'default'}")`)
    .replace(/(colors['"] as \* with )\([^)]+\)/, `$1(${cssColorsSettings})`);

  if (baseTheme === 'generic') {
    newVariablesContent = newVariablesContent.replace(/, \$mode: \$theme-mode\)/, ')');
  }

  writeFileSync(appVariablesPath, newVariablesContent);
}

function removeThemeModules(appVariablesPath) {
  writeFileSync(
    appVariablesPath,
    readFileSync(appVariablesPath, 'utf8')
      .replace(/@use 'devextreme\/scss\/widgets\/[^;]+;\n/g, '')
      .replace('#{$fluent-field-value-horizontal-padding}', 'var(--dx-fieldset-field-value-padding-inline)'),
  );
}

changeThemesMeta(theme);
