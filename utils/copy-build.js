const { copySync, emptyDir } = require('fs-extra');
const { join } = require('path');
const { argv, cwd } = require('process');
const packages = require('./packages');

const commonDestination = 'devextreme-ui-template-gallery';

// eslint-disable-next-line default-param-last
const copyApplications = (mode = 'default', theme) => {
  packages.forEach((packageName) => {
    const destination = join(cwd(), commonDestination, theme, packageName, mode);
    const source = join(cwd(), 'packages', packageName, 'build');

    emptyDir(destination);
    copySync(source, destination);
  });
};

console.log('Copy application');

copyApplications(argv[2], argv[3]);
