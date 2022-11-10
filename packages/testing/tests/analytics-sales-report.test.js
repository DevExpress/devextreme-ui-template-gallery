/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, ClientFunction } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { getPostfix, toggleCommonConfiguration } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/analytics-sales-report`;

fixture`Analytics Sales Report`;

[false].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Analytics Sales Report (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => { }, screenMode, timeoutSecond);


      const getBox = ClientFunction(() => {
        return {
          currentWidth: document.getElementById('range-text').getBBox().width,
          initWidth: document.getElementById('rangeSelector').initWidth
        }
      });

      const box = await getBox();
      await t.expect(Math.floor(box.currentWidth)).eql(52);
      await t.expect(Math.floor(box.initWidth)).eql(100);
    });
  });
});
