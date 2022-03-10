import React from 'react';
import { useSelector } from 'react-redux';

import { TableWithFilter } from 'components';

import {
  SelectColumnFilter,
  NumberRangeColumnFilter,
  NumberGraterThanColumnFilter,
} from 'components/TableWithFilter/filters.js';

const categories = {
	1: 'Celulares y Teléfonos',
	2: 'Cámaras y Accesorios',
	3: 'Consolas y Videojuegos',
	4: 'Computación',
	5: 'Electrónica, Audio y Video',
};

export default function AppTable() {
  const { products } = useSelector((state) => state.products);
  
  const data2 = React.useMemo(() => products, [products]);

	const columns = React.useMemo(
		() => [
			{
				Header: 'ID',
				accessor: '_id',
				filter: 'fuzzyText',
			},
			{
				Header: 'Sku',
				accessor: 'sku',
				filter: 'fuzzyText',
			},
			{
				Header: 'Nombre',
				accessor: 'name',
				filter: 'fuzzyText',
			},
			{
				Header: 'Precio',
				accessor: 'price',
				Filter: NumberRangeColumnFilter,
				filter: 'between',
			},
			{
				Header: 'Condición',
				accessor: 'condition',
				filter: 'fuzzyText',
			},
			/*{
				Header: 'Descripción',
				Cell: ({ value }) => {
					return <div style={{height: 100, width: 200, overflowY: 'scroll'}} dangerouslySetInnerHTML={{ __html: value }} />
				},
				accessor: 'description',
				filter: 'fuzzyText',
			},*/
			{
				Header: 'Categoria',
				accessor: 'categoryId',
				Cell: ({ value }) => {
					return categories[value]
				},
				Filter: SelectColumnFilter,
				filter: 'includes',
			},
			{
				Header: 'Stock',
				accessor: 'stock',
				Filter: NumberGraterThanColumnFilter,
				filter: 'between',
			},
			{
				Header: 'Estado',
				accessor: 'state',
				Filter: SelectColumnFilter,
				filter: 'includes',
			},
			{
				Header: 'Creado',
				accessor: 'createdAt',
			},
		],
		[]
	);

  return (
    <TableWithFilter columns={columns} data={data2} idName={'_id'}/>
  );
}

