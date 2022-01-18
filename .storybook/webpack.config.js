const path = require('path');
const EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const WORKSPACE = process.env.WORKSPACE || path.resolve(__dirname, '..');

const moduleReplacementPlugins = [
	// Apply client side implementation for isomorphic files
	new NormalModuleReplacementPlugin(
		/(.*)utils\/logger(.*)/,
		function (resource) {
			resource.request = resource.request.replace(/utils\/logger/, 'utils/logger/client.js');
		}
	),
	new NormalModuleReplacementPlugin(
		/(.*)utils\/cache(.*)/,
		function (resource) {
			resource.request = resource.request.replace(/utils\/cache/, 'utils/cache/client.js');
		}
	),
	new NormalModuleReplacementPlugin(
		/(.*)\/config$/,
		function (resource) {
			const inMantleRoot = new RegExp(`${WORKSPACE}/kinja-magma/(.*)`);
			if (inMantleRoot.test(resource.context)) {
				resource.request = resource.request.replace(/config/, 'config/client.js');
			}
		}
	),
	new NormalModuleReplacementPlugin(
		/^node-fetch$/,
		function (resource) {
			const inMantleRoot = new RegExp(`${WORKSPACE}/kinja-magma/(.*)`);
			if (inMantleRoot.test(resource.context)) {
				resource.request = resource.request.replace(/node-fetch/, 'kinja-magma/utils/async/fetch.js');
			}
		}
	)];

module.exports = ({ config }) => {
	config.resolve.alias.components = path.join(__dirname, '../../../build/tiger/scss/components');

	config.module.rules = config.module.rules.filter(rule => !(
  	(rule.use && rule.use.length && rule.use.find(({ loader }) => loader === 'babel-loader'))
  ));

	config.module.rules.push({
		test: /(postbody|kinja-magma|kinja-images)\/.*\.js$/,
		exclude: [/node_modules/],
		loader: 'babel-loader',
		options: {
			rootMode: 'upward',
			ignore: [' ']
		}
	});

	config.module.rules.push({
		test: /\.(js|es6)$/,
		exclude: [/node_modules/],
		loader: 'babel-loader',
		options: {
			rootMode: 'upward',
			ignore: [' ']
		}
	});

	// Add soy support
	config.module.rules.push({
		test: /\.soy$/,
		use: [{
			loader: 'soy-loader',
			options: {
				inputDir: path.resolve(__dirname, '../../..'),
				pluginModules: ['com.kinja.soy.plugins.PluginsModule'],
				classpath: ['./resources/closure/soyplugins-assembly-0.4.7.jar']
			}
		}]
	});

	// separate loader for `.sass` files, for non-css modules styles;
	// components/Icon specifically makes use of this to avoid hashing
	// selectors until `babel-plugin-react-css-modules` can recognize
	// dynamic imports when using `exclude`, until then, to avoid the
	// hash & css modules, use a `.sass` extension.
	config.module.rules.push({
		test: /\.sass$/,
		use: [{
			loader: 'style-loader?sourceMap&singleton&insertAt=top'
		}, {
			loader: 'css-loader?sourceMap&importLoaders=1'
		}, {
			loader: 'sass-loader?sourceMap',
			options: {
				includePaths: [path.join(__dirname, '../../../build/tiger/scss')],
				data: '$global-img-url: \'//x.kinja-static.com/assets/images\';'
			}
		}]
	});

	config.resolve.alias['base-storybook'] = path.join(__dirname, '../.storybook/index.js');

	// optimizations
	config.plugins.push(new EnvironmentPlugin(['NODE_ENV']));
	config.plugins.push(...moduleReplacementPlugins);
	
	config.node = { fs: 'empty' };

	return config;
};
