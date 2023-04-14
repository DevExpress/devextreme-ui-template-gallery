/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { getPostfix, toggleCommonConfiguration, forceResizeRecalculation } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/common-profile`;
const requestLogger = RequestLogger();

fixture`User Profile`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`User Profile (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      // eslint-disable-next-line max-len
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, false, requestLogger);
      await forceResizeRecalculation(t, screenMode);

      await takeScreenshot(`user-profile${getPostfix(embedded, screenMode)}`, 'body');
      await t.click(Selector('.change-password-button'));
      await t.wait(1000);
      await takeScreenshot(`user-profile-change-password${getPostfix(embedded, screenMode)}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    }).requestHooks(requestLogger);
  });
});
