import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import AddIcon from "@material-ui/icons/Add";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";

import { slideAddToCurrentSlides, slideDelete } from "actions/slides";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",
  },
  imageActions: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: theme.palette.background.default,
    opacity: 1,
    width: "100%",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SlideCard(props) {
  const dispatch = useDispatch();
  const { slide, ...rest } = props;
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleOpenModalSlide = (image) => {
    Swal.fire({
      width: 800,
      height: 500,
      imageUrl: image,
      imageWidth: "90%",
      imageHeight: "90%",
      imageAlt: "Custom image",
    });
  };

  return (
    <Card
      {...rest}
      className={classes.root}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <CardMedia height="170" image={slide.image} component="img" />
      <div
        style={{ display: show ? "block" : "none" }}
        className={classes.imageActions}
      >
        <CardActions disableSpacing>
          <Tooltip title="Añadir a slides actuales" placement="bottom">
            <IconButton
              onClick={() => dispatch(slideAddToCurrentSlides(slide))}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar de mi galeria" placement="bottom">
            <IconButton onClick={() => dispatch(slideDelete(slide.id))}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ver slide en pantalla completa" placement="bottom">
            <IconButton onClick={() => handleOpenModalSlide(slide.image)}>
              <FullscreenIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </div>
    </Card>
  );
}
