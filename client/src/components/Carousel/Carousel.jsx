import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from '@material-ui/core';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { slideRemoveFromCurrent } from 'actions/slides';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    '&:hover #delete-button-current-carousel': {
      display: 'block'
    }
  },
  deleteButton: {
    display: 'none',
    position: 'absolute',
    top: 0,
    right: theme.spacing(5)
  },
  customIconButtom: {
    color: 'white'
  }
}));

export default function MyCarousel(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { slides, adminPanel, ...rest } = props;
  const {
    uiLoadingCurrentSlides: { isLoading },
  } = useSelector((state) => state.ui);
  const [loadedImage, setLoadedImage] = useState(false);

  let contentOptional = null;

  if (adminPanel) {
    contentOptional = function (slide) {
      return (
        <div id="delete-button-current-carousel" className={classes.deleteButton}>
          <Tooltip title="Eliminar de slides actuales" placement="bottom">
            <IconButton
              className={classes.customIconButtom}
              onClick={() => dispatch(slideRemoveFromCurrent(slide))}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    }
  }

  return (
    <div className={classes.root} >
      <Skeleton
        variant="rect"
        height={adminPanel ? 300 : 1000}
        style={{ display: isLoading && !loadedImage ? "block" : "none" }}
      />
      <Carousel
        {...rest}
        autoPlay
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        style={{ display: isLoading && !loadedImage ? "none" : "block" }}
      >
        {slides.map((slide) => {
          return (
            <div key={slide.id}>
              { contentOptional(slide) }
              <img
                alt=""
                src={slide.image}
                onLoad={() => setLoadedImage(true)}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
