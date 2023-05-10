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

const CURRENT_PASSWORD_PLACEHOLDER = 'Current Password';
const NEW_PASSWORD_PLACEHOLDER = 'Password';
const CONFIRMED_PASSWORD_PLACEHOLDER = 'Confirm Password';

fixture`User Profile`;

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

        const getFormInput = (placeholder) => Selector('.dx-placeholoder')
          .withAttribute('data-dx_placeholder', placeholder)
          .prevSibling('input');

        await t
          .typeText(getFormInput(CURRENT_PASSWORD_PLACEHOLDER), 'oldpassword')
          .typeText(getFormInput(NEW_PASSWORD_PLACEHOLDER), 'newpassword');

        await takeScreenshot(`user-profile-change-password-old-new${postfix}`, '.dx-popup-normal');

        await t.typeText(getFormInput(CONFIRMED_PASSWORD_PLACEHOLDER), 'newpassword');

        await takeScreenshot(`user-profile-change-password-ready-to-save${postfix}`, '.dx-popup-normal');

        await t
          .click(Selector('.dx-popup-normal').find('.dx-button').withText('Save'))
          .expect(Selector('.dx-popup-normal').visible).notOk()
          .click(Selector('.change-password-button'))
          .wait(1000);

        await takeScreenshot(`user-profile-change-password-after-save${postfix}`, '.dx-popup-normal');

        await t
          .typeText(getFormInput(CURRENT_PASSWORD_PLACEHOLDER), 'oldpassword')
          .typeText(getFormInput(NEW_PASSWORD_PLACEHOLDER), 'newpassword')
          .click(Selector('.dx-popup-normal').find('.dx-button').withText('Cancel'))
          .wait(1000);

        await takeScreenshot(`user-profile-change-password-after-cancel${postfix}`, '.dx-popup-normal');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).requestHooks(requestLogger);
    });
  });
});
