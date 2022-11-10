/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
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


      const getBoxWidth = ClientFunction(() => {
        return document.getElementById('range-text').getBBox().width;
      });

      const width = await getBoxWidth();
      await t.expect(Math.floor(width)).eql(52);
    });
  });
});
