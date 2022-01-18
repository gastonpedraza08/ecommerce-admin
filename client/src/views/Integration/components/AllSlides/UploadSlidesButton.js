import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { slideUpload } from "actions/slides";

const useStyles = makeStyles((theme) => ({
  root: {},
  moreButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function UploadSlidesButton(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  return (
    <div {...props}>
      <form style={{ display: "none" }}>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={(e) => dispatch(slideUpload(e.currentTarget.files[0]))}
        />
      </form>
      <div className={classes.actions}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => inputRef.current.click()}
        >
          Agregar Slides
        </Button>
      </div>
    </div>
  );
}
