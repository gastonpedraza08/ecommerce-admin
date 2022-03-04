import React from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { CustomRouterLink } from "components";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function Main(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box component={CustomRouterLink} to="/admin/integration/slides">
            <Card>
              <CardContent>
                <Typography variant="h3">Slides</Typography>
                <Typography variant="body1">
                  Administra las Slides de la página principal.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component={CustomRouterLink} to="/admin/integration/products">
            <Card>
              <CardContent>
                <Typography variant="h3">Productos</Typography>
                <Typography variant="body1">
                  Administra las Secciones y Productos de la página principal.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
