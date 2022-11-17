/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import {
  getPostfix, toggleCommonConfiguration, forceResizeRecalculation, awaitFontsLoaded,
} from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/analytics-geography`;
const requestLogger = RequestLogger();

fixture`Analytics Geography`;

const checkScreenMode = async (t, screenMode) => {
  if (screenMode[0] === 400) {
    await t.click('.view-wrapper .dx-icon-overflow');
  }
};

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Analytics Geography (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond);
      await awaitFontsLoaded(t, requestLogger, 1000);
      await forceResizeRecalculation(t, screenMode);

      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      await takeScreenshot(`analytics-geography-all${getPostfix(embedded, screenMode)}`, 'body');
      await checkScreenMode(t, screenMode);
      await t.click(Selector('.dx-tabs .dx-item').nth(3));
      await t.wait(timeoutSecond);
      await takeScreenshot(`analytics-geography-year${getPostfix(embedded, screenMode)}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    }).requestHooks(requestLogger);
  });
});
