/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import {
  forceResizeRecalculation, getPostfix, toggleCommonConfiguration, setTheme,
} from './utils';
import { screenModes, themeModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/analytics-sales-report`;
const requestLogger = RequestLogger();

fixture`Analytics Sales Report`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    themeModes.forEach((themeMode) => {
      const postfix = getPostfix(embedded, screenMode, themeMode);

      if (embedded && themeMode === 'dark') {
        return;
      }

      test(`Analytics Sales Report (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
        await toggleCommonConfiguration(
          t,
          BASE_URL,
          embedded,
          () => { },
          screenMode,
          timeoutSecond,
          false,
          requestLogger,
        );
        await setTheme(t, themeMode);
        await forceResizeRecalculation(t, screenMode);
        await t.wait(timeoutSecond);

        await t.expect(Selector('body.dx-device-generic').count).eql(1);
        await takeScreenshot(`analytics-sales-report-month${postfix}`, 'body');

        const isPeriodSelectorBoxVisible = screenModes[0] === screenMode;
        if (isPeriodSelectorBoxVisible) {
          await t.click(Selector('.sales-filter .dx-dropdownbutton'));

          await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(0));
          await t.wait(timeoutSecond);
          await takeScreenshot(`analytics-sales-report-day${postfix}`, 'body');
        }

        await t.drag(Selector('.slider').nth(1), -50, 0, { offsetX: 10, offsetY: 10 });
        await t.drag(Selector('.slider').nth(0), 100, 0, { offsetX: 10, offsetY: 10 });

        await t.wait(timeoutSecond);

        if (isPeriodSelectorBoxVisible) {
          await takeScreenshot(`analytics-sales-report-day-range${postfix}`, 'body');
          await t.click(Selector('.sales-filter .dx-dropdownbutton'));
          await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(1));
          await t.wait(timeoutSecond);
        }

        await takeScreenshot(`analytics-sales-report-month-range${postfix}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).requestHooks(requestLogger);
    });
  });
});
