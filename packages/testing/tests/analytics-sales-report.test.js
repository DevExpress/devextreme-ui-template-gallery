/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector, ClientFunction } from 'testcafe';
import { getPostfix, toggleCommonConfiguration } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = 'http://localhost:4200/#/analytics-sales-report';

fixture`Analytics Sales Report`;


test('Analytics Sales Report', async (t) => {
  await toggleCommonConfiguration(t, BASE_URL, false, () => { }, [1280, 800], timeoutSecond);

  
  const getBoxWidth = ClientFunction(() => { 
    return document.getElementById('range-text').getBBox().width;
  });

    const width = await getBoxWidth();
    await t.expect(Math.floor(width)).eql(52);
  
});