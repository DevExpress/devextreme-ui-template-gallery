/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { getPostfix, toggleCommonConfiguration, forceResizeRecalculation } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/planning-task-list`;
const requestLogger = RequestLogger();

fixture`Planning List`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Planning task list (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      // eslint-disable-next-line max-len
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, false, requestLogger);
      await forceResizeRecalculation(t, screenMode);

      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      await takeScreenshot(`planning-task-grid${getPostfix(embedded, screenMode)}`, 'body');
      await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(1));
      await takeScreenshot(`planning-task-kanban${getPostfix(embedded, screenMode)}`, 'body');
      await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(2));
      await takeScreenshot(`planning-task-gantt${getPostfix(embedded, screenMode)}`, 'body');
      if (screenMode[0] === 400) {
        await t.click('.view-wrapper .dx-icon-overflow');
      }
      await t.click(Selector('[aria-label="Add Task"]'));
      // TODO: works only in angular, replace form-item-date with another selector
      await t.typeText(Selector('form-item-date[label="Start Date"] .dx-datebox'), '10/26/2022', { replace: true });
      await t.typeText(Selector('form-item-date[label="Due Date"] .dx-datebox'), '10/26/2022', { replace: true });
      await takeScreenshot(`planning-task-add-task-popup-embed=${getPostfix(embedded, screenMode)}`, 'body');
      await t.click(Selector('[aria-label=Save]').nth(1));
      await takeScreenshot(`planning-task-add-task-popup-validate-embed=${getPostfix(embedded, screenMode)}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    }).requestHooks(requestLogger);
  });
});
