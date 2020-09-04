import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { connect } from "react-redux";

import "./collection-item.styles.scss";
import { addItem } from "../../redux/user/user.actions";

const CollectionItem = ({ item, addItem, currentUser }) => {
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
         <CustomButton onClick={() => addItem(currentUser, item)} inverted>
            ADD TO CART
         </CustomButton>
      </div>
   );
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});

const mapDispathToProps = (dispatch) => ({
   addItem: (user, item) => dispatch(addItem(user, item)),
});

export default connect(mapStateToProps, mapDispathToProps)(CollectionItem);
