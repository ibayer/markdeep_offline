(()=>{

const string_hash = (str) => {
	let h = 123;
	for (let i = 0; i < str.length; i++) h = ((h << 5) + h) + str.charCodeAt(i);
	return h;
}

const document_hash = async () => {
	return string_hash(await request({
		url: document.location.href,
		mime: 'text/plain;charset=utf-8'
	}));
};

window.on_source_change = (seconds, callback) => {
	// Periodically check if the document hash has changed.
	let current_hash = null;
	document_hash().then((h) => current_hash = h);
	window.setInterval(async () => {
		const hash = await document_hash();
		// console.log('reload?', current_hash, hash);
		if (current_hash !== hash) {
			callback();
			current_hash = hash;
		}
	}, (seconds || 1) * 1000);
};

})();
