import React, { useState } from 'react';
import Masonry from 'react-masonry-css'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import config from 'assets/config/productView';

import './index.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 100,
  },
  root: {
    overflow: 'hidden'
  },
  seeMoreButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    '& svg': {
      color: '#3483fa!important'
    }
  },
  seeMoreButton: {
    cursor: 'pointer',
    color: '#3483fa!important',
    display: '-webkit-inline-flex',
    fontSize: '14px',
    fontWeight: '400',
  },
  arrowDown: {
    border: `solid #3483fa`,
    borderWidth: "0 2px 2px 0",
    display: "inline-block",
    padding: "2px",
    transform: "rotate(45deg)",
    marginLeft: "3px",
  }
}));

export default function CustomizedTables(props) {

  const { product } = props;
  const [height, setHeight] = useState(250);
  const [showButton, setShowButton] = useState(true);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div>
      <div
        className={classes.root}
        style={{
          height
        }}
      >
        <Masonry
          breakpointCols={isMobile ? 1 : 2}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {
            Object.keys(config).map(infotype => {
              if (config[infotype].name === 'Información Básica del Producto') {
                return null
              }
              return (
                <div key={infotype}>
                  <h3 style={{marginBottom: 8}}>{config[infotype].name}</h3>
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
      {
        showButton ?
        (
          <div
            className={classes.seeMoreButtonContainer}
          >
            <span 
              onClick={() => {
                setHeight('auto');
                setShowButton(false);
              }}
              className={classes.seeMoreButton}
            >
              Ver más características
            </span><ArrowDownwardIcon fontSize="small" />
          </div>
        ) : (null)
      }
    </div>
  );
}
