var assert = require('assert');
var rollup = require('rollup');
var string = require('..');

process.chdir(__dirname);

describe('rollup-plugin-string', function (t) {
	it('should import string', function () {
		return rollup.rollup({
			entry: 'samples/basic/main.js',
			plugins: [
				string({
					extensions: ['.html', '.css']
				})
			]
		}).then(function (bundle) {
			var code = bundle.generate().code;
			var fn = new Function('assert', code);
			fn(assert);
		});
	});
});
