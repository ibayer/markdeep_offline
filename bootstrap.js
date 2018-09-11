const jsscript = (src) => document.write(`<script class='pollchange' src='${src}'></script>`);
const linkcss = (src) => document.write(`<link class='pollchange' rel='stylesheet' href='${src}'>`);

// markdeep
if (!window.markdeepOptions) markdeepOptions = {}; // honor previous setting
markdeepOptions.mode = 'script'; // no processing
markdeepOptions.detectMath = false; // using katex
// console.log(markdeepOptions);
jsscript('markdeep/markdeep.min.js');

// katex
linkcss('katex/katex.min.css');
jsscript('katex/katex.min.js');
jsscript('katex/contrib/auto-render.min.js');

// pseudocode
window.psopt = {lineNumber: true, commentDelimiter: ' -- ', noEnd: true};
linkcss('pseudocode/pseudocode.min.css');
jsscript('pseudocode/pseudocode.min.js');

// autoload
jsscript('autoload.js');

// default styles
linkcss('body.css');
linkcss('markdown.css');
linkcss('header.css');
linkcss('highlight.css');

document.addEventListener('DOMContentLoaded', (_evt) => {
	let m = document.querySelector('textarea.md');
	m.outerHTML = markdeep.format(m.textContent, false);
	m = document.querySelector('span.md'); // refresh, since outer changed
	renderMathInElement(m);
	// Find pseudocode blocks, sadly the language tag is not passed on.  Walk
	// all listings and have a look at the first line.
	for (let algo of m.querySelectorAll('pre.listing')) {
		const pc = algo.textContent;
		if (!pc.startsWith('\\begin{algorithm}')) continue;
		// replace the original with a `div`
		const div = document.createElement('div');
		pseudocode.render(algo.textContent, div, psopt);
		algo.outerHTML = div.outerHTML;
	}
	reload_on_change(1);
});
