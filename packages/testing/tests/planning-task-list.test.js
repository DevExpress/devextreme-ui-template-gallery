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
const BASE_URL = `http://localhost:${process.env.port}/#/planning-task-list`;
const requestLogger = RequestLogger();

fixture`Planning List`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    themeModes.forEach((themeMode) => {
      const postfix = getPostfix(embedded, screenMode, themeMode);

      if (embedded && themeMode === 'dark') {
        return;
      }

      test(`Planning task list (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, false, requestLogger);
        await forceResizeRecalculation(t, screenMode);
        await setTheme(t, themeMode);

        await t.expect(Selector('body.dx-device-generic').count).eql(1);
        await takeScreenshot(`planning-task-grid${postfix}`, 'body');
        await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(1));
        await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(0));
        await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(1));
        await t.click(Selector('.content .dx-toolbar .toolbar-header')); // for remove focus tab after click
        await takeScreenshot(`planning-task-kanban${postfix}`, 'body');
        await t.doubleClick(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(2));
        await t.click(Selector('.content .dx-toolbar .toolbar-header')); // for remove focus tab after click
        await takeScreenshot(`planning-task-gantt${postfix}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).requestHooks(requestLogger);

      test(`Add task popup (${project}, embed=${embedded}, ${screenMode[0]}, ${themeMode})`, async (t) => {
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        // eslint-disable-next-line max-len
        await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, false, requestLogger);
        await forceResizeRecalculation(t, screenMode);
        await setTheme(t, themeMode);

        if (screenMode[0] === 400) {
          await t.click('.view-wrapper .dx-icon-overflow');
        }
        await t.click(Selector('[aria-label="Add Task"]'));
        await t.wait(1000);
        const inputFields = Selector('.form-editor-input.dx-texteditor-input');

        await t.typeText(inputFields.nth(3), '01/26/2023', { replace: true });
        await t.click(inputFields.nth(4));
        await t.typeText(inputFields.nth(4), '12/26/2023', { replace: true });
        await t.click(Selector('.dx-toolbar.dx-popup-title')); // to remove focus from input

        if (project === 'react') {
          await forceResizeRecalculation(t, screenMode);
        }

        await takeScreenshot(`planning-task-add-task-popup${postfix}`, 'body');
        await t.doubleClick(Selector('[aria-label="Save"]'));
        await takeScreenshot(`planning-task-add-task-popup-validate${postfix}`, 'body');

        await t
          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).requestHooks(requestLogger);
    });
  });
});
