const { MetadataCheker } = require('./metadata-checker');

const checker = new MetadataCheker();
const exitCode = checker.checkMeta(require('../metaRwa.json'));

process.exit(exitCode);
