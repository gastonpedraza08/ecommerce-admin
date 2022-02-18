import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FilterTextLikeRadio from './FilterTextLikeRadio';
import FilterSwitch from './FilterSwitch';
import FilterPrice from './FilterPrice';
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

export default function SimpleAccordion() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <>
        <FilterPrice />
      </>
      <>
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
      </>
      <>
        {
          filter.categoryId.map(categoryId => {
            return (
              categoryId["1"].filterSwitch.list.map(filterItem => {
                return (
                  <FilterSwitch filterItem={filterItem} key={filterItem.name} />
                )
              })
            );
          })
        }
      </>
    </div>
  );
}