import React, { useState } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import { Accordion, AccordionSummary } from './shared.jsx';

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
    const parsed = queryString.parse(history.location.search);

    parsed.min_price = prices.min;
    parsed.max_price = prices.max;

    let query = queryString.stringify(parsed);
    return history.push(history.location.pathname + '?' + query);
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