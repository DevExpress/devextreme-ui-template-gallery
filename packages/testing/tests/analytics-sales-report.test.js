/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { getPostfix, toggleCommonConfiguration } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/analytics-sales-report`;

fixture`Analytics Sales Report`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Analytics Sales Report (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond);

      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      if(screenMode === 400) {
        const rangeSelector = Selector('dx-range-selector');
        const state = await rangeSelector();
        await t.expect(state.boundingClientRect.width).eql(334);
      }
      await takeScreenshot(`analytics-sales-report-all${getPostfix(embedded, screenMode)}`, 'body');
      if (Selector('.dx-dropdownbutton').length !== 0) {
        await t.click(Selector('.dx-dropdownbutton'));
        await t.click(Selector('.dx-dropdownbutton-popup-wrapper .dx-list .dx-list-item').nth(0));
        await t.wait(timeoutSecond);
        await takeScreenshot(`analytics-sales-report-day${getPostfix(embedded, screenMode)}`, 'body');
      }

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
