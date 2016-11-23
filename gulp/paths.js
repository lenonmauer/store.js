const path = require('path');

const DEST_PRODUCTION = 'build/';
const DEST_EXAMPLES = './examples/';
const DEST_DEVELOPMENT = path.join(DEST_EXAMPLES, 'assets');
const SRC_DEVELOPMENT = './src/*.js';
const SRC_EXAMPLES = path.join(DEST_EXAMPLES, '*.html');

module.exports = {
  DEST_PRODUCTION,
  DEST_EXAMPLES,
  DEST_DEVELOPMENT,
  SRC_DEVELOPMENT,
  SRC_EXAMPLES
};