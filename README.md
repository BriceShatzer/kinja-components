# ⚛ Kinja-components ![ready](status-images/ready.svg) [![CircleCI](https://circleci.com/gh/gawkermedia/kinja-mantle.svg?style=svg&circle-token=7c1171e909d583ff4d5f894e0874e66f6d04315d)](https://circleci.com/gh/gawkermedia/kinja-mantle) [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

Kinja-components is an atomic system of guides, styles, utilities and UI components to help the Kinja team build a consistent and maintainable product.

Check out [Storybook](https://gawkermedia.github.io/kinja-components/) to learn more and to play around with live components.

## ⚠️ Warning

When upgrading dependencies, ensure that you use `yarn upgrade-interactive` to
interactively upgrade specific modules. **DO NOT** upgrade the following modules
which **intentionally** withhold `^` and `~` prefixes:

- [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) 2.0.0-rc.3
- [eslint](https://github.com/eslint/eslint) 3.19.0

```
 "<red>"    : Patch Update Backward-compatible bug fixes
 "<yellow>" : Minor Update backward-compatibles features
```


## Setup

1. If you don't have `yarn` >= 0.20 installed:
```bash
npm -g uninstall yarn # just in case
brew install yarn --ignore-dependencies
```
For more information on how to install and use yarn check the [Yarn quickstart guide](https://gist.github.com/yaanno/f83e3d11b85955dde8d90ea655f0be82)

2. To fetch dependecies
```bash
yarn install
```

3. Kinja-components lives in [Storybook](https://storybook.js.org/). It provides a development environment and an overview of components & docs. To start storybook locally:
```bash
yarn start
```

4. To access the local server, enter the following URL into your web browser:
```
http://localhost:8001/
```


## Directory Structure

Directory | Description
--------- | -----------
.scripts   | Scripts accessible through `yarn`
.storybook | `react-storybook` configuration (aliased to `config/storybook`)
components | Component inventory
config     | General configuration
  — locales| Localization translation files
doc  | Additional documentation
utils      | Shared helpers for logic that can be used across components

File | Description
---- | -----------
.babelrc       | Root babel configuration for all sub-directories
.editorconfig  | Editor configuration
.stylelintrc   | Stylelint configuration
humans.txt     | Add yourself! `yarn humans:add:self`
jest.config.js | Configuration for Jest test suite


## Learn More

- [Contributing](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/CONTRIBUTING.md)
- [Kinja Design Kit](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/DESIGNKIT.md)
