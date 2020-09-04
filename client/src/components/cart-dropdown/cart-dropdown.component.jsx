import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import {
   selectCartItems,
   selectCurrentUser,
} from "../../redux/user/user.selectors";

const CartDropdown = ({
   cartItems,
   history,
   toggleCartHidden,
   currentUser,
}) => (
   <div className="cart-dropdown">
      <div className="cart-items">
         {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
         ))}
      </div>
      {currentUser ? (
         <CustomButton
            onClick={() => {
               history.push("/checkout");
               toggleCartHidden();
            }}
         >
            GO TO CHECKOUT
         </CustomButton>
      ) : (
         <CustomButton
            onClick={() => {
               history.push("/signin");
               toggleCartHidden();
            }}
         >
            SIGIN TO SEE CART
         </CustomButton>
      )}
   </div>
);

const mapStateToProps = createStructuredSelector({
   cartItems: selectCartItems,
   currentUser: selectCurrentUser,
});

const mapDispathToProps = (dispatch) => ({
   toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default withRouter(
   connect(mapStateToProps, mapDispathToProps)(CartDropdown)
);
