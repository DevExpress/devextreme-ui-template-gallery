/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { toggleCommonConfiguration } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/planning-task-list`;

fixture`Planning List`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Planning task list (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      // eslint-disable-next-line max-len
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, true);

      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      await takeScreenshot(`planning-task-grid-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(1));
      await takeScreenshot(`planning-task-kanban-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(2));
      await takeScreenshot(`planning-task-gantt-embed=${embedded}-${screenMode[0]}`, 'body');
      if (screenMode[0] === 400) {
        await t.click('.view-wrapper .dx-icon-overflow');
      }
      await t.click(Selector('[aria-label="Add Task"]'));
      await takeScreenshot(`planning-task-add-task-popup-embed=${embedded}-${screenMode[0]}`, Selector('.dx-popup-normal'));

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
