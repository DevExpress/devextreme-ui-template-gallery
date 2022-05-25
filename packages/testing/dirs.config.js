import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const testingDirectory = dirname(fileURLToPath(import.meta.url));

export const pidsFileName = join(testingDirectory, 'pids.json');
