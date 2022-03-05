import React, { useState } from 'react';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import InputRadio from './InputRadio';
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
  }
}));

export default function FilterTextLike(props) {
  const { filterItem } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

	const [accordion, setAccordion] = useState(false);
  const [selected, setSelected] = useState(() => {
    const parsed = queryString.parse(location.search);
    let isOnUrl = Object.hasOwnProperty.bind(parsed)(filterItem.name.toLowerCase());
    if (isOnUrl) {
      return parsed[filterItem.name.toLowerCase()];
    } else {
      return 'Todos';
    }
  });


  const onFilter = () => {

    const parsed = queryString.parse(history.location.search);
    const nameProp = filterItem.identifier;

    
    if (selected !== 'Todos') {
      parsed[nameProp] = selected;
      let query = queryString.stringify(parsed);
      history.push(history.location.pathname + '?' + query);
    } else {
      parsed[nameProp] = undefined;
      let query = queryString.stringify(parsed);
      history.push(history.location.pathname + '?' + query);
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