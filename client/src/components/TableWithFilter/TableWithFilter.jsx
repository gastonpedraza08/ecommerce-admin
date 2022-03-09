import React, { useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import { matchSorter } from 'match-sorter';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import { TablePagination } from './components';

import {
  GlobalFilter,
  DefaultColumnFilter,
} from './filters';

import AccordionSection from 'components/AccordionSection';

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));

fuzzyTextFilterFn.autoRemove = (val) => !val;

export default function MyTable({ columns, data, idName }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
    const classes = useStyles();

  const handleSelectAll = (event) => {

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = data.map((user) => user[idName]);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    getToggleHideAllColumnsProps,
    allColumns,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <AccordionSection
        getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
        allColumns={allColumns}
        headerGroups={headerGroups}
      />
      <TableContainer
        style={{ margin: '20px auto' }}
        component={Paper}
        {...getTableProps()}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length}
                style={{
                  textAlign: 'left',
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </TableCell>
            </TableRow>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === data.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < data.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow  
                  {...row.getRowProps()}
                  className={classes.tableRow}
                  hover
                  key={row.original[idName]}
                  selected={selectedUsers.indexOf(row.original[idName]) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(row.original[idName]) !== -1}
                        color="primary"
                        onChange={(event) => handleSelectOne(event, row.original[idName])}
                        value="true"
                      />
                    </TableCell>
                  {row.cells.map((cell) => {
                      return <TableCell align="left" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                  })}
                </TableRow >
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        state={state}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
      />
    </>
  );
}