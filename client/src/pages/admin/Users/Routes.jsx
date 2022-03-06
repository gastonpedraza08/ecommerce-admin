import React, { useState, useEffect } from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import Breadcrumbs from "components/Breadcrumbs";

import {
	MainListView,
} from './views';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	},
	breadcrumbs: {
		marginTop: theme.spacing(2),
	},
}));

export default function Routes() {
	const classes = useStyles();
	const location = useLocation();

	const [historyBreadcrumbs, setHistoryBreadcrumbs] = useState("");

	useEffect(() => {
		setHistoryBreadcrumbs(location.pathname.split("/admin")[1]);
	}, [location]);

	return (
		<div className={classes.root}>
			<Breadcrumbs
				historyBreadcrumbs={historyBreadcrumbs}
				className={classes.breadcrumbs}
			/>
			<Switch>
				<Route
					exact
					path="/admin/users"
					component={MainListView}
				/>
				<Redirect to="/not-found" />
			</Switch>
		</div>
	);
}
