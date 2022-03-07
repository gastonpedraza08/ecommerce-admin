import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputAdornment from "@material-ui/core/InputAdornment";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import { SearchInput } from 'components';

const useStyles = makeStyles((theme) => ({
  root: {},
  globalFilterTitle: {
    display: "inline-block",
    marginRight: 10,
    color: "white",
  },
  globalFilterInput: {
    backgroundColor: "white",
    paddingLeft: 5,
    marginRight: theme.spacing(1),
  },
  defaultTextFilter: {
    display: "flex",
    alignItems: "center",
  },
  defaultWidthInputNumber: {
    minWidth: 125,
  },
}));

export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const classes = useStyles();
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 1500);

  return (
    <>
      <SearchInput
        className={classes.globalFilterInput}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </>
  );
};

export const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter, Header },
}) => {
  const count = preFilteredRows.length;
  const [value, setValue] = useState('');

	const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1500);

  return (
    <>
      <Typography variant="subtitle1">{Header}</Typography>
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Buscar ${count} registros...`}
      />
    </>
  );
};

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id, Header },
}) => {
  const classes = useStyles();
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  return (
    <>
      <Typography variant="subtitle1">{Header}</Typography>
      <NativeSelect
        name="age"
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        className={classes.defaultWidthInputNumber}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </NativeSelect>
    </>
  );
};

export const NumberRangeColumnFilter = ({
  column: { filterValue = [], preFilteredRows, setFilter, id, Header },
}) => {
  const classes = useStyles();
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

	const onChange = useAsyncDebounce((e, index) => {
    const val = e.target.value;
    if(index===1) {
    	setFilter((old = []) => [
      val ? parseInt(val, 10) : undefined,
      old[index],
    ]);	
    } else {
    setFilter((old = []) => [
      old[index],
      val ? parseInt(val, 10) : undefined,
    ]);
    }
  }, 1500);

  return (
    <div>
      <Typography variant="subtitle1" className={classes.defaultTextFilter}>
        {Header}
        <RotateLeftIcon
          fontSize="small"
          onClick={() => setFilter([undefined, undefined])}
          style={{
            cursor: "pointer",
          }}
        />
      </Typography>
      <Input
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        value={value1 || ""}
        onChange={(e) => {
          setValue1(e.target.value);
          onChange(e, 1);
        }}
        placeholder={`Min (${min})`}
        className={classes.defaultWidthInputNumber}
        inputProps={{ type: "number" }}
      />
      <span style={{ margin: "0 10px" }}> a </span>
      <Input
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        value={value2 || ""}
        onChange={(e) => {
          setValue2(e.target.value);
          onChange(e, 0);
        }}
        placeholder={`Max (${max})`}
        className={classes.defaultWidthInputNumber}
        inputProps={{ type: "number" }}
      />
    </div>
  );
};
export const NumberGraterThanColumnFilter = ({
  column: { filterValue = [], preFilteredRows, setFilter, id, Header },
}) => {
  const classes = useStyles();

  const count = preFilteredRows.length;
  const [value, setValue] = useState('');

	const onChange = useAsyncDebounce((e) => {
    const val = e.target.value;
    setFilter((old = []) => [
      val ? parseInt(val, 10) : undefined,
    ]);
  }, 1500);

  return (
    <>
      <Typography variant="subtitle1" className={classes.defaultTextFilter}>
        {Header}
        <RotateLeftIcon
          fontSize="small"
          onClick={() => setFilter([undefined])}
          style={{
            cursor: "pointer",
          }}
        />
      </Typography>
      <Input
        startAdornment={<InputAdornment position="start">&#94;</InputAdornment>}
        value={value || ""}
        type="number"
        className={classes.defaultWidthInputNumber}
        onChange={(e) => {
        	setValue(e.target.value);
          onChange(e);
        }}
        placeholder={`${count} registros...`}
      />
    </>
  );
};
