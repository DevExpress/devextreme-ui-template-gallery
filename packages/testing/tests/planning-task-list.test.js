/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { toogleEmbeddedClass } from './utils';
import { screenModes, timeoutSecond, fakeScreenSize } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}`;

fixture`Planning List`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Planning task list (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      await t.navigateTo(`${BASE_URL}/#/planning-task-list`);

      await toogleEmbeddedClass(embedded);
      if (embedded) {
        await t.resizeWindow(...fakeScreenSize);
      }
      await t.resizeWindow(...screenMode);

      await t.wait(timeoutSecond);

      await takeScreenshot(`planning-task-grid-embed=${embedded}-project=${project}-${screenMode[0]}`, 'body');

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
