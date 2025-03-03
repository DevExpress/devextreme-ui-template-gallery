/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import {
  getPostfix,
  toggleCommonConfiguration,
  forceResizeRecalculation,
  setTheme,
} from './utils';
import { screenModes, themeModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/user-profile`;
const requestLogger = RequestLogger();

fixture`User Profile`;

const OLD_PASSWORD = 'oldpassword';
const NEW_PASSWORD = 'newpassword';

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    themeModes.forEach((themeMode) => {
      const postfix = getPostfix(embedded, screenMode, themeMode);

      if (embedded && themeMode === 'dark') {
        return;
      }

      test(`User Profile (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, false, requestLogger);
        await forceResizeRecalculation(t, screenMode);
        await setTheme(t, themeMode);

        await takeScreenshot(`user-profile${postfix}`, 'body');
        await t.click(Selector('.change-password-button'));
        await t.wait(1000);
        await takeScreenshot(`user-profile-change-password${postfix}`, 'body');

        const popupSelector = screenMode[0] === 400 ? '.dx-popup-fullscreen' : '.dx-popup-normal';
        const formInputs = Selector('.dx-popup-content .dx-texteditor-input[type="password"]');

        const oldPasswordInput = formInputs.nth(0);
        const newPasswordInput = formInputs.nth(1);
        const repeatNewPasswordInput = formInputs.nth(2);

        await t
          .typeText(oldPasswordInput, OLD_PASSWORD)
          .typeText(newPasswordInput, NEW_PASSWORD);

        await takeScreenshot(`user-profile-change-password-old-new${postfix}`, popupSelector);

        await t.typeText(repeatNewPasswordInput, NEW_PASSWORD);

        await takeScreenshot(`user-profile-change-password-ready-to-save${postfix}`, popupSelector);

        await t
          .click(Selector(popupSelector).find('.form-popup-buttons-container').find('.dx-button').nth(1)) // Save button
          .expect(Selector(popupSelector).visible)
          .notOk()
          .click(Selector('.change-password-button'))
          .wait(1000);

        await takeScreenshot(`user-profile-change-password-after-save${postfix}`, popupSelector);

        await t
          .typeText(formInputs.nth(0), 'oldpassword')
          .typeText(formInputs.nth(1), 'newpassword')
          .click(Selector(popupSelector).find('.form-popup-buttons-container').find('.dx-button').nth(0)) // Cancel button
          .expect(Selector(popupSelector).visible)
          .notOk()
          .click(Selector('.change-password-button'))
          .wait(1000);

        await takeScreenshot(`user-profile-change-password-after-cancel${postfix}`, popupSelector);

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).requestHooks(requestLogger);
    });
  });
});
