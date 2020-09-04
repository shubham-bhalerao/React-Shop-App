import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
   [selectUser],
   (user) => user.currentUser
);

export const selectCartItems = createSelector(
   [selectCurrentUser],
   (currentUser) => (currentUser ? currentUser.cartItems : [])
);

export const selectCartItemsCount = createSelector(
   [selectCartItems],
   (cartItems) =>
      cartItems
         ? cartItems.reduce(
              (accumalatedQuantity, cartItem) =>
                 accumalatedQuantity + cartItem.quantity,
              0
           )
         : 0
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
   cartItems
      ? cartItems.reduce(
           (accumalatedQuantity, cartItem) =>
              accumalatedQuantity + cartItem.quantity * cartItem.price,
           0
        )
      : 0
);
