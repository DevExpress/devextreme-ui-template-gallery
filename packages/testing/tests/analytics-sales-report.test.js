/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { toggleCommonConfiguration } from './utils';
import { screenModes, chartTimeout } from '../config.js';

const project = process.env.project || 'angular';
const port = process.env.port || '4200';
const BASE_URL = `http://localhost:${port}/#/analytics-sales-report`;

fixture`Analytics Sales Report`;

[false, true].forEach((embedded) => {
  [screenModes].forEach((screenMode) => {
    test(`Analytics Sales Report (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, chartTimeout);

      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      await takeScreenshot(`analytics-sales-report-month-embed=${embedded}-${screenMode[0]}`, 'body');

      await t.drag(Selector('.slider').nth(1), -100, 0, { offsetX: 10, offsetY: 10 });
      await t.drag(Selector('.slider').nth(0), 100, 0, { offsetX: 10, offsetY: 10 });

      await takeScreenshot(`analytics-sales-report-month-range-embed=${embedded}-${screenMode[0]}`, 'body');

      await t.click(Selector('.dx-dropdownbutton'));
      await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(0));
      await t.wait(chartTimeout);
      await takeScreenshot(`analytics-sales-report-day-range-embed=${embedded}-${screenMode[0]}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
