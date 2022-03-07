import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { getInitials } from "helpers";


import {
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
} from './filters';

import AccordionSection from 'components/AccordionSection';

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

fuzzyTextFilterFn.autoRemove = (val) => !val;

function MyTable({ columns, data }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
    const classes = useStyles();

  const handleSelectAll = (event) => {

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = data.map((user) => user.id);
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
      onFilteredChange: filtered => {
           console.log(filtered)
       }
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
                  key={row.original.id}
                  selected={selectedUsers.indexOf(row.original.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(row.original.id) !== -1}
                        color="primary"
                        onChange={(event) => handleSelectOne(event, row.original.id)}
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
      <div style={{ display: 'flex' }}>
        <IconButton
          size="small"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <FirstPageIcon fontSize="medium" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <KeyboardArrowLeftIcon fontSize="medium" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <KeyboardArrowRightIcon fontSize="medium" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <LastPageIcon fontSize="medium" />
        </IconButton>
        <Typography variant="subtitle1" style={{ margin: '0 10px' }}>
          Page:{' '}
          <strong>
            {state.pageIndex} of {pageOptions.length}
          </strong>
        </Typography>
        <Typography variant="subtitle1">
          | Go to page:
          <Input
            value={state.pageIndex}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            inputProps={{ type: 'number' }}
            style={{ width: 100, marginLeft: 10 }}
          />
        </Typography>
        <NativeSelect
          style={{ marginLeft: 10 }}
          value={state.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </NativeSelect>
      </div>
    </>
  );
}

export default function AppTable() {
  const { users } = useSelector((state) => state.users);
  const classes = useStyles();
  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
        filter: 'fuzzyText',
      },
      {
        Header: 'Foto de perfil',
        Cell: ({ cell }) => {
          return (
            <div className={classes.nameContainer}>
              <Avatar className={classes.avatar} src={cell.row.original.avatarUrl}>
                {getInitials(cell.row.original.firstName + ' ' + cell.row.original.lastName)}
              </Avatar>
            </div>
          );
        },
        accessor: 'avatarUrl',
      },
      {
        Header: 'Nombre',
        accessor: 'firstName',
        filter: 'fuzzyText',
      },
      {
        Header: 'Apellido',
        accessor: 'lastName',
        filter: 'fuzzyText',
      },
      {
        Header: 'Email',
        accessor: 'email',
        filter: 'fuzzyText',
      },
      {
        Header: 'Role',
        Cell: ({ value }) => {
          return (<div>{value}</div>)
        },
        accessor: 'roleId',
        filter: 'fuzzyText',
      },
      {
        Header: 'Estado',
        accessor: 'state',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Fecha de creación',
        accessor: 'createdAt',
      },
    ],
    [classes.avatar, classes.nameContainer]
  );

  const data2 = React.useMemo(() => users, [users]);

  return <MyTable columns={columns} data={data2} />;
}
