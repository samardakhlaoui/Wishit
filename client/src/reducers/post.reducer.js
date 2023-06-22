import { DELETE_COMMENT, DELETE_POST, GET_HOME_POSTS, GET_POSTS, GET_PROFILE_POSTS, LIKE_POST, UPDATE_COMMENT, UPDATE_POST } from "../actions/post.actions";

const initialState ={posts: []};
export default function postReducer(state = initialState, action){
    switch (action.type){
        case GET_POSTS:
            return action.payload;

        case GET_PROFILE_POSTS:
            return action.payload;

        case GET_HOME_POSTS:
            return action.payload;

        case LIKE_POST:
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.postId) {
                return {
                    ...post,
                    likers: action.payload.userId
                    ? [...post.likers, action.payload.userId]
                    : post.likers.filter((likerId) => likerId !== action.payload.userId),
                };
                }
                return post;
            });
            return { ...state, posts: updatedPosts };
        case UPDATE_POST:
            return state.map((post)=>{
                if (post._id=== action.payload.postId){
                    return{
                        ...post,
                        caption: action.payload.caption
                    };
                }else return post;
            });
        case DELETE_POST:
            return state.filter((post)=> post._id !== action.payload.postId);
        case UPDATE_COMMENT:
            return state.map((post)=>{
                if (post._id === action.payload.postId){
                    return{
                        ...post,
                        comments: post.comments.map((comment)=>{
                            if (comment._id === action.payload.commentId){
                                return{
                                    ...comment,
                                    text: action.payload.text
                                }
                            }else{
                                return comment
                            }
                        })
                    }
                }else {
                    return post;
                }
            })
        case DELETE_COMMENT:
            return state.map((post)=>{
                if (post._id === action.payload.postId){
                    return{
                        ...post,
                        comments: post.comments.filter((comment)=> comment._id !== action.payload.commentId)
                    }
                }else return post;
            })
        default:
            return state;
    }
}