/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { getPostfix, toggleCommonConfiguration } from './utils';
import { timeoutSecond } from '../config.js';

const project = process.env.project;
const screenMode = process.env.screenMode;
const BASE_URL = `http://localhost:${process.env.port}/#/analytics-geography`;
const requestLogger = RequestLogger();

fixture`Analytics Geography`;

const checkScreenMode = async (t) => {
  if (screenMode === 'mobile') {
    await t.click('.view-wrapper .dx-icon-overflow');
  }
};

[false, true].forEach((embedded) => {
  test(`Analytics Geography (${project}, embed=${embedded}, ${screenMode})`, async (t) => {
    const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

    await toggleCommonConfiguration(t, BASE_URL, embedded, () => { },
      timeoutSecond, requestLogger);

    await t.expect(Selector(`body.dx-device-${screenMode}`).count).eql(1);
    await takeScreenshot(`analytics-geography-all${getPostfix(embedded)}`, 'body');
    await checkScreenMode(t);
    await t.click(Selector('.dx-tabs .dx-item').nth(3));
    await t.wait(timeoutSecond);
    await takeScreenshot(`analytics-geography-year${getPostfix(embedded)}`, 'body');

    await t
      .expect(compareResults.isValid())
      .ok(compareResults.errorMessages());
  }).requestHooks(requestLogger);
});
