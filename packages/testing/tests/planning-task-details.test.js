/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, ClientFunction } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}`;

fixture`Form`;

const toogleEmbeddedClass = ClientFunction((embed) => {
  if (!embed) return;
  window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

const setEmbedded = async (t, embed, screenMode) => {
  await toogleEmbeddedClass(embed);

  if (embed) {
    if (screenMode[0] === 400) {
      if (project === 'react') {
        await t.click('.view-wrapper-details .dx-icon-overflow');
      } else {
        await t.click('.view-wrapper .dx-icon-overflow');
      }
    }

    await t.click('.dx-icon-refresh');
  }
};

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Planning task details form (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await t.resizeWindow(...screenMode);

      await t.navigateTo(`${BASE_URL}/#/planning-task-details`);

      await setEmbedded(t, embedded, screenMode);

      await t.wait(timeoutSecond);

      await t.expect(Selector('.content .dx-toolbar-label').withText('Call to clarify customer requirements.').exists).ok();
      await takeScreenshot(`planning-task-details-embed=${embedded}-${screenMode[0]}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });

    test(`Planning task details Form (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await t.resizeWindow(...screenMode);

      await t.navigateTo(`${BASE_URL}/#/planning-task-details`);

      await setEmbedded(t, embedded, screenMode);

      await t.wait(timeoutSecond);

      const form = Selector('.dx-form');

      await takeScreenshot(`planning-task-form-readonly-embed=${embedded}-${screenMode[0]}`, form);
      await t.click(Selector('.dx-button[aria-label=Edit]'));
      await takeScreenshot(`planning-task-form-edit-embed=${embedded}-${screenMode[0]}`, form);

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });

    test(`Planning task details tabpanel (embed=${embedded}, ${screenMode[0]})`, async (t) => {
      if (screenMode[0] === 400) return;
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await t.resizeWindow(...screenMode);

      await t.navigateTo(`${BASE_URL}/#/planning-task-details`);

      await setEmbedded(t, embedded, screenMode);

      await t.wait(timeoutSecond);

      const tabs = Selector('.content .dx-tabpanel-tabs .dx-tab-text');
      const tabPanels = Selector('.content .dx-tabpanel-container .dx-item[role=tabpanel]');

      const tabsCount = await tabs.count;
      for (let indexTab = 0; indexTab < tabsCount; indexTab += 1) {
        const tab = tabs.nth(indexTab);
        const tabName = (await tab.innerText).toLowerCase();

        await t.click(tab);
        await takeScreenshot(`planning-task-form-tab-${tabName}-embed=${embedded}-${screenMode[0]}`, tabPanels.nth(indexTab));
      }

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
