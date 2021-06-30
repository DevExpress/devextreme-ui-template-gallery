'use strict';

const { readFileSync, writeFileSync, read } = require('fs');
const { join } = require('path');
const { argv, exit, cwd } = require('process');
const packages = require('./packages');

const rootPath = join(cwd(), 'packages');

const performFileReplacement = (fileName, searchValue, replaceValue) => {
    const content = readFileSync(fileName).toString();
    writeFileSync(fileName, content.replace(searchValue, replaceValue), 'utf8');
}

const fixAngularProject = () => {
    const targetFileName = join(rootPath, 'angular', 'src', 'app', 'app.component.html');
    performFileReplacement(targetFileName, /<app-footer>.*<\/app-footer>/s, '');
    performFileReplacement(targetFileName, /<app-side-nav-outer-toolbar.*?>/s, '<div class="content">');
    performFileReplacement(targetFileName, /<\/app-side-nav-outer-toolbar>/s, '</div>');
};

const fixReactProject = () => {
    const targetFileName = join(rootPath, 'react', 'src', 'Content.js');
    performFileReplacement(targetFileName, /<Footer>.*<\/Footer>/s, '');
    performFileReplacement(targetFileName, /<SideNavBarLayout.*?>/s, '<div class="content">');
    performFileReplacement(targetFileName, /<\/SideNavBarLayout>/s, '</div>');
};

const fixVueProject = () => {
    const targetFileName = join(rootPath, 'vue', 'src', 'App.vue');
    performFileReplacement(targetFileName, /<template #footer>.*?<\/template>/s, '');
    performFileReplacement(targetFileName, /<component.*?>/s, '');
    performFileReplacement(targetFileName, /<\/component>/s, '');
    performFileReplacement(targetFileName, /import AppFooter from ".\/components\/app-footer";/s, '');
    performFileReplacement(targetFileName, /AppFooter/s, '');
};

const performReplacements = () => {
    fixAngularProject();
    fixReactProject();
    fixVueProject();
};

performReplacements();