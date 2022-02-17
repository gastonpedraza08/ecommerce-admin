import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import InputRadio from './InputRadio';


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

export default function FilterTextLike(props) {
  const classes = useStyles();
  const history = useHistory();
	const [accordion, setAccordion] = useState(true);
  const [selected, setSelected] = useState('Todos');
  const { filterItem } = props;

  const onFilter = () => {
    let fullLocation = history.location.pathname + history.location.search;

    const nameProp = filterItem.name.toLowerCase();
    const newQuery = nameProp + '=' + selected;

    let regexp = new RegExp('&' + nameProp + '=');
    let isFiltered = regexp.test(history.location.search);

    let regexpValue = new RegExp('&' + nameProp + '=[^&]+');
    
    if (selected !== 'Todos') {
      if (!isFiltered) {
        history.push(fullLocation + '&' + newQuery);
      } else {
        fullLocation = fullLocation.replace(regexpValue, '&' + nameProp + '=' + selected);   
        history.push(fullLocation);
      }
    } else {
      fullLocation = fullLocation.replace(regexpValue, '');   
      history.push(fullLocation);
    }
  }

  return (
	  <Accordion expanded={accordion} onChange={() => setAccordion(prev => !prev)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>{filterItem.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <InputRadio 
          values={filterItem.values}
          selected={selected}
          setSelected={setSelected}
        />
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