import React, { useState } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import InputSwitch from './InputSwitch';
import { Accordion, AccordionSummary } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  buttonFilterContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2)
  },
  inputForm: {
    width: '100%'
  },
  inputPrice: {
    width: theme.spacing(8)
  },
  inputsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(1)
  }
}));



export default function FilterSwitch(props) {
  const classes = useStyles();
  const history = useHistory();

	const [accordion, setAccordion] = useState(false);
  const [prices, setPrices] = useState({
    min: 0,
    max: 0
  });

  const onFilter = () => {
    console.log("filter")
  };

  const handleChange = prop => event => {
    if (isNaN(event.target.value)) {
      return null;
    }

    setPrices(prev => ({
      ...prev,
      [prop]: event.target.value
    }));
  }

  return (
	  <Accordion expanded={accordion} onChange={() => setAccordion(prev => !prev)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>Precio</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.inputsContainer} >
          <input 
            type="text" 
            onChange={handleChange('min')} 
            className={classes.inputPrice}
            placeholder="min"
            value={prices.min}
          />
          <span>-</span>
          <input 
            type="text" 
            onChange={handleChange('max')} 
            className={classes.inputPrice}
            placeholder="max"
            value={prices.max}
          />
        </div>
      </AccordionDetails>
        <div className={classes.buttonFilterContainer}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={onFilter}
          >
            Filtrar
          </Button>
        </div>
    </Accordion>
  );
}