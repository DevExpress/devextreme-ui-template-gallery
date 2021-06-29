'use strict';

const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { argv, exit, cwd } = require('process');
const packages = require('./packages');

const swatchModes = ['base', 'additional'];

const changeThemesMeta = (theme) => {
    packages.forEach(packageName => {
        swatchModes.forEach(swatchMode => {
            const appPath = join(cwd(), 'packages', packageName)
            const metaFilePath = join(appPath, 'src', 'themes', `metadata.${swatchMode}.json`);
            const data = readFileSync(metaFilePath, 'utf8');
            const metadata = JSON.parse(data);

            metadata.baseTheme = swatchMode === 'base' ?
                theme :
                theme.replace(/(generic|material\..*?)\.(.*?)(\.compact)?$/g, '$1.dark$3');

            writeFileSync(metaFilePath, `${JSON.stringify(metadata, null, '  ')}\n`, 'utf8');
        });
    });
};

const theme = argv[2];
console.log(`Set theme ${theme}`);

if(!theme) {
    console.log('Usage set-theme.js <themename>');
    exit(1);
}

changeThemesMeta(argv[2]);