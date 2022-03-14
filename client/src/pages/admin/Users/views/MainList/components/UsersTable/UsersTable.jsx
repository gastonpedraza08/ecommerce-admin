import React, { useMemo } from "react";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import { getInitials } from "helpers";
import { FullTable } from 'components';

const useStyles = makeStyles((theme) => ({
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

let roles = {
  1: 'Admin',
  2: 'Subscriber'
}

const UsersList = (props) => {

  const classes = useStyles();

  const columns = useMemo(
    () => [
      {
        Header: 'Foto de perfil',
        accessor: 'avatarUrl',
        Cell: ({ cell }) => {
          return (
            <div className={classes.nameContainer}>
              <Avatar className={classes.avatar} src={cell.row.original.avatarUrl}>
                {getInitials(cell.row.original.firstName + ' ' + cell.row.original.lastName)}
              </Avatar>
            </div>
          );
        },
      },
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "First name",
        accessor: "firstName",
        customCanFilter: true,
        filterType: 'text',
        defaultValue: '',
      },
      {
        Header: "Last name",
        accessor: "lastName",
        customCanFilter: true,
        filterType: 'text',
        defaultValue: '',
      },
      {
        Header: 'Role',
        accessor: 'roleId',
        Cell: ({ value }) => {
          return (
            <>
              {roles[value]}
            </>
          );
        },
        customCanFilter: true,
        filterType: 'select',
        optionsSelect: [
          {
            name: "Subscriber",
            value: "2"
          },
          {
            name: "Admin",
            value: "1"
          } 
        ],
        defaultValue: '',
      },
      {
        Header: "Email",
        accessor: "email",
        customCanFilter: true,
        filterType: 'text',
        defaultValue: '',
      },
      {
        Header: 'Estado',
        accessor: 'state',
        customCanFilter: true,
        filterType: 'select',
        optionsSelect: [
          {
            name: "Deshabilitado",
            value: "Deshabilitado"
          },
          {
            name: "Verificado",
            value: "Verificado"
          } 
        ],
        defaultValue: '',
      }
    ],
    [classes.avatar, classes.nameContainer]
  );

  return (
    <div>
      <FullTable 
        columns={columns} 
        entity={"users"} 
        identifier={"id"}  
        hasView={false}
      />
    </div>
  );
};

export default UsersList;
