import { types } from "../types/types";
import { fetchWithoutToken } from "helpers/fetch";

import { 
	uiStartCreateUser,
	uiStopCreateUser,
	uiStartUpdateUser,
	uiStopUpdateUser,
} from 'actions/ui';

export const usersLoadAllusers = () => {
	return async (dispatch) => {
		const result = await fetchWithoutToken("users", "GET");
		if (!result.error) {
			let users = result.data.users;
			dispatch({
				type: types.usersLoadAllusers,
				payload: {
					users
				},
			});
		} else {
			console.log(result.error);
		}
	};
};


export const usersCreateUser = user => {
	return async (dispatch) => {
		dispatch(uiStartCreateUser());
		const result = await fetchWithoutToken("users", user, "POST");
		if (!result.error) {
			dispatch({
				type: types.usersCreateUser,
				payload: {
					user: result.data.user,
				},
			});
			dispatch(uiStopCreateUser(null, true));
		} else {
			dispatch(uiStopCreateUser(result.error, null));
		}
	};
};

export const usersUpdateUser = (user, id) => {
	return async (dispatch) => {
		dispatch(uiStartUpdateUser());
		const result = await fetchWithoutToken("users/" + id, { fieldsToUpdate: user }, "PUT");
		if (!result.error) {
			dispatch({
				type: types.usersUpdateUser,
				payload: {
					user: result.data.user,
				},
			});
			dispatch(uiStopUpdateUser(null, true));
		} else {
			dispatch(uiStopUpdateUser(result.error, null));
		}
	};
};