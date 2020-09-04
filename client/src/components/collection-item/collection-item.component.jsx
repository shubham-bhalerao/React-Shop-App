import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

import "./collection-item.styles.scss";
import { addItem } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const CollectionItem = ({ item, addItem, currentUser, history }) => {
   const { name, price, imageUrl } = item;
   return (
      <div className="collection-item">
         <div
            className="image"
            style={{
               backgroundImage: `url(${imageUrl})`,
            }}
         />
         <div className="collection-footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
         </div>
         {currentUser ? (
            <CustomButton onClick={() => addItem(currentUser, item)} inverted>
               ADD TO CART
            </CustomButton>
         ) : (
            <CustomButton onClick={() => history.push("/signin")} inverted>
               SIGNIN TO SHOP
            </CustomButton>
         )}
      </div>
   );
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});

const mapDispathToProps = (dispatch) => ({
   addItem: (user, item) => dispatch(addItem(user, item)),
});

export default withRouter(
   connect(mapStateToProps, mapDispathToProps)(CollectionItem)
);
