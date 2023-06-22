import { GET_POST_ERRORS } from "../actions/post.actions";

const initialState = { userError: [], postError: []};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: action.payload,
        userError: [],
      }
    default: 
      return state;
  }
}