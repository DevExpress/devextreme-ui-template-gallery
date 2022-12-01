/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { getPostfix, toggleCommonConfiguration } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/crm-contact-details`;

fixture`Contact Details`;

const setEmbedded = async (t, embed, screenMode) => {
  if (embed) {
    if (screenMode[0] === 400) {
      await t.click('.view-wrapper .toolbar-details .dx-icon-overflow');
      await t.click(Selector('dx-popup-content .dx-button[aria-label=Refresh]'));
    } else {
      await t.click(Selector('.dx-button[aria-label=Refresh]'));
    }
  }
};

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Crm contact details (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      // eslint-disable-next-line max-len
      await toggleCommonConfiguration(t, BASE_URL, embedded, setEmbedded, screenMode, timeoutSecond);

      await t.click(Selector('.dx-drawer-content'));
      await t.expect(Selector('.content .dx-toolbar-label').withText('Sammy Hill').exists).ok();
      await takeScreenshot(`crm-contact-details${getPostfix(embedded, screenMode)}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });

    test(`Crm contact details Form (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      // eslint-disable-next-line max-len
      await toggleCommonConfiguration(t, BASE_URL, embedded, setEmbedded, screenMode, timeoutSecond);

      const form = Selector('.dx-form');

      await takeScreenshot(`crm-form-readonly${getPostfix(embedded, screenMode)}`, form);
      await t.click(Selector('.dx-button[aria-label=Edit]'));
      await takeScreenshot(`crm-form-edit${getPostfix(embedded, screenMode)}`, form);

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });

    test(`Crm contact details tabpanel (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const nameTabs = ['Tasks', 'Activities', 'Opportunities', 'Notes', 'Messages'];
      if (screenMode[0] === 400) return;
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      // eslint-disable-next-line max-len
      await toggleCommonConfiguration(t, BASE_URL, embedded, setEmbedded, screenMode, timeoutSecond);

      const tabs = Selector('.content .dx-tabpanel-tabs .dx-tab-text');

      for (let i = 0; i < nameTabs.count; i += 1) {
        await t.click(tabs.withText(nameTabs[i]));
        const tabPanel = Selector('.content .dx-tabpanel-container .dx-item[role=tabpanel].dx-item-selected');

        await takeScreenshot(`crm-form-tab-${nameTabs[i]}${getPostfix(embedded, screenMode)}`, tabPanel);
      }

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
