import createTestCafe from 'testcafe';
import { argv, env, exit } from 'process';
import parseArgs from 'minimist';
import { packages } from './config.js';

const args = parseArgs(argv.slice(1), {
  default: {
    project: '',
    page: '',
    concurrency: '0',
    quarantineMode: false,
    theme: '',
  },
});

const currentPackage = packages.find((p) => p.name === args.project);

if (args.project === '' && args.page === '') {
  process.exit(1);
}

let testCafe;
createTestCafe('localhost', 1437, 1438)
  .then((tc) => {
    testCafe = tc;

    const chromeOptions = [
      'disable-dev-shm-usage',
      'no-sandbox',
      'allow-restricted-networking',
      'disable-gpu',
      'disable-permissions-api',
      'disable-bluetooth',
      'disable-features=WebBluetooth,WebUSB,WebSerial',
      'disable-web-security',
    ];
    const runner = testCafe.createRunner()
      .browsers(`chrome:headless --${chromeOptions.join(' --')}`)
      .reporter('minimal')
      .src([
        `tests/${args.page}.test.js`,
      ]);
    runner.cache = true;

    if (args.concurrency > 0) {
      runner.concurrency(args.concurrency);
    }

    env.project = args.project;
    env.port = currentPackage.port;
    env.theme = args.theme;

    return runner.run({
      quarantineMode: args.quarantineMode === 'true',
    });
  })
  .then(async (failedCount) => {
    await testCafe.close();
    exit(failedCount);
  });
