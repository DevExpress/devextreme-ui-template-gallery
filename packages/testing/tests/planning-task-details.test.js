/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { getPostfix, toggleCommonConfiguration } from './utils';
import { timeoutSecond } from '../config.js';

const project = process.env.project;
const device = process.env.device;
const BASE_URL = `http://localhost:${process.env.port}/#/planning-task-details`;

fixture`Planning Details`;

const setEmbedded = async (t, embed) => {
  if (embed) {
    if (device === 'mobile') {
      await t.click('.view-wrapper .dx-icon-overflow');
    }

    await t.click(Selector('.dx-button[aria-label=Refresh]'));
  }
};

[false, true].forEach((embedded) => {
  test(`Planning task details form (${project}, embed=${embedded}, ${device})`, async (t) => {
    const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
    // eslint-disable-next-line max-len
    await toggleCommonConfiguration(t, BASE_URL, embedded, setEmbedded, timeoutSecond);

    await t.expect(Selector('.content .dx-toolbar-label').withText('Call to clarify customer requirements.').exists).ok();
    await takeScreenshot(`planning-task-details${getPostfix(embedded)}`, 'body');

    await t
      .expect(compareResults.isValid())
      .ok(compareResults.errorMessages());
  });

  test(`Planning task details Form (${project}, embed=${embedded}, ${device})`, async (t) => {
    const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

    // eslint-disable-next-line max-len
    await toggleCommonConfiguration(t, BASE_URL, embedded, setEmbedded, timeoutSecond);

    const form = Selector('.dx-form');

    await takeScreenshot(`planning-task-form-readonly${getPostfix(embedded)}`, form);
    await t.click(Selector('.dx-button[aria-label=Edit]'));
    await takeScreenshot(`planning-task-form-edit${getPostfix(embedded)}`, form);

    await t
      .expect(compareResults.isValid())
      .ok(compareResults.errorMessages());
  });

  test(`Planning task details tabpanel (embed=${embedded}, ${device})`, async (t) => {
    if (device === 'mobile') return;
    const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

    // eslint-disable-next-line max-len
    await toggleCommonConfiguration(t, BASE_URL, embedded, setEmbedded, timeoutSecond);

    await t.wait(timeoutSecond);

    const tabs = Selector('.content .dx-tabpanel-tabs .dx-tab-text');
    const tabPanels = Selector('.content .dx-tabpanel-container .dx-item[role=tabpanel]');

    const tabsCount = await tabs.count;
    for (let indexTab = 0; indexTab < tabsCount; indexTab += 1) {
      const tab = tabs.nth(indexTab);
      const tabName = (await tab.innerText).toLowerCase();

      await t.click(tab);
      await takeScreenshot(`planning-task-form-tab-${tabName}${getPostfix(embedded)}`, tabPanels.nth(indexTab));
    }

    await t
      .expect(compareResults.isValid())
      .ok(compareResults.errorMessages());
  });
});
