document.addEventListener('DOMContentLoaded', (_evt) => {
	if (window.alreadyProcessedMarkdeep) {
		const a = document.createElement('i');
		a.innerHTML = `(<a href='http://casual-effects.com/markdeep/latest/' style='color:#999'>update</a>,
<a href='http://casual-effects.com/markdeep/features.md.html' style='color:#999'>docu</a>);
<a href='https://katex.org/' style='color:#999'>KaTeX ${window.katex.version}</a>
(<a href='https://github.com/Khan/KaTeX/releases' style='color:#999'>update</a>,
<a href='https://katex.org/docs/supported.html' style='color:#999'>docu</a>)
and <a href='https://github.com/tatetian/pseudocode.js#features' style='color:#999'>pseudocode.js</a>`;
		document.querySelector('.markdeepFooter').appendChild(a);
	}
});
