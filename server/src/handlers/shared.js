const { uploadFile } = require('../services/external/s3');
const { v4: uuidv4 } = require('uuid');

const upload = async files => {
	let promises = [];

	for (let i = 0; i < files.length; i++) {
		promises.push(uploadFile(files[i].base64, files[i].name));
	}

	const result = await Promise.all(promises);
	let arrToReturn = result.map(obj => {
		return {
			name: obj.key,
			url: obj.Location
		}
	});

	return arrToReturn;
}

module.exports = {
	upload,
}