/**
 * Common CLI options
 */

const yargs = require('yargs');
const packageJson = require('../../package.json');

module.exports = yargs
	.version(packageJson.version)
	.usage('Usage: $0 [options]')
	.describe('verbose', 'Output verbose messages on internal operations.')
	.boolean('verbose')
	.help('h')
	.alias('h', 'help')
	.wrap(120);
