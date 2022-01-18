#!/usr/bin/env node

const path = require('path');
const inquirer = require('inquirer');
const dasherize = require('dasherize');
const pascalcase = require('pascalcase');
const {
	cat,
	to,
	mkdir,
	test
} = require('shelljs');

const questions = [{
	type: 'input',
	name: 'name',
	message: 'What\'s your component name? (ex. IconSet)',
	validate(value) {
		if (value === pascalcase(value)) return true;
		return 'Name should be in PascalCase';
	}
}, {
	type: 'checkbox',
	name: 'flags',
	message: 'Check all that apply',
	choices: [
		{ name: 'add to storybook (story.js)', value: 'WITH_STORYBOOK', checked: true },
		{ name: 'add Jest tests (IconSet.test.js)', value: 'WITH_TEST', checked: true },
		{ name: 'add state', value: 'WITH_STATE' },
		{ name: 'add Sass custom storybook styles (story.sass)', value: 'WITH_SASS_STORYBOOK' }
	]
}];

function generateFile({ fileIn, fileOut, name, templatesDir, componentPath }) {
	const input = path.join(templatesDir, fileIn);
	const output = path.join(componentPath, fileOut);
	return cat(input)
		.sed(/{{COMPONENT_NAME}}/, name)
		.sed(/{{COMPONENT_FILENAME}}/, dasherize(name))
		.toEnd(output);
}

function parseAnswers(answers) {
	const { name, flags } = answers || {};

	const templatesDir = path.join(__dirname, 'templates/component');
	const componentsDir = path.join(process.cwd(), 'components');

	const withStorybook = flags.includes('WITH_STORYBOOK');
	const withStorybookSass = flags.includes('WITH_SASS_STORYBOOK');
	const withTest = flags.includes('WITH_TEST');
	const withState = flags.includes('WITH_STATE');

	const componentPath = path.join(componentsDir, dasherize(name));

	if (test('-d', componentPath)) {
		return console.log(`A component named ${name} already exists.`);
	} else {
		console.log(`Creating ${componentPath}...`);
		mkdir('-p', componentPath);
	}

	// index.js
	generateFile({
		fileIn: 'index.js',
		fileOut: 'index.js',
		name,
		templatesDir,
		componentPath
	});

	// README.md
	generateFile({
		fileIn: 'README.md',
		fileOut: 'README.md',
		name,
		templatesDir,
		componentPath
	});

	// Component
	if (withState) {
		generateFile({
			fileIn: 'COMPONENT.js',
			fileOut: `${dasherize(name)}.js`,
			name,
			templatesDir,
			componentPath
		})
	} else {
		generateFile({
			fileIn: 'COMPONENT_STATELESS.js',
			fileOut: `${dasherize(name)}.js`,
			name,
			templatesDir,
			componentPath
		})
	}

	// Create storybook entry
	if (withStorybook) {
		if (withStorybookSass) {
			generateFile({
				fileIn: 'story.js',
				fileOut: 'story.js',
				name,
				templatesDir,
				componentPath
			});
			generateFile({
				fileIn: 'story.sassx',
				fileOut: 'story.sass',
				name,
				templatesDir,
				componentPath
			});
		} else {
			generateFile({
				fileIn: 'story.WITHOUT_SASS.js',
				fileOut: 'story.js',
				name,
				templatesDir,
				componentPath
			});
		}
	}

	// Create test stub
	if (withTest) {
		generateFile({
			fileIn: 'COMPONENT.test.js',
			fileOut: `${dasherize(name)}.test.js`,
			name,
			templatesDir,
			componentPath
		});
	}

	return true;
}

const isRoot = process.cwd().substr(-16) === 'kinja-components';

if (!isRoot) {
	console.log('Please run this using `yarn generate:component`');
} else {
	inquirer.prompt(questions).then(parseAnswers)
}
