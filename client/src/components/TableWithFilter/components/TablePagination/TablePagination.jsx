import React from 'react';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function TablePagination(props) {

	const { 
		gotoPage, 
		canPreviousPage, 
		previousPage, 
		nextPage, 
		canNextPage, 
		pageCount,
		state,
		pageOptions,
		setPageSize,
	} = props;

	return (
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
	);
}