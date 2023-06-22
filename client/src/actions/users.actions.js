import axios from "axios";

export const GET_USERS = "GET_USERS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`/api/users/`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteUser = (id, userId, isAdmin) => {
  return (dispatch) => {
    if (id === userId || isAdmin) {
      return axios({
        method: 'delete',
        url: `/api/users/`+ id,
        data:{userId, isAdmin},
       })
        .then((res) => {
          dispatch({ type: DELETE_USER_SUCCESS, payload: { id } });
        })
        .catch((err) => {
          dispatch({ type: DELETE_USER_FAILURE, payload: err.response.data });
        });
    }
  };
};
