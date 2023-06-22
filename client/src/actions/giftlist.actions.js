import axios from "axios";

export const GET_SELF_GIFTLIST = "GET_SELF_GIFTLIST";
export const CREATE_LIST_REQUEST = 'CREATE_LIST_REQUEST';
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS';
export const CREATE_LIST_FAILURE = 'CREATE_LIST_FAILURE';
export const GET_GIFTLISTS = 'GET_GIFTLISTS';
export const DELETE_GIFTLIST='DELETE_GIFTLIST';
export const UPDATE_GIFT_LIKED_STATUS = 'UPDATE_GIFT_LIKED_STATUS';

// Action Creators
export const createList = (listData) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_LIST_REQUEST });
  
      try {
        console.log('Request payload:', listData);
        const response = await axios.post(`/api/gifts`, listData);
  
        if (response.status !== 201) {
          throw new Error('Failed to create list');
        }
  
        dispatch({
          type: CREATE_LIST_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: CREATE_LIST_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  


export const getSelfGiftlist = (userId) => {
  return (dispatch) => {
    return axios
      .get(`/api/gifts/`+userId)
      .then((res) => {
        dispatch({ type: GET_SELF_GIFTLIST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getGiftlists = () =>{
  return async (dispatch) =>{
      try {
          const res = await axios
              .get(`/api/gifts/`);
          dispatch({ type: GET_GIFTLISTS, payload: res.data });
      } catch (err) {
          return console.log(err);
      }
  }

};

export const deleteGiftlist = (listId)=>{
  return (dispatch) =>{
     return axios({
      method: 'delete',
      url: `/api/gifts/`+ listId,
     })
     .then((res)=>{
      dispatch({ type: DELETE_GIFTLIST, payload: { listId } });
     })
     .catch ((err)=> console.log(err))
  }
}

export const updateGiftLikedStatus = (giftlistId, giftId, isLiked) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `/api/gifts/${giftlistId}`,
      data: { giftId, isLiked },
    })
      .then((res) => {
        dispatch({ type: UPDATE_GIFT_LIKED_STATUS, payload: {giftlistId, giftId} });
      })
      .catch((err) => console.log(err));
  };
};

