/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, ClientFunction } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { packages, screenModes, timeoutSecond } from '../config.js';

fixture`Form`;

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

packages.forEach((pkg) => {
  [false, true].forEach((embedded) => {
    screenModes.forEach((screenMode) => {
      test(`Planning task details form (${pkg.name}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        await t.resizeWindow(...screenMode);

        await t.navigateTo(`http://localhost:${pkg.port}/#/planning-task-details`);

        await setEmbedded(t, embedded, screenMode);

        await t.wait(timeoutSecond);

        await t.expect(Selector('.content .dx-toolbar-label').withText('Call to clarify customer requirements.').exists).ok();
        await takeScreenshot(`planning-task-details-${pkg.name}-embed=${embedded}-${screenMode[0]}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });

      test(`Planning task details Form (${pkg.name}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        await t.resizeWindow(...screenMode);

        await t.navigateTo(`http://localhost:${pkg.port}/#/planning-task-details`);

        await setEmbedded(t, embedded, screenMode);

        await t.wait(timeoutSecond);

        const form = Selector('.dx-form');

        await takeScreenshot(`planning-task-form-readonly-${pkg.name}-embed=${embedded}-${screenMode[0]}`, form);
        await t.click(Selector('.dx-button[aria-label=Edit]'));
        await takeScreenshot(`planning-task-form-edit-${pkg.name}-embed=${embedded}-${screenMode[0]}`, form);

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });

      test(`Planning task details tabpanel (${pkg.name}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
        if (screenMode[0] === 400) return;
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        await t.resizeWindow(...screenMode);

        await t.navigateTo(`http://localhost:${pkg.port}/#/planning-task-details`);

        await setEmbedded(t, embedded, screenMode);

        await t.wait(timeoutSecond);

        const tabs = Selector('.content .dx-tabpanel-tabs .dx-tab-text');
        const tabPanels = Selector('.content .dx-tabpanel-container .dx-item[role=tabpanel]');

        const tabsCount = await tabs.count;
        for (let indexTab = 0; indexTab < tabsCount; indexTab += 1) {
          const tab = tabs.nth(indexTab);
          const tabName = (await tab.innerText).toLowerCase();

          await t.click(tab);
          await takeScreenshot(`planning-task-form-tab-${tabName}-${pkg.name}-embed=${embedded}-${screenMode[0]}`, tabPanels.nth(indexTab));
        }

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });
    });
  });
});
