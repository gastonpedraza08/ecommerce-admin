import { types } from "../types/types";
import { fetchWithoutToken } from "helpers/fetch";

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