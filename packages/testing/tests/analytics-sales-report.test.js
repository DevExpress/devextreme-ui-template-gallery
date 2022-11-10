/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, ClientFunction } from 'testcafe';
import { getPostfix, toggleCommonConfiguration } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const port = 4200
const BASE_URL = `http://localhost:${port}/#/analytics-sales-report`;

fixture`Analytics Sales Report`;

[false].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test('Analytics Sales Report', async (t) => {
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => { }, screenMode, timeoutSecond);


      const getBox = ClientFunction(() => {
        return {
          currentWidth: document.getElementById('range-text').getBBox().width,
          initWidth: document.getElementById('rangeSelector').initWidth
        }
      });

      const box = await getBox();
      await t.expect(Math.floor(box.currentWidth)).eql(52);
      await t.expect(Math.floor(box.initWidth)).eql(48);
    });
  });
});
