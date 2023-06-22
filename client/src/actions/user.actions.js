import axios from "axios";
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_USER = "UPDATE_USER";
export const GET_Friends = "GET_Friends";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUser= (userId) => async (dispatch)=>{
    try {
        const res = await axios.get(`/api/users/${userId}`)
        dispatch({type:GET_USER, payload:res.data})
        
    } catch (error) {
         console.log(error);
    }
  };

  export const uploadPicture = (data, id) =>{
    return(dispatch)=>{
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        console.log(data);
        return axios.post(`/api/users/upload`, data, { headers })
        .then((res)=>{
            return axios.get(`/api/users/${id}`)
            .then((res)=>{
                dispatch({type:UPLOAD_PICTURE, payload:res.data.profilePicture})
            })
        })
        .catch((err)=> console.log(err));
    }; 

};
export const updateUser = (id, data) => async (dispatch) =>{
        console.log(data)
        console.log("id:" +id)
     try {
        await axios.put(`/api/users/${id}`, data)
        .then((res)=>{
            dispatch({type: UPDATE_USER, payload:res.data});
            console.log("Account updated successfully");
        });
      } catch (error) {
        console.log(error)
      }
  };
  
export const followUser = (followerId, idToFollow)=>{
    return (dispatch)=>{
        return axios({
            method: "put",
            url: `/api/users/${idToFollow}/follow`,
            data:{userId: followerId},
        })
        .then((res)=>{
            dispatch({type: FOLLOW_USER, payload:{idToFollow}})
        })
        .catch((err)=> console.log(err))
    }
}
export const unfollowUser = (followerId, idToUnfollow)=>{
    return (dispatch)=>{
        return axios({
            method: "put",
            url: `/api/users/${idToUnfollow}/unfollow`,
            data:{userId: followerId},
        })
        .then((res)=>{
            dispatch({type: UNFOLLOW_USER, payload:{idToUnfollow}})
        })
        .catch((err)=> console.log(err))
    }
}
  