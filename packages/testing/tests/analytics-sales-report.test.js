/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, ClientFunction } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}`;

fixture`Analytics Sales Report`;

const setEmbeddedMode = ClientFunction((embed) => {
  if (!embed) return;
  window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Analytics Sales Report (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await t.resizeWindow(...screenMode);

      await t.navigateTo(`${BASE_URL}/#/analytics-sales-report`);

      await setEmbeddedMode(embedded);

      await t.wait(timeoutSecond);

      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      await takeScreenshot(`analytics-sales-report-all-${project}-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.dx-dropdownbutton'));
      await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(0));
      await t.wait(timeoutSecond);
      await takeScreenshot(`analytics-sales-report-week-${project}-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.dx-dropdownbutton'));
      await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(1));
      await t.wait(timeoutSecond);
      await takeScreenshot(`analytics-sales-report-2-weeks-${project}-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.dx-dropdownbutton'));
      await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(2));
      await t.wait(timeoutSecond);
      await takeScreenshot(`analytics-sales-report-month-${project}-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.dx-dropdownbutton'));
      await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(3));
      await t.wait(timeoutSecond);
      await takeScreenshot(`analytics-sales-report-year-${project}-embed=${embedded}-${screenMode[0]}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
