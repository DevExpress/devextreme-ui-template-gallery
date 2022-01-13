import { Selector } from 'testcafe';
import { packages } from '../config.js';

fixture`Getting Started`;

packages.forEach(pkg => {
    test(`Crm contact list (${pkg.name})`, async t => {
        await t
            .navigateTo(`http://localhost:${pkg.port}`)
            .click('tr.dx-row');
    });
});

