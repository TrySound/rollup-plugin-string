import tpl from './tpl.html';

assert.equal(tpl, [
	'<section class="section">',
	'	<article class=\'article\'>Article 1</article>',
	'	<article class=\'article\'>Article 2</article>',
	'</section>\n'
].join('\n'));
