import createTestCafe from 'testcafe';
import { argv, env, exit } from 'process';
import parseArgs from 'minimist';
import dashboardReporter from 'testcafe-reporter-dashboard-devextreme';
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
const reporters = process.env.CI === 'true' ? ['minimal', dashboardReporter] : 'minimal';

if (args.project === '' && args.page === '') {
  process.exit(1);
}

let testCafe;
createTestCafe('localhost', 1437, 1438)
  .then((tc) => {
    testCafe = tc;

    const runner = testCafe.createRunner()
      .browsers('chrome:headless')
      .reporter(reporters)
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
  .then((failedCount) => {
    testCafe.close();
    exit(failedCount);
  });
