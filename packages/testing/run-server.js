import { join } from 'path';
import { spawn } from 'child_process';
import { argv, exit } from 'process';
import { writeFileSync } from 'fs';
import parseArgs from 'minimist';
import { testingDirectory, pidsFileName } from './dirs.config.js';
import { packages } from './config.js';

const args = parseArgs(argv.slice(1), {
  project: '',
});

const waitTimeout = 4000;
const childs = [];

const onClose = (code) => {
  throw new Error(`webserver exited with code ${code}`);
};

const getPackage = (packageName) => packages.find((p) => p.name === packageName);

const startProject = (pkg) => {
  const appDirectory = join(testingDirectory, '..', pkg.name, 'build');
  const httpServerBin = join(testingDirectory, '..', '..', 'node_modules', 'http-server', 'bin', 'http-server');

  const server = spawn('node', [httpServerBin, appDirectory, '-c-1', `-p ${pkg.port}`], {
    detached: true,
    stdio: 'ignore',
  });

  childs.push(server);
  // eslint-disable-next-line no-console
  console.log(`Start server ${pkg.name}: localhost:${pkg.port}`);

  server.on('close', onClose);
};

if (args.project) {
  const currentPackage = getPackage(args.project);
  startProject(currentPackage);
} else {
  packages.forEach((pkg) => {
    startProject(pkg);
  });
}

setTimeout(() => {
  const pids = [];
  childs.forEach((server) => {
    server.removeListener('close', onClose);
    pids.push(server.pid);
  });
  writeFileSync(pidsFileName, JSON.stringify(pids));

  // eslint-disable-next-line no-console
  console.log('Servers started with pids ', pids);
  exit();
}, waitTimeout);
