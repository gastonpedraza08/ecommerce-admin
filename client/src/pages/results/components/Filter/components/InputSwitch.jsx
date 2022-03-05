import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  }
}));

const MySwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    marginRight: theme.spacing(1),
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);


export default function FormControlLabelPosition(props) {

  const { filter, onSwitch, checked, enabled } = props;
  const classes = useStyles();

  const handleChange = () => {
    onSwitch(filter.identifier);
  }

  return (
    <FormControlLabel
      className={classes.root}
      value={filter.identifier}
      control={
        <MySwitch
          disabled={enabled}
          color="primary" 
          onChange={handleChange} 
          checked={checked}
        />
      }
      label={filter.name}
      labelPlacement="end"
    />
  );
}