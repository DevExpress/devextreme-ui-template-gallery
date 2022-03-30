import { Selector, ClientFunction  } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { packages, screenModes } from '../config.js';

fixture`Planning Details`;

const setEmbeddedMode = ClientFunction((embed) => {
    if(!embed) return;
    window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

packages.forEach(pkg => {
    [false, true].forEach(embedded => {
        screenModes.forEach(screenMode => {
            test(`Planning task details (${pkg.name}, embed=${embedded}, ${screenMode[0]})`, async t => {
                const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

                await t.resizeWindow(...screenMode);

                await t.navigateTo(`http://localhost:${pkg.port}/#/planning-task-details`);
                await setEmbeddedMode(embedded);
                await t.expect(Selector('body.dx-device-generic').count).eql(1);

                await takeScreenshot(
                    `planning-task-details-${pkg.name}-embed=${embedded}-${screenMode[0]}`,
                    'body');

                await t.click(Selector('.dx-tab').nth(1));
                await takeScreenshot(
                    `planning-task-details-${pkg.name}-notes-embed=${embedded}-${screenMode[0]}`,
                    '.dx-tabpanel-container');

                await t.click(Selector('.dx-tab').nth(2));
                await takeScreenshot(
                    `planning-task-details-${pkg.name}-messages-embed=${embedded}-${screenMode[0]}`,
                    '.dx-tabpanel-container');

                await t
                    .expect(compareResults.isValid())
                    .ok(compareResults.errorMessages());
            });
        });
    })
});
