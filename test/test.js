var assert = require('assert');
var rollup = require('rollup');
var path = require('path');
var string = require('..');

process.chdir(__dirname);

describe('rollup-plugin-string', function () {
	it('converts string', function () {
		return rollup.rollup({
			entry: 'samples/basic/main.js',
			plugins: [
				string({
					extensions: ['.html', '.css']
				})
			]
		}).then( function ( bundle ) {
			var generated = bundle.generate();
			var code = generated.code;

			var fn = new Function('assert', code);
			fn(assert);
		});
	});
});
