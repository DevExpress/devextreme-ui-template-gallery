/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, ClientFunction } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}`;

fixture`Analytics Geography`;

const setEmbeddedMode = ClientFunction((embed) => {
  if (!embed) return;
  window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Analytics Geography (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await t.resizeWindow(...screenMode);

      await t.navigateTo(`${BASE_URL}/#/analytics-geography`);

      await setEmbeddedMode(embedded);

      await t.wait(timeoutSecond);

      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      await takeScreenshot(`analytics-geography-all-${project}-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(0));
      await takeScreenshot(`analytics-geography-week-${project}-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(1));
      await takeScreenshot(`analytics-geography-2-weeks-${project}-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(2));
      await takeScreenshot(`analytics-geography-month-${project}-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(3));
      await takeScreenshot(`analytics-geography-year-${project}-embed=${embedded}-${screenMode[0]}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
