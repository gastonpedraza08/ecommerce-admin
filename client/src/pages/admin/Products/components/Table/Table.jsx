import React, { useMemo } from "react";
import categories from 'assets/config/products/categories';

import { FullTable } from 'components';

const categoriesSelect = [];

for (let prop in categories) {
  categoriesSelect.push({
    name: categories[prop],
    value: prop
  });
}

const ProductsList = (props) => {

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
        optionsSelect: categoriesSelect,
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
        hasView={true}
        pathToView={"/product/"}
      />
    </div>
  );
};

export default ProductsList;