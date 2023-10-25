/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import {
  forceResizeRecalculation,
  getPostfix,
  toggleCommonConfiguration,
  setTheme,
} from './utils';
import { screenModes, themeModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/crm-contact-list`;

fixture`Contact List`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    themeModes.forEach((themeMode) => {
      const postfix = getPostfix(embedded, screenMode, themeMode);

      if (embedded && themeMode === 'dark') {
        return;
      }

      test(`Crm contact list (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, true);
        await setTheme(t, themeMode);

        await t.expect(Selector('body.dx-device-generic').count).eql(1);
        await takeScreenshot(`crm-contact-list${postfix}`, 'body');

        await t.click('tr.dx-data-row:first-child');
        await forceResizeRecalculation(t, screenMode);
        await takeScreenshot(`crm-contact-list-full${postfix}`, 'body');
        await t.expect(Selector('.contact-name').withText('Amelia Harper').count).eql(1);
        await takeScreenshot(`crm-contact-list-form${postfix}`, Selector('.data-wrapper'));

        if (screenMode[0] === 1280) {
          await t.click(Selector('.dx-icon-unpin'));
          await t.click('.contact-name'); // to remove focus from the pin button
          await takeScreenshot(`crm-contact-list-full-form-pinned${postfix}`, 'body');
          await t.click(Selector('.dx-icon-pin'));
        }

        await t.click(Selector('.dx-button[aria-label=Edit]'));
        await takeScreenshot(`crm-contact-list-form-edit${postfix}`, Selector('.data-wrapper'));
        await t.click(Selector('[aria-label="Close"]'));

        await t.click(Selector('.dx-button[aria-label=All]'));
        await t.click(Selector('.dx-list-item-content').withText('Terminated'));
        await takeScreenshot(`crm-contact-list-grid-filtering-terminated=${postfix}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });

      test(`Add contact popup (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, true);
        await forceResizeRecalculation(t, screenMode);

        await setTheme(t, themeMode);

        if (screenMode[0] === 400) {
          await t.click('.view-wrapper .dx-icon-overflow');
        }

        await t.click(Selector('[aria-label="Add Contact"]'));

        await t.wait(1000);

        await takeScreenshot(`crm-contact-list-add-contact-popup${postfix}`, 'body');

        await t.click(Selector('[aria-label=Save]'));

        await takeScreenshot(`crm-contact-list-add-contact-popup-validate=${postfix}`, 'body');

        const inputs = Selector('.dx-popup-content input.form-editor-input');

        await t.typeText(inputs.nth(0), 'test 0');
        await t.typeText(inputs.nth(1), 'test 1');
        await t.typeText(inputs.nth(2), 'test 2');
        await t.typeText(inputs.nth(3), 'test 3');
        await t.typeText(inputs.nth(4), 'test 4');
        await t.typeText(inputs.nth(5), '1111111111');
        await t.typeText(inputs.nth(6), 'test@test.com');
        await t.typeText(inputs.nth(7), 'test 7');

        await t.click(Selector('[aria-label=Save]'));

        await t.wait(2000);

        await t.expect(Selector('.dx-toast-message').withText('"test 0 test 1"').exists).ok();

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      });
    });
  });
});
