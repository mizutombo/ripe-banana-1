function parseBody(req) {
	return new Promise((resolve, reject) => {
		let body = '';
		req.on('data', data => body += data);
		req.on('error', err => reject(err));
		req.on('end', () => {
			const film = JSON.parse(body);
			resolve(film);
		});
	});
}

module.exports = parseBody;