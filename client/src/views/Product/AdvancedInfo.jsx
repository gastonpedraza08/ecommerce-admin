import React from 'react';
import Masonry from 'react-masonry-css'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import config from 'assets/config/productView';

import './index.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

export default function CustomizedTables(props) {

  const { product } = props;
  const classes = useStyles();

  return (
    <div>
      <Masonry
        breakpointCols={2}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {
          Object.keys(config).map(infotype => {
            return (
              <div>
                <h3>{config[infotype].name}</h3>
                <TableContainer component={Paper}>
                  <Table className={classes.table}>
                    <TableBody>
                      {Object.keys(config[infotype].list).map((n) => {
                        if (product[n]) {
                          return (
                            <StyledTableRow key={n}>
                              <StyledTableCell component="th" scope="row">
                                {config[infotype].list[n].name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {product[n]}
                              </StyledTableCell>
                            </StyledTableRow>
                          )
                        } else {
                          return null;
                        }
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )
          })
        }
      </Masonry>
    </div>
  );
}
