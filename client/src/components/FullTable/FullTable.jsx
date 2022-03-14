import React, { useState, useEffect, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useTable } from "react-table";
import { makeStyles } from '@material-ui/styles';
import NativeSelect from "@material-ui/core/NativeSelect";
import { fetchWithoutToken } from 'helpers/fetch';
import queryString from 'query-string';
import Table from '@material-ui/core/Table';
import TextField from '@material-ui/core/TextField';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';

import { CustomRouterLink } from 'components';
import AccordionSection from 'components/AccordionSection';

const useStyles = makeStyles(theme => ({
	root: {},
	inputForm: {
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	filterContainer: {
		width: '90%',
		marginBottom: theme.spacing(5)
	},
	inputSelect: {
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2),
		width: 200
	},
	row: {
		marginBottom: theme.spacing(3),
    alignItems: 'center'
	},
	inputPageNumber: {
		width: 50
	},
  formControl: {
    minWidth: 120,
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  },
  viewButton: {
    color: theme.palette.primary.main
  },
  editButton: {
    color: theme.palette.secondary.main
  },
  accordionSection: {
    marginBottom: theme.spacing(3)
  }
}))

const UsersList = (props) => {

	const { 
    columns, 
    entity, 
    identifier,
    hasView,
    pathToView,
  } = props;

	const classes = useStyles();

  const [items, setItems] = useState([]);

  const [filterValues, setFilterValues] = useState(() => {
  	let obj = {};

  	for (let i=0; i<columns.length; i++) {
  		if (columns[i].customCanFilter) {
  			obj[columns[i].accessor] = columns[i].defaultValue;
  		}
  	}

  	return obj;
  });

  const itemsRef = useRef();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isDeleting, setIsDeleting] = useState(false);

  const pageSizes = [10, 25, 50, 100];

  itemsRef.current = items;

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = (event) => {

    let selectedItems;

    if (event.target.checked) {
      selectedItems = items.map((user) => user[identifier]);
    } else {
      selectedItems = [];
    }

    setSelectedItems(selectedItems);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelectedItems);
  };

  const onChangeFilterValues = (e, accessor) => {
    setFilterValues(prev => {
    	return {
    		...prev,
    		[accessor]: e.target.value
    	}
    });
  };

  const getRequestParams = (page, pageSize) => {
    let params = {};

    for (let prop in filterValues) {
    	if (filterValues[prop]) {
    		params[prop] = filterValues[prop]
    	}
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["limit"] = pageSize;
    }

    return params;
  };

  const retrieveItems = () => {
    const auxRetrrieveItems = async () => {
      const params = getRequestParams(page, pageSize);
      let query = queryString.stringify(params);
      const result = await fetchWithoutToken(entity + '?' + query, null, 'GET');
      if (!result.error) {
        const { count } = result.data;
        setItems(result.data[entity]);
        setCount(count);
        return null;
      } else {
        return console.log(result.error)
      }
    }
    auxRetrrieveItems();
  };

  useEffect(retrieveItems, [page, pageSize, entity]);

  const find = () => {
    setPage(1);
    retrieveItems();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const handleDeleteItems = async () => {
    setIsDeleting(true);
    const result = await fetchWithoutToken(entity + '/bulk/delete' , { ids: selectedItems }, 'DELETE');
    if (!result.error) {
      setItems(prev => {
        let newArr = [];
        for (let i=0; i<prev.length; i++) {
          if (!selectedItems.includes(prev[i][identifier])) {
            newArr.push(prev[i]);
          }
        }
        return newArr;
      });
      setCount(prev => prev - selectedItems.length);
      setIsDeleting(false);
      return null;
    } else {
      setIsDeleting(false);
      return console.log(result.error)
    }
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    getToggleHideAllColumnsProps,
    allColumns,
  } = useTable({
    columns,
    data: items,
  });

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.filterContainer}>
	        {
	        	columns.map(col => {
	        		return (
	        			<span key={col.accessor}>
	        				{
				        		col.customCanFilter ?
				        		(
				        			<>
				        				{
				        					/* Filter type text */
						        			col.filterType === 'text' ?
						        			(
									          <TextField
										          label={col.Header}
										          value={filterValues[col.accessor]}
										          onChange={(e) => onChangeFilterValues(e, col.accessor)}
										          variant="outlined"
										          className={classes.inputForm}
										        />
						        			)
						        			: 
						        			(
						        				/* Filter type select */
						        				col.filterType === 'select' ?
						        				(
                              <FormControl 
                                key={col.accessor} 
                                variant="outlined" 
                                className={classes.formControl}
                              >
                                <InputLabel htmlFor={col.accessor}>{col.Header}</InputLabel>
  										          <Select
                                  native
  										            value={filterValues[col.accessor]}
  										            onChange={(e) => onChangeFilterValues(e, col.accessor)}
  										            className={classes.inputSelect}
                                  label={col.Header}
                                  inputProps={{
                                    name: 'age',
                                    id: col.accessor
                                  }}
  										          >
                                  <option aria-label="None" value="" />
    										          {
    										          	col.optionsSelect.map(option => {
    										          		return (
    											              <option key={option.value} value={option.value}>
    											                {option.name}
    											              </option>
    										          		);
    										          	})
    										          }
  										          </Select>
                              </FormControl>
						        				) : (null)
						        			)
				        				}
				        			</>
				        		)
				        		: (null)
				        	}
	        			</span>
	        		);
	        })
	      }

          <div>
            <Button 
	            onClick={find}
	            color="primary" 
          		variant="contained"
	          >
	            Filtrar
	          </Button>
          </div>
        </div>
      </div>

      <div>
        <div>
          <Grid container className={classes.row}>
            <Grid item>
		          <Pagination
		            count={Math.ceil(count/pageSize)}
		            page={page}
		            siblingCount={1}
		            boundaryCount={1}
		            variant="outlined"
		            shape="rounded"
		            onChange={handlePageChange}
		          />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" style={{ margin: '0 10px' }}>
                Items per Page:{" "}
              </Typography>
            </Grid>
            <Grid item>
              <NativeSelect
                style={{ marginLeft: 10 }}
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </NativeSelect>
            </Grid>
          </Grid>
          <Grid container className={classes.row}>
          	<Grid item>
			        <div>
			          {"Go to page: "}
			          <input 
			          	type="number" 
			          	onChange={e => setPage(Number(e.target.value))} 
			          	className={classes.inputPageNumber}
			          />
			        </div>
          	</Grid>
            <Grid 
              item
              className={classes.marginLeft}
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteItems}
                disabled={isDeleting}
              >
                Delete
              </Button>
            </Grid>
            <Grid 
              item
              className={classes.marginLeft}
            >
              <Button variant="contained" onClick={retrieveItems}>Refrescar</Button>            
            </Grid>
          </Grid>
        </div>

        <div className={classes.accordionSection}>
          <AccordionSection 
            getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} 
            allColumns={allColumns}
            headerGroups={headerGroups}
          />
        </div>

        <TableContainer
          {...getTableProps()}
        >
          <Table>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.length === items.length}
                      color="primary"
                      indeterminate={
                        selectedItems.length > 0 &&
                        selectedItems.length < items.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    Actions
                  </TableCell>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow 
                    {...row.getRowProps()}
                    hover
                    key={row.original[identifier]}
                    selected={selectedItems.indexOf(row.original[identifier]) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.indexOf(row.original[identifier]) !== -1}
                        color="primary"
                        onChange={(event) => handleSelectOne(event, row.original[identifier])}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography 
                        component={CustomRouterLink} 
                        to={"/admin/" + entity + "/edit/" + row.original[identifier]}
                        className={classes.editButton}
                      >
                        Editar
                      </Typography>
                      {
                        hasView ?
                        (
                          <Typography 
                            component={CustomRouterLink} 
                            to={pathToView + row.original[identifier]}
                            className={classes.viewButton}
                          >
                            Ver
                          </Typography>   
                        )
                        :
                        (null)
                      }
                    </TableCell>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell align="left" {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UsersList;
