/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { getPostfix, toggleCommonConfiguration } from './utils';
import { timeoutSecond } from '../config.js';

const project = process.env.project;
const device = process.env.device;
const BASE_URL = `http://localhost:${process.env.port}/#/crm-contact-list`;

fixture`Contact List`;

[false, true].forEach((embedded) => {
  test(`Crm contact list (${project}, embed=${embedded}, ${device})`, async (t) => {
    const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

    // eslint-disable-next-line max-len
    await toggleCommonConfiguration(t, BASE_URL, embedded, () => { }, timeoutSecond);

    await t.expect(Selector(`body.dx-device-${device}`).count).eql(1);
    await takeScreenshot(`crm-contact-list${getPostfix(embedded)}`, 'body');

    await t.click('tr.dx-data-row:first-child');
    await takeScreenshot(`crm-contact-list-full${getPostfix(embedded)}`, 'body');
    await t.expect(Selector('.contact-name').withText('Amelia Harper').count).eql(1);
    await takeScreenshot(`crm-contact-list-form${getPostfix(embedded)}`, Selector('.data-wrapper'));
    await t.click(Selector('.dx-button[aria-label=Edit]'));
    await takeScreenshot(`crm-contact-list-form-edit${getPostfix(embedded)}`, Selector('.data-wrapper'));
    await t.click(Selector('[aria-label="Close"]'));

    if (device === 'mobile') {
      await t.click('.view-wrapper .dx-icon-overflow');
    }
    await t.click(Selector('[aria-label="Add Contact"]'));
    await takeScreenshot(`crm-contact-list-add-contact-popup-embed=${getPostfix(embedded)}`, 'body');
    await t.click(Selector('[aria-label=Save]').nth(1));
    await takeScreenshot(`crm-contact-list-add-contact-popup-validate-embed=${getPostfix(embedded)}`, 'body');

    await t
      .expect(compareResults.isValid())
      .ok(compareResults.errorMessages());
  });
});
