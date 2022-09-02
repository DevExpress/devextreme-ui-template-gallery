/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { toogleEmbeddedClass } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}`;

fixture`Planning List`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Planning task list (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await t.resizeWindow(...screenMode);

      await t.navigateTo(`${BASE_URL}/#/planning-task-list`);

      await toogleEmbeddedClass(embedded);

      await t.wait(timeoutSecond);

      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      await takeScreenshot(`planning-task-grid-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(1));
      await takeScreenshot(`planning-task-kanban-embed=${embedded}-${screenMode[0]}`, 'body');
      await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(2));
      await takeScreenshot(`planning-task-gantt-embed=${embedded}-${screenMode[0]}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
