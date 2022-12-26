/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
/* eslint-disable import/no-extraneous-dependencies */
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { getPostfix, toggleCommonConfiguration, forceResizeRecalculation } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#${project === 'angular' ? '/auth' : ''}/login`;
const requestLogger = RequestLogger();
fixture`Auth forms`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Auth forms (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      // eslint-disable-next-line max-len
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, false, requestLogger);
      await forceResizeRecalculation(t, screenMode);

      await takeScreenshot(`auth-login-prompt${getPostfix(embedded, screenMode)}`, 'body');

      await t.click(Selector('a').withText('Forgot password?'));

      await takeScreenshot(`auth-reset-password-prompt${getPostfix(embedded, screenMode)}`, 'body');

      await t.click(Selector('a').withText('Sign In'));

      await t.click(Selector('.dx-button[aria-label="Create an account"]'));

      await takeScreenshot(`auth-create-account-prompt${getPostfix(embedded, screenMode)}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    }).requestHooks(requestLogger);
  });
});
