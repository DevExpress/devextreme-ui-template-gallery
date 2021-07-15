const { MetadataCheker } = require('./metadata-checker');

const checker = new MetadataCheker();
if(!checker.checkMeta(require('../metaRwa.json'))) {
    process.exit(1);
}
