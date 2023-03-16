/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { forceResizeRecalculation, getPostfix, toggleCommonConfiguration } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/crm-contact-list`;

fixture`Contact List`;
const themeModes = ['light', 'dark'];

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    themeModes.forEach((themeMode) => {
      test(`Crm contact list (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, true);

        if (themeMode === 'dark') {
          await t.click('theme-button');
          await t.wait(2000);
        }

        await t.expect(Selector('body.dx-device-generic').count).eql(1);
        await takeScreenshot(`crm-contact-list${getPostfix(embedded, screenMode, themeMode)}`, 'body');

        await t.click('tr.dx-data-row:first-child');
        await forceResizeRecalculation(t, screenMode);
        await takeScreenshot(`crm-contact-list-full${getPostfix(embedded, screenMode, themeMode)}`, 'body');
        await t.expect(Selector('.contact-name').withText('Amelia Harper').count).eql(1);
        await takeScreenshot(`crm-contact-list-form${getPostfix(embedded, screenMode, themeMode)}`, Selector('.data-wrapper'));
        await t.click(Selector('.dx-button[aria-label=Edit]'));
        await takeScreenshot(`crm-contact-list-form-edit${getPostfix(embedded, screenMode, themeMode)}`, Selector('.data-wrapper'));
        await t.click(Selector('[aria-label="Close"]'));

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });
    });

    test(`Add contact popup (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      // eslint-disable-next-line max-len
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, true);
      await forceResizeRecalculation(t, screenMode);

      if (screenMode[0] === 400) {
        await t.click('.view-wrapper .dx-icon-overflow');
      }

      await t.click(Selector('[aria-label="Add Contact"]'));
      await t.wait(1000);
      await takeScreenshot(`crm-contact-list-add-contact-popup${getPostfix(embedded, screenMode)}`, 'body');

      await t.click(Selector('[aria-label=Save]'));
      await takeScreenshot(`crm-contact-list-add-contact-popup-validate=${getPostfix(embedded, screenMode)}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
