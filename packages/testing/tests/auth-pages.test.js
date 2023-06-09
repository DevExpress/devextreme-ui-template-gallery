/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
/* eslint-disable import/no-extraneous-dependencies */
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import {
  getPostfix,
  toggleCommonConfiguration,
  forceResizeRecalculation,
  setTheme,
} from './utils';
import { screenModes, themeModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/sign-in-form`;
const LOGGED_OUT_URL = `http://localhost:${process.env.port}/#${project === 'angular' ? '/auth' : ''}/login`;

const requestLogger = RequestLogger();
fixture`Auth pages`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    themeModes.forEach((themeMode) => {
      const postfix = getPostfix(embedded, screenMode, themeMode);

      if (embedded && themeMode === 'dark') {
        return;
      }

      test(`Auth pages (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, false, requestLogger);
        await forceResizeRecalculation(t, screenMode);
        await setTheme(t, themeMode);

        await takeScreenshot(`auth-login-prompt${postfix}`, 'body');

        await t.click(Selector('a').withText('Forgot password?'));

        await takeScreenshot(`auth-reset-password-prompt${postfix}`, 'body');

        await t.click(Selector('a').withText('Sign In'));

        await t.click(Selector('.dx-button[aria-label="Create an account"]'));

        await takeScreenshot(`auth-create-account-prompt${postfix}`, 'body');

        await t
          .navigateTo(LOGGED_OUT_URL)
          .wait(1000);

        await takeScreenshot(`auth-login-standalone-prompt${postfix}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).requestHooks(requestLogger);
    });
  });
});
