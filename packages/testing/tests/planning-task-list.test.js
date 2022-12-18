/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, RequestLogger } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { getPostfix, toggleCommonConfiguration } from './utils';
import { timeoutSecond } from '../config.js';

const project = process.env.project;
const screenMode = process.env.screenMode;
const BASE_URL = `http://localhost:${process.env.port}/#/planning-task-list`;
const requestLogger = RequestLogger();

fixture`Planning List`;

[false, true].forEach((embedded) => {
  test(`Planning task list (${project}, embed=${embedded}, ${screenMode})`, async (t) => {
    const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

    // eslint-disable-next-line max-len
    await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, timeoutSecond, requestLogger);

    await t.expect(Selector(`body.dx-device-${screenMode}`).count).eql(1);
    await takeScreenshot(`planning-task-grid${getPostfix(embedded)}`, 'body');
    await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(1));
    await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(0));
    await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(1));
    await t.click(Selector('.content .dx-toolbar .toolbar-header')); // for remove focus tab after click
    await takeScreenshot(`planning-task-kanban${getPostfix(embedded)}`, 'body');
    await t.click(Selector('.content .dx-toolbar .dx-tabs .dx-item').nth(2));
    await t.click(Selector('.content .dx-toolbar .toolbar-header')); // for remove focus tab after click
    await takeScreenshot(`planning-task-gantt${getPostfix(embedded)}`, 'body');
    if (screenMode === 'mobile') {
      await t.click('.view-wrapper .dx-icon-overflow');
    }
    await t.click(Selector('[aria-label="Add Task"]'));
    await t.typeText(Selector('.form-editor-input.dx-texteditor-input').nth(3), '10/26/2022', { replace: true });
    await t.typeText(Selector('.form-editor-input.dx-texteditor-input').nth(4), '10/26/2022', { replace: true });
    await takeScreenshot(`planning-task-add-task-popup-embed=${getPostfix(embedded)}`, 'body');
    await t.doubleClick(Selector('[aria-label="Save"]'));
    await takeScreenshot(`planning-task-add-task-popup-validate-embed=${getPostfix(embedded)}`, 'body');

    await t
      .expect(compareResults.isValid())
      .ok(compareResults.errorMessages());
  }).requestHooks(requestLogger);
});
