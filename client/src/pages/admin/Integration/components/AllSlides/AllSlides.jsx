import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";

import Album from "../Album";
import UploadSlidesButton from "./UploadSlidesButton.jsx";

import { slideLoadAllSlides } from "actions/slides";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(7),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  uploadButton: {
    marginTop: theme.spacing(4),
  },
  error: {
    marginTop: theme.spacing(4),
    minHeight: theme.spacing(4),
  },
}));

export default function AllSlides() {
  const { slides, slideThereIsMoreSlides } = useSelector(
    (state) => state.slides
  );
  const { uiLoadingAllSlides, uiLoadingMoreAllSlides } = useSelector(
    (state) => state.ui
  );

  const dispatch = useDispatch();

  useEffect(() => {
  	if(slides.length===0) {
	    dispatch(
	      slideLoadAllSlides(
	        `?order=DESC&orderBy=id&from=${1}&limit=${
	          process.env.REACT_APP_ADMIN_SLIDES_QUERY_LIMIT
	        }`
	      )
	    );
  	}
  }, [dispatch, slides.length]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h2" className={classes.title}>
          Tus Slides
        </Typography>
      </div>
      {uiLoadingAllSlides.error ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Error al cargar los slides. </strong>
        </Alert>
      ) : (
        <div>
          <Album slides={slides} showMoreButton={slideThereIsMoreSlides} />
          <UploadSlidesButton className={classes.uploadButton} />
        </div>
      )}
      <div className={classes.error}>
        {uiLoadingMoreAllSlides.error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>Error al cargar los slides. </strong>
          </Alert>
        ) : null}
      </div>
    </div>
  );
}
