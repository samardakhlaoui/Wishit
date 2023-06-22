import { FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_USER, UPLOAD_PICTURE } from "../actions/user.actions";

const intialState={};

export default function userReducer(state=intialState, action){
    switch (action.type){
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return{
                ...state,
                profilePicture : action.payload,
            };
        case UPDATE_USER:
            return{
                ...state,
                updateUser : action.payload,
            };    
        case FOLLOW_USER:
            return{
                ...state,
                following : [action.payload.idToFollow, ...state.following]
            };    
        case UNFOLLOW_USER:
            return{
                ...state,
                following : state.following.filter((id)=> id !== action.payload.idToUnfollow),
            }; 
        default: return state;
    }
}