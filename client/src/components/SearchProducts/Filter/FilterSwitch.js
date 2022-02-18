import React, { useState } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import InputSwitch from './InputSwitch';

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
  container: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  enableContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  }
}));

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

export default function FilterSwitch(props) {
  const { filterItem } = props;

  const classes = useStyles();
  const history = useHistory();

  const [enabled, setEnabled] = useState(true);
	const [accordion, setAccordion] = useState(false);
  const [valuesState, setValuesState] = useState(() => {
    const obj = {};
    let val = filterItem.values;
    for (let i=0; i<val.length; i++) {
      obj[val[i].identifier] = val[i].defaultSelected;
    }
    return obj;
  });


  const onFilter = () => {
    if (enabled) {
      const parsed = queryString.parse(history.location.search);
      for (let prop in valuesState) {
        parsed[prop] = undefined;
      }
      let query = queryString.stringify(parsed);
      return history.push(history.location.pathname + '?' + query);
    }    

    let fullLocation = history.location.pathname + history.location.search;
    let newParams = '';
    for (let prop in valuesState) {
      let value = valuesState[prop] ? 'Sí' : 'No';
      newParams += '&' + prop + '=' + value;
    }

    history.push(fullLocation + newParams);
  }

  const onSwitch = identifier => {
    setValuesState(prev => ({
      ...prev,
      [identifier]: !prev[identifier]
    }));
  }

  const onCheckboxChange = () => {
    setEnabled(prev => !prev);
  }

  return (
	  <Accordion expanded={accordion} onChange={() => setAccordion(prev => !prev)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>{filterItem.name}</Typography>
      </AccordionSummary>
      <div className={classes.enableContainer} >
        {/* enable button */}
        <FormControl component="fieldset">
          <FormGroup aria-label="position">
            <FormControlLabel
              value="end"
              checked={!enabled}
              control={<Checkbox onChange={onCheckboxChange} color="primary" />}
              label="Habilitado"
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>
        {/* enable button */}
        
      </div>
      <AccordionDetails>
        <FormControl component="fieldset">
          <FormGroup className={classes.container} >
            {
              filterItem.values.map(item => {
                return (
                  <InputSwitch 
                    filter={item}
                    checked={valuesState[item.identifier]}
                    key={item.identifier} 
                    onSwitch={onSwitch}
                    enabled={enabled}
                  />
                );
              })
            }
          </FormGroup>
        </FormControl>
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