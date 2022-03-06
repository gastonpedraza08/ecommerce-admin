import { types } from "../types/types";

const initialState = {
	users: [],
};

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.usersLoadAllusers:
			return {
				...state,
				users: action.payload.users,
			};
		case types.usersCreateUser:
			return {
				...state,
				users: [action.payload.user].concat(state.users),
			};
		default:
			return state;
	}
};
