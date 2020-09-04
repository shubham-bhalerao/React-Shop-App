import React from "react";
import { connect } from "react-redux";

import {
   clearItemFromCart,
   addItem,
   removeItem,
} from "../../redux/user/user.actions";

import "./checkout-item.styles.scss";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const CheckoutItem = ({
   cartItem,
   clearItem,
   addItem,
   removeItem,
   currentUser,
}) => {
   const { name, imageUrl, price, quantity } = cartItem;
   return (
      <div className="checkout-item">
         <div className="image-container">
            <img src={imageUrl} alt="item" />
         </div>
         <span className="name">{name}</span>
         <span className="quantity">
            <div
               className="arrow"
               onClick={() => removeItem(currentUser, cartItem)}
            >
               &#10094;
            </div>
            <span className="value">{quantity}</span>
            <div
               className="arrow"
               onClick={() => addItem(currentUser, cartItem)}
            >
               &#10095;
            </div>
         </span>
         <span className="price">{price}</span>
         <div
            className="remove-button"
            onClick={() => clearItem(currentUser, cartItem)}
         >
            &#10005;
         </div>
      </div>
   );
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
   clearItem: (user, item) => dispatch(clearItemFromCart(user, item)),
   addItem: (user, item) => dispatch(addItem(user, item)),
   removeItem: (user, item) => dispatch(removeItem(user, item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
