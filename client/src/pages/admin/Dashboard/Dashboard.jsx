import React from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/styles";

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders,
} from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <Budget />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <TotalUsers />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <TasksProgress />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <TotalProfit />
        </Grid>
        <Grid item xs={12} md={12} lg={8} xl={9}>
          <LatestSales />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <UsersByDevice />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <LatestProducts />
        </Grid>
        <Grid item xs={12} md={12} lg={8} xl={9}>
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
}
