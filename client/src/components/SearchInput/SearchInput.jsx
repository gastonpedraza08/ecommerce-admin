import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Paper, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "4px",
    alignItems: "center",
    padding: theme.spacing(1),
    display: "flex",
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "-0.05px",
    width: '100%'
  },
  form: {
  	width: '100%',
  }
}));

const SearchInput = (props) => {
  const { className, onChange, onSubmit, style, ...rest } = props;

  const classes = useStyles();

  return (
    <Paper {...rest} className={clsx(classes.root, className)} style={style}>
      <SearchIcon className={classes.icon} />
      <form onSubmit={onSubmit} className={classes.form}>
	      <Input
	        {...rest}
	        className={classes.input}
	        disableUnderline
	        onChange={onChange}
	      />
      </form>
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default SearchInput;
