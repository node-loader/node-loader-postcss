# @node-loader/postcss

A [nodejs loader](https://nodejs.org/dist/latest-v13.x/docs/api/esm.html#esm_experimental_loaders) for [postcss](https://postcss.org/). This allows you to load CSS files into NodeJS programs by converting them into Javascript modules. The returned ES module has a `default` property whose value is the compiled CSS string.

## Installation

```sh
npm install --save @node-loader/postcss
```

Node 16.12 changed the hooks used in NodeJS loaders. If using Node<16.12, use `@node-loader/postcss@1`. Otherwise, use `@node-loader/postcss@latest`.

## Usage

Create a `postcss.config.js` file in your current working directory. Now run node with the `--loader` (or `--experimental-loader` for older NodeJS version) flag:

```sh
node --loader @node-loader/postcss file.js
```

Now you can import CSS files as ES modules in your NodeJS project:

```js
import cssString from "./main.css";

console.log(
  "After PostCSS processing, the main.css file content is",
  cssString
);
```

## Configuration

By default, node-loader postcss looks for a configuration file called `postcss.config.js` in the current working directory. To specify the file path to the configuration file, provide the `POSTCSS_CONFIG` environment variable:

```sh
POSTCSS_CONFIG=/Users/name/some/dir/.postcssrc node --loader @node-loader/postcss file.js
```

## Composition

If you wish to combine postcss loading with other NodeJS loaders, you may do so by using [node-loader-core](https://github.com/node-loader/node-loader-core).
