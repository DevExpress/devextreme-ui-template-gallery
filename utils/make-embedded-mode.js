const {
  readFileSync, writeFileSync, linkSync, unlinkSync, existsSync,
} = require('fs');
const { join } = require('path');
const { cwd } = require('process');
const packages = require('./packages');

const rootPath = join(cwd(), 'packages');

const resolveIndexFilePath = (indexFileLocation) => {
  const candidatePaths = [
    join(indexFileLocation, 'index.html'),
    join(indexFileLocation, '..', 'index.html'),
  ];

  const indexFilePath = candidatePaths.find((candidatePath) => existsSync(candidatePath));

  if (!indexFilePath) {
    throw new Error(`Unable to locate index.html for ${indexFileLocation}`);
  }

  return indexFilePath;
};

const performIndexReplacement = (indexFileLocation) => {
  const indexFilePath = resolveIndexFilePath(indexFileLocation);
  const content = readFileSync(indexFilePath, 'utf8');

  writeFileSync(indexFilePath, content.replace(/class="dx-viewport"/s, 'class="dx-viewport embedded"'), 'utf8');
};

const addEmbeddedScript = (scriptName) => {
  const scriptFileName = `${scriptName}.js`;
  const scriptPath = join(rootPath, '..', 'utils', scriptFileName);

  packages.forEach((pkg) => {
    const srcPath = join(rootPath, pkg, 'src');
    const applicationScriptPath = join(srcPath, scriptFileName);
    if (existsSync(applicationScriptPath)) unlinkSync(applicationScriptPath);
    linkSync(scriptPath, applicationScriptPath);

    let targetFile = 'main.ts';
    if (pkg === 'react') {
      targetFile = 'App.tsx';
    } else if (pkg === 'vue') {
      targetFile = 'main.ts';
    }

    const targetFilePath = join(srcPath, targetFile);
    const targetFileContent = readFileSync(targetFilePath);
    writeFileSync(targetFilePath, `import './${scriptName}';\n${targetFileContent}`, 'utf8');
  });
};

const performReplacements = () => {
  performIndexReplacement(join(rootPath, 'angular', 'src'));
  performIndexReplacement(join(rootPath, 'react', 'public'));
  performIndexReplacement(join(rootPath, 'vue', 'public'));

  addEmbeddedScript('resize-listener');
  addEmbeddedScript('custom-accent');
};

performReplacements();
