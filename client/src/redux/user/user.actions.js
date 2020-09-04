import { UserActionTypes } from "./user.types";
import { firestore } from "../../firebase/firebase.utils";

export const setCurrentUser = (user) => ({
   type: UserActionTypes.SET_CURRENT_USER,
   payload: user,
});

//dispatching actions to update state early without waiting for
//database to update and then set state
//done to avoid 1 sec lag

export const addItem = (user, cartItemToAdd) => {
   return async (dispatch) => {
      if (!user) return;
      dispatch({
         type: UserActionTypes.ADD_ITEM,
         payload: cartItemToAdd,
      });
      console.log("state update");
      let userRef = firestore.doc(`/users/${user.id}`);
      let userData = await (await userRef.get()).data();
      let cartItems = userData.cartItems;
      if (cartItems === undefined) cartItems = [];
      const existingCartItem = cartItems.find(
         (cartItem) => cartItem.id === cartItemToAdd.id
      );
      let newCartItems = [];
      if (existingCartItem) {
         newCartItems = cartItems.map((cartItem) => {
            if (cartItem.id === cartItemToAdd.id) {
               return {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
               };
            } else return cartItem;
         });
      } else {
         newCartItems = [...cartItems, { ...cartItemToAdd, quantity: 1 }];
      }
      await userRef.update({ cartItems: newCartItems });
      console.log("db update");
   };
};

export const removeItem = (user, cartItemToRemove) => {
   return async (dispatch) => {
      if (!user) return;
      dispatch({
         type: UserActionTypes.REMOVE_ITEM,
         payload: cartItemToRemove,
      });
      console.log("state update");
      let userRef = firestore.doc(`/users/${user.id}`);
      let userData = await (await userRef.get()).data();
      let cartItems = userData.cartItems;
      if (cartItems === undefined) cartItems = [];
      let newCartItems = [];
      if (cartItemToRemove.quantity === 1) {
         newCartItems = cartItems.filter(
            (cartItem) => cartItem.id !== cartItemToRemove.id
         );
      } else {
         newCartItems = cartItems.map((cartItem) => {
            if (cartItem.id === cartItemToRemove.id) {
               return {
                  ...cartItem,
                  quantity: cartItem.quantity - 1,
               };
            } else return cartItem;
         });
      }
      await userRef.update({ cartItems: newCartItems });
      console.log("db update");
   };
};

export const clearItemFromCart = (user, cartItemToRemove) => {
   return async (dispatch) => {
      if (!user) return;
      dispatch({
         type: UserActionTypes.CLEAR_ITEM_FROM_CART,
         payload: cartItemToRemove,
      });
      let userRef = await firestore.doc(`/users/${user.id}`);
      let userData = await userRef.get();
      console.log("UserData", userData);

      let cartItems = userData.cartItems;
      if (cartItems === undefined) cartItems = [];
      let newCartItems = [];
      newCartItems = cartItems.filter(
         (cartItem) => cartItem.id !== cartItemToRemove.id
      );
      console.log(newCartItems);
      await userRef.update({ cartItems: newCartItems });
      console.log("Db update");
   };
};
