import { CREATE_LIST_FAILURE, CREATE_LIST_REQUEST, CREATE_LIST_SUCCESS, DELETE_GIFTLIST, GET_GIFTLISTS, GET_SELF_GIFTLIST, UPDATE_GIFT_LIKED_STATUS } from "../actions/giftlist.actions";


const initialState={  loading: false, error: null, newList: null,};
export default function giftlistReducer(state = initialState, action) {
    switch (action.type) {
      case GET_GIFTLISTS:
            return action.payload;
      case GET_SELF_GIFTLIST:
        return action.payload;
        case CREATE_LIST_REQUEST:
            return {
              ...state,
              loading: true,
              error: null,
              newList: null,
            };
          case CREATE_LIST_SUCCESS:
            return {
              ...state,
              loading: false,
              newList: action.payload,
            };
          case CREATE_LIST_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
          case DELETE_GIFTLIST:
            return state.filter((list)=> list._id !== action.payload.listId);

          case UPDATE_GIFT_LIKED_STATUS:
            const { giftlistId, giftId } = action.payload;
            const updatedGifts = state.map((gift) => {
              if (gift._id === giftlistId) {
                const updatedGift = gift.gifts.map((item) => {
                  if (item._id === giftId) {
                    return { ...item, isLiked: !item.isLiked };
                  }
                  return item;
                });
                return { ...gift, gifts: updatedGift };
              }
              return gift;
            });
            return { ...state, gifts: updatedGifts };   
            
      default:
        return state;
    }
  }