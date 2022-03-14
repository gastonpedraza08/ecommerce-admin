import React, { useMemo } from "react";
import { makeStyles } from '@material-ui/core/styles';

import { FullTable } from 'components';

const useStyles = makeStyles((theme) => ({
}));

const categories = {
	1: 'Celulares y Teléfonos',
	2: 'Cámaras y Accesorios',
	3: 'Consolas y Videojuegos',
	4: 'Computación',
	5: 'Electrónica, Audio y Video',
};

const ProductsList = (props) => {

  const classes = useStyles();

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "_id",
        customCanFilter: true,
        filterType: 'text',
        defaultValue: '',
      },
      {
        Header: "Sku",
        accessor: "sku",
        customCanFilter: true,
        filterType: 'text',
        defaultValue: '',
      },
      {
        Header: "Nombre",
        accessor: "name",
        customCanFilter: true,
        filterType: 'text',
        defaultValue: '',
      },
      {
        Header: "Precio",
        accessor: "price",
        customCanFilter: false,
      },
      {
        Header: "Condición",
        accessor: "condition",
        customCanFilter: false,
      },
      {
        Header: "Marca",
        accessor: "marca",
        customCanFilter: true,
        filterType: 'text',
        defaultValue: ''
      },
      {
        Header: 'Categoria',
        accessor: 'categoryId',
        Cell: ({ value }) => {
          return (
            <>
              {categories[value]}
            </>
          );
        },
        customCanFilter: true,
        filterType: 'select',
        optionsSelect: [
          {
            name: 'Celulares y Teléfonos',
            value: 1
          },
          {
            name: 'Cámaras y Accesorios',
            value: 2
          },
          {
            name: 'Consolas y Videojuegos',
            value: 3
          },
          {
            name: 'Computación',
            value: 4
          },
          {
            name: 'Electrónica, Audio y Video',
            value: 5
          },
        ],
        defaultValue: '',
      },
      {
      	Header: 'Stock',
      	accessor: 'stock',
      	customCanFilter: false
      },
      {
      	Header: 'Estado',
      	accessor: 'state',
      	customCanFilter: false,
      },
      {
        Header: "Fecha de creación",
        accessor: "createdAt",
        customCanFilter: false,
      },
    ],
    []
  );

  return (
    <div>
      <FullTable 
        columns={columns} 
        entity={"products"} 
        identifier={"_id"}  
        hasView={false}
      />
    </div>
  );
};

export default ProductsList;