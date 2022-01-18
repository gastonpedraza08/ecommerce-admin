import React from "react";
import clsx from "clsx";
import { Bar } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { makeStyles } from "@material-ui/styles";

import { data, options } from "./chart";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: "relative",
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

export default function LatestSales(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Button size="small" variant="text">
            Last 7 days <ArrowDropDownIcon />
          </Button>
        }
        title="Latest Sales"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
