/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import {
  getPostfix, toggleCommonConfiguration, forceResizeRecalculation, setTheme,
} from './utils';
import { screenModes, themeModes, timeoutSecond } from '../config.js';

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
    themeModes.forEach((themeMode) => {
      const postfix = getPostfix(embedded, screenMode, themeMode);

      if (embedded && themeMode === 'dark') {
        return;
      }

      test(`Analytics Geography (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        await toggleCommonConfiguration(
          t,
          BASE_URL,
          embedded,
          () => {},
          screenMode,
          timeoutSecond,
          false,
          requestLogger,
        );
        await forceResizeRecalculation(t, screenMode);
        await setTheme(t, themeMode);
        await t.click(Selector('.content .dx-toolbar .toolbar-header')); // for remove focus tab after click

        await t.expect(Selector('body.dx-device-generic').count).eql(1);
        await t.click(Selector('body'), { offsetX: 0, offsetY: 0 }); // remove focus and scrollbar
        await t.wait(2000); // wait while scrollbar removed
        await takeScreenshot(`analytics-geography-all${postfix}`, 'body');
        await checkScreenMode(t, screenMode);
        await t.click(Selector('.dx-tabs .dx-item').nth(3));
        await t.wait(timeoutSecond);
        await takeScreenshot(`analytics-geography-year${postfix}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).requestHooks(requestLogger);
    });
  });
});
