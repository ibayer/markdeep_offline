(() => {

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
jsscript('request.js');
jsscript('autoload.js');

// default styles
linkcss('markdeep/body.css');
linkcss('markdeep/header.css');
linkcss('markdeep/markdown.css');
linkcss('markdeep/highlight.css');

const process = (node) => {
	// root
	const div = document.createElement('div');
	div.innerHTML = markdeep.format(node.textContent, false);
	node.parentNode.insertBefore(div, node);
	node.parentNode.removeChild(node);
	// post processing
	renderMathInElement(div);
	// Find pseudocode blocks, sadly the language tag is not passed on.  Walk
	// all listings and have a look at the first line.
	for (let algo of div.querySelectorAll('pre.listing')) {
		const pc = algo.textContent;
		if (!pc.startsWith('\\begin{algorithm}')) continue;
		// replace the original with a `div`
		const div = document.createElement('div');
		pseudocode.render(algo.textContent, div, psopt);
		algo.outerHTML = div.outerHTML;
	}
	return div;
};

let root;
const reload = () => {
	request({
		url: document.location.href,
		type: 'document',
		mime: 'text/html'
	})
		.then((doc) => {
			root.innerHTML = process(doc.querySelector('.md')).innerHTML;
		}, (err) => consolo.log('err', err));
};

document.addEventListener('DOMContentLoaded', (_evt) => {
	on_source_change(1, reload);
	root = process(document.querySelector('.md'));
});

})();
