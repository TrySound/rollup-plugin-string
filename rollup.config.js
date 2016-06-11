import buble from 'rollup-plugin-buble';

export default {
	entry: 'index.js',
	plugins: [buble()],
	targets: [
		{
			format: 'cjs',
			dest: 'dist/rollup-plugin-string.js'
		},
		{
			format: 'es6',
			dest: 'dist/rollup-plugin-string.mjs'
		}
	]
};
