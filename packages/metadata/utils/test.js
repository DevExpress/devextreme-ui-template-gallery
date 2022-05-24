const { MetadataChecker } = require('./metadata-checker');

const checker = new MetadataChecker();
// eslint-disable-next-line global-require
if (!checker.checkMeta(require('../metaRwa.json'))) {
  process.exit(1);
}
