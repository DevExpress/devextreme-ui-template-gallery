/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import {
  getPostfix,
  toggleCommonConfiguration,
  forceResizeRecalculation,
  setTheme,
} from './utils';
import { screenModes, themeModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/planning-scheduler`;
const requestLogger = RequestLogger();

fixture`Planning Scheduler`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    themeModes.forEach((themeMode) => {
      const postfix = getPostfix(embedded, screenMode, themeMode);

      if (embedded && themeMode === 'dark') {
        return;
      }

      test(`Planning Scheduler (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, false, requestLogger);
        await forceResizeRecalculation(t, screenMode);
        await setTheme(t, themeMode);

        await takeScreenshot(`planning-scheduler${postfix}`, 'body');
        await t.click(Selector('.dx-scheduler-view-switcher-dropdown-button'));
        await t.wait(100);
        await t.click(Selector('.dx-list-item').withAttribute('title', 'Month'));
        await t.wait(1000);
        await takeScreenshot(`planning-scheduler-month-view${postfix}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).requestHooks(requestLogger);
    });
  });
});
