/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import {
  getPostfix, toggleCommonConfiguration, setTheme, forceResizeRecalculation,
} from './utils';
import { screenModes, themeModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/crm-contact-details`;

fixture`Contact Details`;

const setEmbedded = async (t, embed, screenMode) => {
  if (embed) {
    if (screenMode[0] === 400) {
      await t.click('.view-wrapper .toolbar-details .dx-icon-overflow');
      await t.click(Selector('.dx-popup-content .dx-button[aria-label=Refresh]'));
    } else {
      await t.click(Selector('.dx-button[aria-label=Refresh]'));
    }
  }
};

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    themeModes.forEach((themeMode) => {
      const postfix = getPostfix(embedded, screenMode, themeMode);

      if (embedded && themeMode === 'dark') {
        return;
      }

      test(`Crm contact details (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, setEmbedded, screenMode, timeoutSecond, true);
        await setTheme(t, themeMode);

        await t.resizeWindow(...[1285, 810]);
        await t.resizeWindow(...screenMode);
        await t.click(Selector('.dx-drawer-content'));
        await t.expect(Selector('.content .dx-toolbar-label').withText('Sammy Hill').exists).ok();
        await takeScreenshot(`crm-contact-details${postfix}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });

      test(`Crm contact details Form (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, setEmbedded, screenMode, timeoutSecond);
        await setTheme(t, themeMode);

        // const form = Selector('.plain-styled-form');
        const form = Selector('.left');

        await takeScreenshot(`crm-form-readonly${postfix}`, form);
        await t.click(Selector('.dx-button[aria-label=Edit]'));
        await takeScreenshot(`crm-form-edit${postfix}`, form);

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });

      test(`Crm contact details tabpanel (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const nameTabs = ['Tasks', 'Activities', 'Opportunities', 'Notes', 'Messages'];
        if (screenMode[0] === 400) return;
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, setEmbedded, screenMode, timeoutSecond);
        await setTheme(t, themeMode);
        await forceResizeRecalculation(t, screenMode);
        await t.wait(1000);

        const tabs = Selector('.content .dx-tabpanel-tabs .dx-tab-text');

        for (let i = 0; i < nameTabs.length; i += 1) {
          await t.click(tabs.withText(new RegExp(nameTabs[i], 'i')));
          const tabPanel = Selector('.content .dx-tabpanel[role=tabpanel]');
          await t.wait(1000);
          await takeScreenshot(`crm-form-tab-${nameTabs[i].toLowerCase()}${postfix}`, tabPanel);
        }

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });
    });
  });
});
