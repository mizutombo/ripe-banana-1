function parseBody(req) {
	return new Promise((resolve, reject) => {
		let body = '';
		req.on('data', data => body += data);
		req.on('error', err => reject(err));
		req.on('end', () => {
			const body = JSON.parse(body);
			resolve(body);
		});
	});
}

module.exports = parseBody;