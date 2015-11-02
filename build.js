var rollup = require('rollup').rollup;
var babel = require('rollup-plugin-babel');

rollup({
	entry: 'src/index.js',
	plugins: [babel()]
}).then(function (bundle) {
	return Promise.all([
		bundle.write({
			dest: 'dist/rollup-plugin-string.cjs.js',
			format: 'cjs'
		}),
		bundle.write({
			dest: 'dist/rollup-plugin-string.es6.js',
			format: 'es6'
		})
	]);
}).then(function () {
	console.log('Success!');
}).catch(function (err) {
	console.log(err.toString());
});
