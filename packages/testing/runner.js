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
  },
});

const currentPackage = packages.find((p) => p.name === args.project);

if (args.project === '' && args.page === '') {
  process.exit(1);
}

let testCafe;
createTestCafe('localhost', currentPackage.port)
  .then((tc) => {
    testCafe = tc;

    const runner = testCafe.createRunner()
      .browsers('chrome:headless')
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

    return runner.run({
      quarantineMode: args.quarantineMode === 'true',
    });
  })
  .catch((failedCount) => {
    console.log(failedCount);
    if (failedCount.message) {
      console.log(failedCount.message);
    }
    if (testCafe) {
      testCafe.close();
    }
    exit(failedCount);
  });
