import React, { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

import { validateImage } from 'helpers/validateImage';
import { uploadFiles } from 'helpers/uploadFiles';
import image from 'assets/default.png';

const useStyles = makeStyles((theme) => ({
	root: {},
	imageButtonContainer: {
		'&:hover': {
			filter: 'brightness(70%)',
			cursor: 'pointer',
		},
	},
	deleteImageButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 1000,
	},
	imageContainer: {
		'&:hover': {
			filter: 'brightness(70%)',
			cursor: 'pointer',
		},
	}
}));

const validImageTypes = ['jpg', 'png', 'jpeg'];

export default function UploadAlbum(props) {
	const { images, setImages, limit } = props;
	const [isLoadingImages, setIsLoadingImages] = useState(false);
	const classes = useStyles();
	const inputRef = useRef(null);

	const handleUploadFiles = async e => {
		setIsLoadingImages(true);
		let filesToUpload = [];
		let files = e.currentTarget.files;

		for (let i=0; i < files.length; i++) {
			const { base64, error, fileType } = await validateImage(files[i], validImageTypes);
			if (error) {
				setIsLoadingImages(false);
				return Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: 'Formato de Imagen invalido.',
				});
			}
			let file = {
				base64,
				name: uuidv4() + '.' + fileType
			};
			filesToUpload.push(file);
		}

		const result = await uploadFiles(filesToUpload);

		setImages((prev) => {
			let fullArr = prev.concat(result);
			if (fullArr.length > limit) {
				fullArr = fullArr.slice(-limit);
			}
			return fullArr;
		});
		setIsLoadingImages(false);
	}

	return (
		<>
			<Grid container alignItems="center" spacing={1}>
				<Grid item xs={4} sm={2} md={2}>
					{isLoadingImages ? (
						<CircularProgress />
					) : (
						<Card
							className={classes.imageButtonContainer}
							onClick={() => inputRef.current.click()}
						>
							<Tooltip title="Agregar Imagen" placement="bottom">
								<CardMedia component="img" height="100" image={image} />
							</Tooltip>
						</Card>
					)}
					<div style={{ display: 'none' }}>
						<input
							type="file"
							accept="image/*"
							ref={inputRef}
							multiple={limit === 1 ? undefined : "multiple"}
							onChange={handleUploadFiles}
						/>
					</div>
				</Grid>
				{images.map((img) => {
					return (
						<Grid key={img.url} item xs={4} sm={2} md={2}>
							<Card className={classes.imageContainer}>
								<CardMedia component="img" height="100" image={img.url} />
								<Tooltip title="Eliminar Imagen" placement="bottom">
									<div
										className={classes.deleteImageButton}
										onClick={(e) => {
											e.stopPropagation();
											setImages(prev => {
												return prev.filter(image => image.url!==img.url);
											});
										}}
									>
										<DeleteIcon />
									</div>
							</Tooltip>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}