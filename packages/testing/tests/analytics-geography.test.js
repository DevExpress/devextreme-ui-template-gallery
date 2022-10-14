/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { toggleCommonConfiguration } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/analytics-geography`;

fixture`Analytics Geography`;

const checkScreenMode = async (t, screenMode) => {
  if (screenMode[0] === 400) {
    await t.click('.view-wrapper .dx-icon-overflow');
  }
};

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    const theme = process.env.theme;
    test(`Analytics Geography (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond);

      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      await takeScreenshot(`analytics-geography-all-embed=${embedded}-${theme}-${screenMode[0]}`, 'body');
      await checkScreenMode(t, screenMode);
      await t.click(Selector('.dx-tabs .dx-item').nth(3));
      await t.wait(timeoutSecond);
      await takeScreenshot(`analytics-geography-year-embed=${embedded}-${theme}-${screenMode[0]}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
