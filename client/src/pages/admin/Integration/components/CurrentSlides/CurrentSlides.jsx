import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";

import { slideLoadCurrentSlides } from "actions/slides";
import { Carousel } from "components";
import ModalOrderSlide from "./ModalOrderSlide.jsx";

const useStyles = makeStyles((theme) => ({
  root: {},
  actions: {
    marginBottom: theme.spacing(3),
  },
}));

export default function CurrentSlides() {
  const dispatch = useDispatch();
  const { slideCurrentSlides } = useSelector((state) => state.slides);
  const {
    uiLoadingCurrentSlides: { error },
  } = useSelector((state) => state.ui);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (slideCurrentSlides.length === 0) {
      dispatch(slideLoadCurrentSlides());
    }
  }, [dispatch, slideCurrentSlides.length]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.actions}
      >
        <Typography variant="h2">Slides Actuales</Typography>
        <Button
          onClick={handleOpen}
          color="primary"
          variant="contained"
          size="medium"
        >
          Editar Orden
        </Button>
        <ModalOrderSlide
          handleClose={handleClose}
          open={open}
          slides={slideCurrentSlides}
          setOpen={setOpen}
        />
      </Box>
      <div>
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>Error al cargar los slides. </strong>
          </Alert>
        ) : (
          <div>
            <Carousel adminPanel={true} slides={slideCurrentSlides} />
          </div>
        )}
      </div>
    </div>
  );
}
