import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

export default function AccordionSection(props) {
  const { getToggleHideAllColumnsProps, allColumns } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Ver</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.list}>
            <div style={{ marginBottom: 5 }}>
              <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
              <Typography style={{ display: "inline", marginLeft: 5 }}>
                Toggle All
              </Typography>
            </div>
            <Grid spacing={2} container>
              {allColumns.map((column) => (
                <Grid item key={column.id}>
                  <label>
                    <input type="checkbox" {...column.getToggleHiddenProps()} />
                    <Typography style={{ display: "inline", marginLeft: 5 }}>
                      {column.Header}
                    </Typography>
                  </label>
                </Grid>
              ))}
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Filtrar</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            {allColumns.map((column) => (
              <Grid key={column.id} item {...column.getHeaderProps()}>
                {column.canFilter ? column.render("Filter") : null}
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
