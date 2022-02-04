import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FilterTextLikeRadio from './FilterTextLikeRadio';
import filter from 'assets/config/filter.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
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

export default function SimpleAccordion() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      {
        filter.categoryId.map(categoryId => {
          return (
            categoryId["1"].filterTextLike.list.map(filterItem => {
              return (
                <FilterTextLikeRadio filterItem={filterItem} key={filterItem.identifier} />
              )
            })
          );
        })
      }
      <FilterGrid />
      <FilterGrid />
      <FilterGrid />
      <FilterGrid />
      <FilterGrid />
      <FilterGrid />
    </div>
  );
}

function FilterGrid() {
	const classes = useStyles();
	const [accordion, setAccordion] = useState(true)
	return (
		<Accordion expanded={accordion} onChange={() => setAccordion(prev => !prev)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
	);
}