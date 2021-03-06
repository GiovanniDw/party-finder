const request = require('apicalypse').default;

const requestOptions = {
	queryMethod: 'body',
	method: 'get',
	baseURL: 'https://api-v3.igdb.com',
	headers: {
		'Accept': 'application/json',
		'user-key': process.env.API_KEY
	},
	responseType: 'json'
};
exports.findPopular = async () => {
	try {
		const response = await request(requestOptions)
			.fields('name,cover,rating,release_dates,platforms,popularity')
			.limit(10)
			// .sort('rating desc')
			.sort('popularity desc')
			.where('platforms = (48,49,6)')
			.request('/games');

		return response.data;

	} catch (err) {
		throw new Error('Nope...');
	}
};

exports.searchGames = async (query) => {
	try {
		const response = await request(requestOptions)
			.fields('name,cover,platforms')
			.limit(10) // limit to 50 results
			.search(query)

			.request('/games');

		return response.data;
	} catch (err) {
		throw new Error('Nope...');
	}
};

exports.findCover = async (id, size) => {
	try {
		const response = await request(requestOptions)
			.fields('image_id')
			.limit(1) // limit to 50 results
			.where(`id =${id}`)
			.request('/covers');
		const cover = response.data[0];
		let findCover = `https://images.igdb.com/igdb/image/upload/t_${size}/${cover.image_id}.png`;
		return findCover;
	} catch (err) {
		let findCover = '/images/add-game.png';
		return findCover;
	}
};
exports.findGameId = async (id) => {
	try {
		const response = await request(requestOptions)
			.fields('name, cover')
			.limit(1) // limit to 50 results
			.where(`id =${id}`)
			.request('/games');
		return response.data;
	} catch (err) {
		throw new Error('Nope...');
	}
};
