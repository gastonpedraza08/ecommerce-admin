import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

import { validateImage } from './validateImage';
import { uploadFile } from './s3';

export const uploadMultiFilesToS3 = async (files) => {
	let images = [];
	let imagesError = [];
	for (let i = 0; i < files.length; i++) {
		const { base64, error, fileType } = await validateImage(files[i], [
			'jpg',
			'png',
			'jpeg',
		]);
		if (error) {
			imagesError.push(files[i].name);
		} else {
			images.push({ base64, fileType });
		}
	}
	if (imagesError.length !== 0) {
		Swal.fire({
			icon: 'error',
			title: 'Solo formato de archivos jpg png jpeg',
			text: 'No se pudo subir ' + imagesError.join(' '),
		});
	}

	let promises = [];

	for (let i = 0; i < images.length; i++) {
		promises.push(uploadFile(images[i].base64, uuidv4() + '.' + images[i].fileType));
	}

	const result = await Promise.all(promises);
	return result.map(image => image.Location);
};
