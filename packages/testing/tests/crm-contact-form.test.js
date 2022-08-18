/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, ClientFunction, location } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}`;

fixture`Form`
  .page(BASE_URL);

const toogleEmbeddedClass = ClientFunction((embed) => {
  if (!embed) return;
  window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

const setEmbedded = async (t, embed, screenMode) => {
  await toogleEmbeddedClass(embed);

  if (embed) {
    if (screenMode[0] === 400) {
      await t.click('.view-wrapper .dx-icon-overflow');
    }

    await t.click('.dx-icon-refresh');
  }
};

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Crm contact form (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await t.resizeWindow(...screenMode);

      await t.navigateTo(`${BASE_URL}/#/crm-contact-form`);

      await setEmbedded(t, embedded, screenMode);

      await t.wait(timeoutSecond);

      await t.eval(() => location.reload(true));
      await t.expect(Selector('.content .dx-toolbar-label').withText('Sammy Hill').exists).ok();
      await takeScreenshot(`crm-contact-form-${project}-embed=${embedded}-${screenMode[0]}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });

    test(`Crm contact form Form (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await t.resizeWindow(...screenMode);

      await t.navigateTo(`${BASE_URL}/#/crm-contact-form`);

      await setEmbedded(t, embedded, screenMode);

      await t.wait(timeoutSecond);

      const form = Selector('.dx-form');

      await takeScreenshot(`crm-form-readonly-${project}-embed=${embedded}-${screenMode[0]}`, form);
      await t.click(Selector('.dx-button[aria-label=Edit]'));
      await takeScreenshot(`crm-form-edit-${project}-embed=${embedded}-${screenMode[0]}`, form);

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });

    test(`Crm contact form tabpanel (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      if (screenMode[0] === 400) return;
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await t.resizeWindow(...screenMode);

      await t.navigateTo(`${BASE_URL}/#/crm-contact-form`);

      await setEmbedded(t, embedded, screenMode);

      await t.wait(timeoutSecond);

      const tabs = Selector('.content .dx-tabpanel-tabs .dx-tab-text');
      const tabPanels = Selector('.content .dx-tabpanel-container .dx-item[role=tabpanel]');

      const tabsCount = await tabs.count;
      for (let indexTab = 0; indexTab < tabsCount; indexTab += 1) {
        const tab = tabs.nth(indexTab);
        const tabName = (await tab.innerText).toLowerCase();

        await t.click(tab);
        await takeScreenshot(`crm-form-tab-${tabName}-${project}-embed=${embedded}-${screenMode[0]}`, tabPanels.nth(indexTab));
      }

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
