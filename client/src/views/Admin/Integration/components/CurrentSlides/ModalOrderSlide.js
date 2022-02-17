import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { ReactSortable } from "react-sortablejs";
import { useDispatch } from "react-redux";

import { slideChangeOrder } from "actions/slides";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "10vh",
    left: "5vw",
    width: "90vw",
    height: "80vh",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    display: "block",
  },
  card: {
    display: "inline-block",
    minWidth: 150,
    maxWidth: 250,
    cursor: "move",
    margin: theme.spacing(1),
  },
}));

export default function SimpleModal({ open, handleClose, slides, setOpen }) {
  const dispatch = useDispatch();
  const [state, setState] = useState(slides);

  useEffect(() => {
    setState(slides);
  }, [slides]);

  const applyOrder = () => {
    const order = state.map((slide) => slide.id);
    setOpen(false);
    dispatch(slideChangeOrder(order));
  };

  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" gutterBottom>
          Arrastra las slides
        </Typography>
        <Button
          onClick={applyOrder}
          color="primary"
          variant="contained"
          size="medium"
        >
          Aplicar cambios
        </Button>
      </Box>
      <ReactSortable list={state} setList={setState} direction="horizontal">
        {state.map((slide) => {
          return (
            <Card key={slide.id} className={classes.card}>
              <CardMedia height="120" image={slide.image} component="img" />
            </Card>
          );
        })}
      </ReactSortable>
    </div>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      {body}
    </Modal>
  );
}
