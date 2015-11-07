import test from 'ava';
import { rollup } from 'rollup';
import string from '..';

process.chdir(__dirname);

test(t => {
	return rollup({
		entry: 'samples/basic/main.js',
		plugins: [
			string({
				extensions: ['.html', '.css']
			})
		]
	}).then(bundle => {
		var code = bundle.generate().code;
		var fn = new Function('assert', code);
		fn(t);
	});
});
