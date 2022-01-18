import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';

import { uploadMultiFilesToS3 } from 'helpers/uploadMultiFiles';
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

export default function UploadAlbum(props) {
	const { images, setImages, setThumbnail, thumbnail } = props;
	const [isLoadingImages, setIsLoadingImages] = useState(false);
	const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false);
	const classes = useStyles();
	const inputRef = useRef(null);
	const inputThumbnailRef = useRef(null);
	return (
		<>
			<Typography varian="h6" gutterBottom>
				Elige la miniatura del producto
			</Typography>
			<Grid container alignItems="center" spacing={1}>
				<Grid item xs={4} sm={2} md={2}>
					{isLoadingThumbnail ? (
						<CircularProgress />
					) : (
						<Card
							className={classes.imageButtonContainer}
							onClick={() => inputThumbnailRef.current.click()}
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
							ref={inputThumbnailRef}
							onChange={async (e) => {
								setIsLoadingThumbnail(true);
								const result = await uploadMultiFilesToS3(
									e.currentTarget.files
								);
								setThumbnail(result[0]);
								setIsLoadingThumbnail(false);
							}}
						/>
					</div>
				</Grid>
				{thumbnail !== '' ? (
					<Grid item xs={4} sm={2} md={2}>
						<Card className={classes.imageContainer}>
							<CardMedia component="img" height="100" image={thumbnail} />
							<Tooltip title="Eliminar Imagen" placement="bottom">
								<div
									className={classes.deleteImageButton}
									onClick={(e) => {
										e.stopPropagation();
										setThumbnail('');
									}}
								>
									<DeleteIcon />
								</div>
							</Tooltip>
						</Card>
					</Grid>
				) : null}
			</Grid>
			<Typography varian="h6" gutterBottom style={{ marginTop: 10 }}>
				Agrega imagenes del producto
			</Typography>
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
							multiple="multiple"
							onChange={async (e) => {
								setIsLoadingImages(true);
								const result = await uploadMultiFilesToS3(
									e.currentTarget.files
								);
								setImages((prev) => prev.concat(result));
								setIsLoadingImages(false);
							}}
						/>
					</div>
				</Grid>
				{images.map((img) => {
					return (
						<Grid key={img} item xs={4} sm={2} md={2}>
							<Card className={classes.imageContainer}>
								<CardMedia component="img" height="100" image={img} />
								<Tooltip title="Eliminar Imagen" placement="bottom">
									<div
										className={classes.deleteImageButton}
										onClick={(e) => {
											e.stopPropagation();
											setImages(prev => {
												return prev.filter(image => image!==img);
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
