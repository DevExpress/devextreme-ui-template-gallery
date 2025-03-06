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
      const commonTestName = `User Profile (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`;

      if (embedded && themeMode === 'dark') {
        return;
      }

      test(commonTestName, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, false, requestLogger);
        await forceResizeRecalculation(t, screenMode);
        await setTheme(t, themeMode);

        await takeScreenshot(`user-profile${postfix}`, 'body');
        await t.click(Selector('.change-password-button'));
        await t.wait(1000);
        await takeScreenshot(`user-profile-change-password${postfix}`, 'body');

        const getFormInput = (placeholder) => Selector('.dx-placeholder')
          .withAttribute('data-dx_placeholder', placeholder)
          .prevSibling('input');

        const popupSelector = screenMode[0] === 400 ? '.dx-popup-fullscreen' : '.dx-popup-normal';

        await t
          .typeText(getFormInput(CURRENT_PASSWORD_PLACEHOLDER), 'oldpassword')
          .typeText(getFormInput(NEW_PASSWORD_PLACEHOLDER), 'newpassword');

        await takeScreenshot(`user-profile-change-password-old-new${postfix}`, popupSelector);

        await t.typeText(getFormInput(CONFIRMED_PASSWORD_PLACEHOLDER), 'newpassword');

        await takeScreenshot(`user-profile-change-password-ready-to-save${postfix}`, popupSelector);

        await t
          .click(Selector(popupSelector).find('.form-popup-buttons-container').find('.dx-button').nth(1)) // Save button
          .expect(Selector(popupSelector).visible)
          .notOk()
          .click(Selector('.change-password-button'))
          .wait(1000);

        await takeScreenshot(`user-profile-change-password-after-save${postfix}`, popupSelector);

        await t
          .typeText(getFormInput(CURRENT_PASSWORD_PLACEHOLDER), 'oldpassword')
          .typeText(getFormInput(NEW_PASSWORD_PLACEHOLDER), 'newpassword')
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

      test(`${commonTestName} check inputs focuses in `, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, false, requestLogger);
        await forceResizeRecalculation(t, screenMode);
        await setTheme(t, themeMode);

        const runChecks = async (selector, callback) => {
          const count = await selector.count;
          const promises = [];
          for (let i = 0; i < count; i += 1) {
            promises.push(callback(i));
          }
          await Promise.all(promises);
        };

        const inputs = Selector('.form-container input.dx-texteditor-input')
          .filter((node) => !node.closest('.dx-dropdowneditor-input-wrapper'));

        await runChecks(inputs, async (i) => {
          const input = await inputs.nth(i);
          const inputId = await input.getAttribute('id');
          const inputName = await input.getAttribute('name');

          await t
            .click(input)
            .pressKey('backspace')
            .pressKey('1')
            .expect(input.focused)
            .ok(`Focus lost on input name:${inputName}, id: ${inputId}`);
        });

        const dropDowns = Selector(
          '.form-container .dx-dropdowneditor-input-wrapper.dx-selectbox-container',
        );

        await runChecks(dropDowns, async (i) => {
          const dropDown = await dropDowns.nth(i);

          await t
            .click(dropDown)
            .wait(100)
            .click(
              Selector('.dx-popup-wrapper .dx-item.dx-list-item:not(.dx-list-item-selected)')
                .nth(0),
            );
        });

        const localPostfix = 'block-after-actions-wtih-form';
        await takeScreenshot(`basic-${localPostfix}${postfix}`, '.basic-info-card');
        await takeScreenshot(`contacts-${localPostfix}${postfix}`, '.contacts-card');
        await takeScreenshot(`address-${localPostfix}${postfix}`, '.address-card');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).requestHooks(requestLogger);
    });
  });
});
