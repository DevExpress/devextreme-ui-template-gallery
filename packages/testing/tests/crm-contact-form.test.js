/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, ClientFunction } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { packages, screenModes } from '../config.js';

fixture`Form`;

const setEmbeddedMode = ClientFunction((embed) => {
  if (!embed) return;
  window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

packages.forEach((pkg) => {
  [false, true].forEach((embedded) => {
    screenModes.forEach((screenMode) => {
      test(`Crm contact form (${pkg.name}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        await t.resizeWindow(...screenMode);

        await t.navigateTo(`http://localhost:${pkg.port}/#/crm-contact-form`);

        await setEmbeddedMode(embedded);

        if (embedded) {
          if (screenMode[0] === 400) {
            await t.click('.view-wrapper .dx-icon-overflow');
          }
          await t.click('.dx-icon-refresh');
        }

        await t.expect(Selector('.toolbar-header').withText('Sammy Hill').exists).ok();
        await takeScreenshot(`crm-contact-form-${pkg.name}-embed=${embedded}-${screenMode[0]}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });

      test(`Crm contact form Form (${pkg.name}, embed=${embedded}, ${screenMode[0]})`, async(t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        await t.resizeWindow(...screenMode);

        await t.navigateTo(`http://localhost:${pkg.port}/#/crm-contact-form`);

        await setEmbeddedMode(embedded);

        if (embedded) {
          await t.click('.dx-icon-refresh');
        }

        const form = Selector('.dx-form');

        await takeScreenshot(`crm-form-readonly-${pkg.name}-embed=${embedded}-${screenMode[0]}`, form);
        await t.click(Selector('.dx-button[aria-label=Edit]'));
        await takeScreenshot(`crm-form-edit-${pkg.name}-embed=${embedded}-${screenMode[0]}`, form);

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });

      test(`Crm contact form tabpanel (${pkg.name}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
        if (screenMode[0] === 400) return;
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        await t.resizeWindow(...screenMode);

        await t.navigateTo(`http://localhost:${pkg.port}/#/crm-contact-form`);
        await setEmbeddedMode(embedded);

        if (embedded) {
          await t.click('.dx-icon-refresh');
        }

        await t.expect(Selector('.toolbar-header').withText('Sammy Hill').exists).ok();

        const tabs = Selector('.content .dx-tabpanel-tabs .dx-tab-text');
        const tabPanels = Selector('.content .dx-tabpanel-container .dx-item[role=tabpanel]');

        const tabsCount = await tabs.count;
        for(let indexTab = 0; indexTab < tabsCount; indexTab += 1) {
            const tab = tabs.nth(indexTab);
            const tabName = (await tab.innerText).toLowerCase();

            await t.click(tab);
            await takeScreenshot(`crm-form-tab-${tabName}-${pkg.name}-embed=${embedded}-${screenMode[0]}`, tabPanels.nth(indexTab));
        }

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });
    });
  });
});
