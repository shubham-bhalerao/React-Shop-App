import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import "./header.styles.scss";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

const Header = ({ currentUser, hidden, history }) => (
   <div className="header">
      <Link className="logo-container" to="/">
         <Logo className="logo" />
      </Link>
      <div className="options">
         <Link className="option" to="/shop">
            SHOP
         </Link>
         {/* <Link className="option" to="/shop">
            CONTACT
         </Link> */}
         {currentUser && (
            <div
               className="option"
               onClick={() => {
                  history.push(`/user/${currentUser.id}`);
               }}
            >
               USER:{currentUser.displayName.toUpperCase()}
            </div>
         )}
         {currentUser ? (
            <div className="option" onClick={() => auth.signOut()}>
               SIGN OUT
            </div>
         ) : (
            <Link className="option" to="/signin">
               SIGN IN
            </Link>
         )}
         <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
   </div>
);

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   hidden: selectCartHidden,
});

//connect(a,b) a-> mapStateToProps b-> mapDispatchToProps

export default withRouter(connect(mapStateToProps)(Header));
