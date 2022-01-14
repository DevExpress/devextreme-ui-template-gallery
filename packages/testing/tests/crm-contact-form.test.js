import { Selector, ClientFunction  } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { packages } from '../config.js';

fixture`Getting Started`;

const setEmbeddedMode = ClientFunction((embed) => {
    if(!embed) return;
    window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

packages.forEach(pkg => {
    [false, true].forEach(embedded => {
        test(`Crm contact form (${pkg.name}, embed=${embedded})`, async t => {
            const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

            await t.navigateTo(`http://localhost:${pkg.port}/#/crm-contact-form`);
            await setEmbeddedMode(embedded);
            await t.expect(Selector('.toolbar-header').withText('Sammy Hill').count).eql(1);
            await takeScreenshot(`crm-contact-form-${pkg.name}-embed=${embedded}-1`, 'body');
            await t.click(Selector('.dx-button[aria-label=Edit]'));
            await takeScreenshot(`crm-contact-form-${pkg.name}-embed=${embedded}-2`, 'body');

            await t
                .expect(compareResults.isValid())
                .ok(compareResults.errorMessages());
        });

        test(`Crm contact form tabpanel (${pkg.name}, embed=${embedded})`, async t => {
            const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

            await t.navigateTo(`http://localhost:${pkg.port}/#/crm-contact-form`);
            await setEmbeddedMode(embedded);
            await t.expect(Selector('.toolbar-header').withText('Sammy Hill').count).eql(1);

            for(let i = 0; i < 5; i++) {
                await t.click(Selector('.dx-tab').nth(i));
                await takeScreenshot(`crm-contact-form-tab-${i}-${pkg.name}-embed=${embedded}`, 'body');
            }

            await t
                .expect(compareResults.isValid())
                .ok(compareResults.errorMessages());
        });
    })
});

