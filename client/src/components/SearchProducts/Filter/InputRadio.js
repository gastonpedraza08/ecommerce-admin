import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 10,
    height: 10,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 10,
      height: 10,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
  show: {
    height: 'auto',
    zIndex: 1
  },
  hide: {
    height: 0,
    zIndex: -1
  },
  buttonShowMore: {
    cursor: 'pointer',
    color: 'blue'
  }
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function InputRadio(props) {
  const classes = useStyles();
  const [show, setShow] = useState(10);
  const { values, setSelected, selected } = props;

  const handleChange = e => {
    setSelected(e.target.value);
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup onChange={handleChange} value={selected} name="customized-radios">
      <FormControlLabel value="Todos" control={<StyledRadio />} label="Todos" />
      {
        values.slice(0, show ? values.length : 10).map((value, i) => {
          return (
            <FormControlLabel 
              key={value} 
              value={value} 
              control={<StyledRadio />} 
              label={value}
            />
          )
        })
      }
      </RadioGroup>
      <p 
        onClick={() => setShow(prev => !prev)}
        className={classes.buttonShowMore}
      >
        Show {show ? "less" : "more"}
      </p>
    </FormControl>
  );
}
