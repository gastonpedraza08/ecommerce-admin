import React from "react";
import xlsx from 'json-as-xlsx';
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

import { SearchInput, CustomRouterLink } from "components";

import { roleIds } from 'assets/config/users';

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

const UsersToolbar = (props) => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  let data = [
    {
      sheet: 'Adults',
      columns: [
        { label: 'Id', value: 'id' }, // Top level data
        { label: 'Nombre', value: row => (row.firstName) }, // Run functions
        { label: 'Apellido', value: 'lastName' }, // Top level data
        { label: 'Email', value: 'email' }, // Top level data
        { label: 'Role', value: row => (roleIds[row.roleId]) }, // Top level data
        { label: 'Foto de perfil', value: 'avatarUrl' }, // Top level data
        { label: 'Fecha de registro', value: 'createdAt' }, // Top level data
        { label: 'Estado', value: row => row.deletedAt ? 'Deshabilitado' : 'Verificado' }, // Top level data
      ],
      content: users,
    }
  ]

  let settings = {
    fileName: 'users', // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
  }

  const downloadXlsx = () => {
    xlsx(data, settings) // Will download the excel file
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Tooltip title="Importar XLSX">
          <Button 
            className={classes.importButton}
          >
            Import
          </Button>
        </Tooltip>
        <Tooltip title="Descargar XLSX">
          <Button 
            className={classes.exportButton}
            onClick={downloadXlsx}
          >
            Export
          </Button>
        </Tooltip>
        <Button 
          color="primary" 
          variant="contained"
          component={CustomRouterLink}
          to="/admin/users/create"
        >
          Add user
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div>
    </div>
  );
};

export default UsersToolbar;
