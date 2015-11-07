import tpl from './tpl.html';

assert.is(tpl.replace(/\r\n/g, '\n'), [
	'<section class="section">',
	'	<article class=\'article\'>Article 1</article>',
	'	<article class=\'article\'>Article 2</article>',
	'</section>\n'
].join('\n'));
