import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import { getInitials } from "helpers";

import { TableWithFilter } from 'components';

import {
  SelectColumnFilter,
} from 'components/TableWithFilter/filters.js';


const useStyles = makeStyles((theme) => ({
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

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

  return (
    <TableWithFilter columns={columns} data={data2} idName={'id'}/>
  );
}
