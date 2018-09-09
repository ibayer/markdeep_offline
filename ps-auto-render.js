(()=>{
	const psopt = {lineNumber: true, commentDelimiter: ' -- ', noEnd: true};
	for (let algo of document.querySelectorAll('.pseudocode')) {
		// replace the original with a `div`
		const div = document.createElement('div');
		pseudocode.render(algo.textContent, div, psopt);
		const par = algo.parentNode;
		par.insertBefore(div, algo);
		par.removeChild(algo);
	}
})();
