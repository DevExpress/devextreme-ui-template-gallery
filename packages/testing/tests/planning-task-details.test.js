import { Selector, ClientFunction  } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { packages, screenModes } from '../config.js';

fixture`Form`;

const setEmbeddedMode = ClientFunction((embed) => {
    if(!embed) return;
    window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

packages.forEach(pkg => {
    [false, true].forEach(embedded => {
        screenModes.forEach(screenMode => {
            test(`Planning task details form (${pkg.name}, embed=${embedded}, ${screenMode[0]})`, async t => {
                const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
    
                await t.resizeWindow(...screenMode);
    
                await t.navigateTo(`http://localhost:${pkg.port}/#/planning-task-details`);
                await setEmbeddedMode(embedded);
    
                if(embedded) {
                    if(screenMode[0] === 400) {
                        await t.click('.view-wrapper .dx-icon-overflow');
                    }
                }
    
                await t.expect(Selector('.toolbar-header').withText('Call to clarify customer requirements.').exists).ok();
                await takeScreenshot(`planning-task-details-form-${pkg.name}-embed=${embedded}-1-${screenMode[0]}`, 'body');
                await t.click(Selector('.dx-button[aria-label=Edit]'));
                await takeScreenshot(`planning-task-details-form-${pkg.name}-embed=${embedded}-2-${screenMode[0]}`, 'body');
    
                await t
                    .expect(compareResults.isValid())
                    .ok(compareResults.errorMessages());
            });
    
            test(`Planning task details tabpanel (${pkg.name}, embed=${embedded}, ${screenMode[0]})`, async t => {
                if(screenMode[0] === 400) return;
                const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
    
                await t.resizeWindow(...screenMode);
    
                await t.navigateTo(`http://localhost:${pkg.port}/#/planning-task-details`);
                await setEmbeddedMode(embedded);
    
                if(embedded) {
                    await t.click('.dx-icon-refresh');
                }
    
                await t.expect(Selector('.toolbar-header').withText('Sammy Hill').exists).ok();
                await t.expect(Selector('.dx-datagrid .dx-checkbox-indeterminate').exists).ok();
    
                for(let i = 0; i < 3; i++) {
                    await t.click(Selector('.dx-tab').nth(i));
                    await takeScreenshot(`planning-task-details-tab-${i}-${pkg.name}-embed=${embedded}-${screenMode[0]}`, 'body');
                }
    
                await t
                    .expect(compareResults.isValid())
                    .ok(compareResults.errorMessages());
            });
        });
    })
});

