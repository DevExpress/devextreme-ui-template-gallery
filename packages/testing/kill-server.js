import { kill } from 'process';
import { existsSync, readFileSync } from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import fsExtra from 'fs-extra';
import { pidsFileName } from './dirs.config.js';

const killServers = () => {
  if (!existsSync(pidsFileName)) return;

  const pids = JSON.parse(readFileSync(pidsFileName));

  pids.forEach((pid) => {
    try {
      kill(pid);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Unable to kill ${pid}. ${e}`);
    }
  });

  fsExtra.removeSync(pidsFileName);
};

killServers();
