(()=>{

// requests as promise
const request = (url) => {
	return new Promise((res, rej) => {
		const xhr = new XMLHttpRequest();
		xhr.addEventListener('load', (_evt) => {
			if (xhr.status >= 200 && xhr.status < 300) {
				res(xhr.response);
			} else {
				rej({status: xhr.status, statusText: xhr.statusText});
			}
		});
		xhr.addEventListener('error', (_evt) => {
			rej({status: xhr.status, statusText: xhr.statusText});
		});
		xhr.responseType = 'text';
		xhr.overrideMimeType('text/plain;charset=utf-8');
		xhr.open('GET', url);
		xhr.setRequestHeader('Cache-Control', 'no-cache');
		xhr.send();
	});
};

const string_hash = (str) => {
	let h = 123;
	for (let i = 0; i < str.length; i++) h = ((h << 5) + h) + str.charCodeAt(i);
	return h;
}

const query_attrs = (tag, attr) => {
	return Array.from(document.querySelectorAll(tag))
		.map((i) => i.getAttribute(attr)).filter((i) => i !== null);
};

const document_hash = async () => {
	let res = query_attrs('script.pollchange, img.pollchange', 'src')
		.concat(query_attrs('link.pollchange', 'href'));
	res.push(document.location.href);
	// console.log('hashing', res);
	let h = 0;
	for (let url of res) h += string_hash(await request(url));
	return h;
};

window.reload_on_change = (seconds) => {
	let current_hash = null;
	// console.log('register reload');
	document_hash().then((h) => current_hash = h);
	// periodically check if changed
	window.setInterval(async () => {
		const hash = await document_hash();
		// console.log('reload', current_hash, hash);
		if (current_hash !== hash) document.location.reload(true); // true: no cache
	}, (seconds || 1) * 1000);
};

})();
