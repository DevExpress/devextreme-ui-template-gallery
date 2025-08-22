/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger, ClientFunction } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import {
  forceResizeRecalculation, getPostfix, toggleCommonConfiguration, setTheme,
} from './utils.js';
import { screenModes, themeModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/analytics-sales-analysis`;
const requestLogger = RequestLogger();

fixture`Analytics Sales Analysis`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    themeModes.forEach((themeMode) => {
      const postfix = getPostfix(embedded, screenMode, themeMode);

      if (embedded && themeMode === 'dark') {
        return;
      }

      test(`Analytics Sales Analysis (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
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
        await takeScreenshot(`analytics-sales-analysis-month${postfix}`, 'body');

        const isPeriodSelectorBoxVisible = screenModes[0] === screenMode;
        const setRange = ClientFunction((start, end) => {
          const root = document.querySelector('.sales-range .dx-range-selector') || document.querySelector('.sales-range .dx-rangeslider');
          if (!root || !(window).DevExpress) return null;
          const inst = (window).DevExpress.ui.dxRangeSelector.getInstance(root);
          inst.option('value', [new Date(start), new Date(end)]);
          return inst.option('value');
        });

        if (isPeriodSelectorBoxVisible) {
          await t.click(Selector('.sales-filter .dx-dropdownbutton'));
          await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(0));
          await t.wait(timeoutSecond);
          await takeScreenshot(`analytics-sales-analysis-day${postfix}`, 'body');

          await setRange('2020-01-01', '2020-01-31');
          await t.wait(1000);
          await takeScreenshot(`analytics-sales-analysis-day-range${postfix}`, 'body');
          await t.click(Selector('.sales-filter .dx-dropdownbutton'));
          await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(1));
          await t.wait(timeoutSecond);
        }

        await setRange('2020-01-01', '2020-03-31');
        await t.wait(1000);
        await takeScreenshot(`analytics-sales-analysis-month-range${postfix}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).requestHooks(requestLogger);
    });
  });
});
