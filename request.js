const request = (opt) => {
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
		xhr.responseType = opt.type || 'text';
		if (opt.mime) xhr.overrideMimeType(opt.mime);
		xhr.open(opt.method || 'GET', opt.url);
		xhr.setRequestHeader('Cache-Control', 'no-cache');
		xhr.send();
	});
};
