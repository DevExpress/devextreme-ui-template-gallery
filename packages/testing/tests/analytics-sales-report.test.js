/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import {
  forceResizeRecalculation, getPostfix, toggleCommonConfiguration,
} from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/analytics-sales-report`;
const requestLogger = RequestLogger();

fixture`Analytics Sales Report`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Analytics Sales Report (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => { },
        screenMode, timeoutSecond, false, requestLogger);
      await forceResizeRecalculation(t, screenMode);
      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      await takeScreenshot(`analytics-sales-report-month${getPostfix(embedded, screenMode)}`, 'body');

      const isPeriodSelectorBoxVisible = screenModes[0] === screenMode;
      if (isPeriodSelectorBoxVisible) {
        await t.click(Selector('.sales-filter .dx-dropdownbutton'));

        await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(0));
        await t.wait(timeoutSecond);
        await takeScreenshot(`analytics-sales-report-day${getPostfix(embedded, screenMode)}`, 'body');
      }

      await t.drag(Selector('.slider').nth(1), -100, 0, { offsetX: 10, offsetY: 10 });
      await t.drag(Selector('.slider').nth(0), 100, 0, { offsetX: 10, offsetY: 10 });
      await t.wait(timeoutSecond);

      if (isPeriodSelectorBoxVisible) {
        await takeScreenshot(`analytics-sales-report-day-range${getPostfix(embedded, screenMode)}`, 'body');
        await t.click(Selector('.dx-dropdownbutton'));
        await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(1));
        await t.wait(timeoutSecond);
      }

      await takeScreenshot(`analytics-sales-report-month-range${getPostfix(embedded, screenMode)}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    }).requestHooks(requestLogger);
  });
});
