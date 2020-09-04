import { UserActionTypes } from "./user.types";
import { addItemToCart } from "./user.utils";
import { removeItemFromCart } from "./user.utils";

const INITIAL_STATE = {
   currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case UserActionTypes.SET_CURRENT_USER:
         return {
            ...state,
            currentUser: action.payload,
         };
      case UserActionTypes.ADD_ITEM: {
         return {
            ...state,
            currentUser: {
               ...state.currentUser,
               cartItems: addItemToCart(
                  state.currentUser.cartItems,
                  action.payload
               ),
            },
         };
      }
      case UserActionTypes.REMOVE_ITEM: {
         return {
            ...state,
            currentUser: {
               ...state.currentUser,
               cartItems: removeItemFromCart(
                  state.currentUser.cartItems,
                  action.payload
               ),
            },
         };
      }
      case UserActionTypes.CLEAR_ITEM_FROM_CART:
         return {
            ...state,
            currentUser: {
               ...state.currentUser,
               cartItems: state.currentUser.cartItems.filter(
                  (cartItem) => cartItem.id !== action.payload.id
               ),
            },
         };
      default:
         return state;
   }
};

export default userReducer;
