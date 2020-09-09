import React from "react";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import CustomButton from "../../components/custom-button/custom-button.component";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const UserProfilePage = ({ currentUser, history }) => {
   return (
      <div>
         <h1>Welcome, {currentUser.displayName}</h1>
         <h3>Your email is {currentUser.email}</h3>
         <CustomButton
            onClick={() => {
               history.push("/checkout");
            }}
         >
            Go to checkout
         </CustomButton>
      </div>
   );
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(UserProfilePage));
