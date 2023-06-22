import {  DELETE_USER_SUCCESS, GET_USERS } from "../actions/users.actions";

const initialState={};
export default function usersReducer(state = initialState, action) {
    switch (action.type) {
      case GET_USERS:
        return action.payload;
      case DELETE_USER_SUCCESS:
        return state.filter((user) => user._id !== action.payload.id);
      default:
        return state;
    }
  }