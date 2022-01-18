#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
	cat,
	test
} = require('shelljs');
const pascalcase = require('pascalcase');
const chalk = require('chalk');
const svgson = require('svgson');

const componentPath = path.join(process.cwd(), 'components/icon19')
const iconDir = path.join(componentPath, 'svg');

// get every svg file

const walk = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isHiddenFile = (/(^|\/)\.[^\/\.]/g).test(name);
    if (isHiddenFile) {
    	return files;
    }

    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...walk(name)] : [...files, name];
  }, []);

const svgFileList = walk(iconDir);

svgFileList.map(file => {
	const componentName = pascalcase(path.basename(file, '.svg'));

	const iconPath = path.join(componentPath, `${componentName}.js`);

	// create JS file if it's not yet exists
	if (!test('-f', iconPath)) {
		const input = path.join(__dirname, 'templates/icon/icon.js');
		const output = path.join(componentPath, `${componentName}.js`);
		cat(input)
			.sed('SVG_ICON_PATH', file.slice(componentPath.length))
			.sed('ICON_COMPONENT', componentName)
			.to(output);
		console.log(chalk.green(`${componentName} component created`));
	}
});

// generate icon list for storybook

let iconComponentList = {}; 

svgFileList.map(filePath => {
	const componentName = pascalcase(path.basename(filePath, '.svg'));

	const svgFileContent = fs.readFileSync(filePath, 'utf8');
	const iconJSON = svgson.parseSync(svgFileContent);
	const { width, height } = iconJSON.attributes;
	const size = `${width}x${height}`;

	iconComponentList[size] = iconComponentList[size] || [];
	iconComponentList[size] = iconComponentList[size].concat(componentName);
});

const outputJSON = path.join(componentPath, 'components.json');

fs.writeFileSync(
	outputJSON,
	JSON.stringify(iconComponentList, null, 2),
	'utf8'
);
