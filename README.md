# rollup-plugin-string

Import text files as strings

```js
import tpl from './tpl.html';
console.log( `Template for render: ${tpl}` );
```

## Install

```sh
npm i rollup-plugin-string -D
```

## Usage

```js
import { rollup } from 'rollup';
import string from 'rollup-plugin-string';

rollup({
	entry: 'main.js',
	plugins: [
		string({
			extensions: ['.html']
		})
	]
});
```

## Options

### extensions

Required. Type: `array`

Specifies which files should be converted to string

# License

MIT © [Bogdan Chadkin](mailto:trysound@yandex.ru)
