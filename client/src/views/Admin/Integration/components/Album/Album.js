import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import SlideCard from "./SlideCard";
import image from "assets/default.png";
import Skeleton from "@material-ui/lab/Skeleton";

import { slideAddMoreAllSlides } from "actions/slides";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "relative",
  },
  showMoreButton: {
    opacity: 0.5,
    backgroundColor: "#000",
    zIndex: 10,
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
    },
  },
  imageActions: {
    position: "absolute",
    left: 0,
    top: 0,
  },
});

export default function ImgMediaCard(props) {
  const dispatch = useDispatch();
  const { showMoreButton, getMoreSlides, ...rest } = props;
  const {
    uiLoadingAllSlides: { isLoading },
    uiIsUploadingSlide,
  } = useSelector((state) => state.ui);
  const { slideQuery } = useSelector((state) => state.slides);
  const classes = useStyles();

  const orderedSlides = props.slides.sort((a, b) => {
    return new Date(b.updatedAt.date) - new Date(a.updatedAt.date);
  });

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Skeleton variant="rect" height={170} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Skeleton variant="rect" height={170} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Skeleton variant="rect" height={170} />
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <Grid {...rest} container spacing={2}>
        {orderedSlides.map((slide) => {
          return (
            <Grid key={slide.id} item xs={12} sm={6} md={4} lg={3}>
              <SlideCard slide={slide} />
            </Grid>
          );
        })}
        {showMoreButton ? (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <div
              style={
                isLoading || uiIsUploadingSlide
                  ? { cursor: "not-allowed" }
                  : null
              }
            >
              <Card
                className={classes.root}
                style={
                  isLoading || uiIsUploadingSlide
                    ? { pointerEvents: "none" }
                    : null
                }
                onClick={() => {
                  if (isLoading || uiIsUploadingSlide) return null;
                  dispatch(
                    slideAddMoreAllSlides(
                      `?order=DESC&from=${slideQuery.from}&limit=${slideQuery.limit}`
                    )
                  );
                }}
              >
                <Tooltip title="Ver mas slides" placement="bottom">
                  <div className={classes.showMoreButton}>
                    <CardMedia component="img" height="170" image={image} />
                  </div>
                </Tooltip>
              </Card>
            </div>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}
