import React from 'react';
import { useSelector } from 'react-redux';
import {
	useTable,
	useSortBy,
	useFilters,
	useGlobalFilter,
	usePagination,
} from 'react-table';
import { matchSorter } from 'match-sorter';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
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
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import {
	GlobalFilter,
	DefaultColumnFilter,
	SelectColumnFilter,
	NumberRangeColumnFilter,
	NumberGraterThanColumnFilter,
} from './filters';

import AccordionSection from './AccordionSection';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

function fuzzyTextFilterFn(rows, id, filterValue) {
	return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

function MyTable({ columns, data }) {
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
							<StyledTableCell
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
							</StyledTableCell>
						</TableRow>
						{headerGroups.map((headerGroup) => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<StyledTableCell
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
									</StyledTableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody {...getTableBodyProps()}>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<StyledTableRow {...row.getRowProps()}>
									{row.cells.map((cell) => {
											return <StyledTableCell align="left" {...cell.getCellProps()}>
												{cell.render('Cell')}
											</StyledTableCell>
									})}
								</StyledTableRow>
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

function filterGreaterThan(rows, id, filterValue) {
	return rows.filter((row) => {
		const rowValue = row.values[id];
		return rowValue >= filterValue;
	});
}

filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

export default function AppTable() {
	const { products } = useSelector((state) => state.products);
	const columns = React.useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
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
				Header: 'Descripción',
				Cell: ({ value }) => {
					return <div style={{height: 100, width: 200, overflowY: 'scroll'}} dangerouslySetInnerHTML={{ __html: value }} />
				},
				accessor: 'description',
				filter: 'fuzzyText',
			},
			{
				Header: 'Categoria',
				accessor: 'category',
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

	const data2 = React.useMemo(() => products, [products]);

	return <MyTable columns={columns} data={data2} />;
}
