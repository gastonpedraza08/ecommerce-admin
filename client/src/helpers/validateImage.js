export const validateImage = (file, validFileExtensions) => {
	return new Promise((resolve, reject) => {
		const url = window.URL || window.webkitURL;
		let image = new Image();
		image.onload = function() {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function() {
				const fileType = reader.result.split(';')[0].split('/')[1];
				if (!validFileExtensions.includes(fileType)) {
					resolve({
						error: `Solo formato de archivos ${validFileExtensions.join(" ")}`,
						base64: null,
						fileType: null
					});
				} else {
					resolve({
						error: null,
						base64: reader.result,
						fileType
					});
				}
			};
		};
		image.onerror = function() {
			URL.revokeObjectURL(url);
			resolve({
				error: `El archivo no es una imagen`,
				base64: null,
				fileType: null
			});
		};
		image.src = url.createObjectURL(file);
	});
};
