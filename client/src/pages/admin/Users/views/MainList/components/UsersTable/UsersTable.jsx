import React, { useMemo } from "react";

import { FullTable } from 'components';

const UsersList = (props) => {

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "First name",
        accessor: "firstName",
        canFilter: true,
        filterType: 'text',
        defaultValue: '',
      },
      {
        Header: "Last name",
        accessor: "lastName",
        canFilter: true,
        filterType: 'text',
        defaultValue: '',
      },
      {
        Header: "Email",
        accessor: "email",
        canFilter: true,
        filterType: 'text',
        defaultValue: '',
      },
      {
        Header: 'Estado',
        accessor: 'state',
        canFilter: true,
        filterType: 'select',
        optionsSelect: [
          {
            name: 'All',
            value: '',
          },
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
    []
  );

  return (
    <div>
      <FullTable columns={columns} entity={"users"} identifier={"id"} />
    </div>
  );
};

export default UsersList;
