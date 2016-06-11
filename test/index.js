var assert = require('assert');
var { rollup } = require('rollup');
var string = require('../');

process.chdir('test');

function makeBundle(entry, options) {
	return rollup({
		entry,
		plugins: [string(options)]
	});
}

describe('rollup-plugin-string', () => {
	it('should stringify importing template', () => {
		return makeBundle('fixtures/basic.js', {
			include: '**/*.html'
		}).then(bundle => {
			const { code } = bundle.generate({
				format: 'iife',
				moduleName: 'tpl'
			});
			new Function('assert', code)(assert);
		});
	});

	it('throws when include is not specified', () => {
		assert.throws(() => {
			makeBundle('fixtures/basic.js')
		}, /include option should be specified/);
	});
});
