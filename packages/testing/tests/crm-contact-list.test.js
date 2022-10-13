/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { toggleCommonConfiguration } from './utils';
import { screenModes, timeoutSecond } from '../config.js';

const project = process.env.project;
const BASE_URL = `http://localhost:${process.env.port}/#/crm-contact-list`;

fixture`Contact List`;

[false, true].forEach((embedded) => {
  screenModes.forEach((screenMode) => {
    test(`Crm contact list (${project}, embed=${embedded}, ${screenMode[0]})`, async (t) => {
      const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

      // eslint-disable-next-line max-len
      await toggleCommonConfiguration(t, BASE_URL, embedded, () => {}, screenMode, timeoutSecond, true);

      await t.expect(Selector('body.dx-device-generic').count).eql(1);
      await takeScreenshot(`crm-contact-list-embed=${embedded}-${screenMode[0]}`, 'body');

      if (project === 'angular') { // TODO: remove `if` when this react functionality will be ready
        // if (screenMode[0] === 400) {
        //   await t.click('.view-wrapper .dx-icon-overflow');
        // }
        await t.click(Selector('.dx-button-text').withText('Add contact'));
        await takeScreenshot(`crm-contact-list-add-contact-form-embed=${embedded}-${screenMode[0]}`, Selector('.data-wrapper'));
        await t.click('tr.dx-data-row:first-child');
        await t.expect(Selector('.contact-name').withText('Amelia Harper').count).eql(1);
        await takeScreenshot(`crm-contact-list-form-embed=${embedded}-${screenMode[0]}`, Selector('.data-wrapper'));
      }

      await t
        .expect(compareResults.isValid())
        .ok(compareResults.errorMessages());
    });
  });
});
