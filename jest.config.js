process.env.TZ = 'US/Eastern';

module.exports = {
	testMatch: [
		'**/?(*.)(test).js'
	],
	transform: {
		'^.+\\.jsx?$': '../../babel-jest.upward.js'
	},
	testPathIgnorePatterns: [
		'/.scripts/',
		'/.storybook/',
		'/config/',
		'/flow-typed/',
		'/node_modules/'
	],
	moduleNameMapper: {
		'\\.(scss|less)$': '<rootDir>/../../__mocks__/styleMock.js',
		'^postbody/(.*)$': '<rootDir>/../postbody/$1',
		'^kinja-images/(.*)$': '<rootDir>/../kinja-images/$1'
	},
	setupFiles: ['./config/setupTests.js'],
	setupTestFrameworkScriptFile: './config/setupTestFramework.js',
	snapshotSerializers: [
		'enzyme-to-json/serializer'
	],
	coveragePathIgnorePatterns: [
		'<rootDir>',
		'/config/',
		'/flow-typed/',
		'/locales/',
		'/node_modules/',
		'story.js',
		'translations.js'
	]
};
