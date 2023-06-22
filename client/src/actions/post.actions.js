import axios from "axios";

//POSTS
export const GET_POSTS = "GET_POSTS";
export const GET_PROFILE_POSTS = "GET_PROFILE_POSTS";
export const GET_HOME_POSTS = "GET_HOME_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const GET_POST_ERRORS = "GET_POST_ERRORS";
export const ADD_POST = "ADD_POST";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getPosts = () =>{
    return async (dispatch) =>{
        try {
            const res = await axios
                .get(`/api/posts/`);
            dispatch({ type: GET_POSTS, payload: res.data });
        } catch (err) {
            return console.log(err);
        }
    }

};
export const getProfilePosts = (userId) =>{
    return async (dispatch) =>{
        try {
            const res = await axios
                .get("/api/posts/profile/" + userId);
            dispatch({ type: GET_PROFILE_POSTS, payload: res.data });
        } catch (err) {
            return console.log(err);
        }
    }

};
export const getHomePosts = (userId) =>{
    return async (dispatch) =>{
        try {
            const res = await axios({
                method: 'get',
                url: `/api/posts/` + userId,
            });
            dispatch({ type: GET_HOME_POSTS, payload: res.data });
        } catch (err) {
            return console.log(err);
        }
    }

};

export const likePost = (postId, userId) =>{
    return async (dispatch) =>{
        try {
            const res = await axios({
                method: 'patch',
                url: `/api/posts/likepost/` + postId,
                data: { id: userId }
            });
            dispatch({ type: LIKE_POST, payload: { postId, userId } });
        } catch (err) {
            return console.log(err);
        }
    }

};
export const updatePost = (postId,caption)=>{
    return (dispatch) =>{
       return axios({
        method: 'put',
        url: `/api/posts/`+ postId,
        data: {caption}
       })
       .then((res)=>{
        dispatch({ type: UPDATE_POST, payload: { caption, postId } });
       })
       .catch ((err)=> console.log(err))
    }
}
export const deletePost = (postId)=>{
    return (dispatch) =>{
       return axios({
        method: 'delete',
        url: `/api/posts/`+ postId,
       })
       .then((res)=>{
        dispatch({ type: DELETE_POST, payload: { postId } });
       })
       .catch ((err)=> console.log(err))
    }
}

//comments
export const addComment = (postId,commenterId,text,commenterName)=>{
    return (dispatch) =>{
       return axios({
        method: 'patch',
        url: `/api/posts/commentpost/`+ postId,
        data: {commenterId,text,commenterName},
       })
       .then((res)=>{
        dispatch({ type: ADD_COMMENT, payload: { postId } });
       })
       .catch ((err)=> console.log(err))
    }
}

export const updateComment = (postId,commentId,text)=>{
    return (dispatch) =>{
       return axios({
        method: 'patch',
        url: `/api/posts/editcommentpost/`+ postId,
        data: {commentId,text},
       })
       .then((res)=>{
        dispatch({ type: UPDATE_COMMENT, payload: { postId, commentId, text } });
       })
       .catch ((err)=> console.log(err))
    }
}

export const deleteComment = (postId,commentId)=>{
    return (dispatch) =>{
       return axios({
        method: 'patch',
        url: `/api/posts/deletecommentpost/`+ postId,
        data:{commentId},
       })
       .then((res)=>{
        dispatch({ type: DELETE_COMMENT, payload: { postId,commentId } });
       })
       .catch ((err)=> console.log(err))
    }
}


  export const addPost = (data) => {
    return (dispatch) => {
      return axios
        .post(`/api/posts/`, data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_POST_ERRORS, payload: "" });
          }
        });
    };
  };
  
  