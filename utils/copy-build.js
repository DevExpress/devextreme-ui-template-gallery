'use strict';

const { copySync, mkdirSync } = require('fs-extra');
const { join } = require('path');
const { argv, exit, cwd } = require('process');
const packages = require('./packages');
const commonDestination = 'devextreme-rwa-demos';

const copy = (theme, mode = 'default') => {
    packages.forEach(packageName => {
        const destination = join(cwd(), commonDestination, packageName, theme, mode);
        const source = join(cwd(), 'packages', packageName, 'build');

        mkdirSync(destination, { recursive: true });
        copySync(source, destination);
    });
};

const theme = argv[2];
console.log(`Copy application - ${theme}`);

if(!theme) {
    console.log('Usage copy-build.js <themename>');
    exit(1);
}

copy(argv[2]);