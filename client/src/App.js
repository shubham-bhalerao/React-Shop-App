import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import UserProfilePage from "./pages/user-profile/user-profile.component";

import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { selectCurrentUser } from "./redux/user/user.selectors";
import WithSpinner from "./components/with-spinner/with-spinner.component";

const UserProfilePageWithSpinner = WithSpinner(UserProfilePage);

class App extends React.Component {
   unsubscribeFromAuth = null;

   componentDidMount() {
      const { setCurrentUser } = this.props;
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
         if (userAuth) {
            const userRef = await createUserProfileDocument(userAuth);
            const snapShot = await userRef.get();
            setCurrentUser({
               id: snapShot.id,
               ...snapShot.data(),
            });
         } else {
            setCurrentUser(userAuth);
         }
      });
   }

   componentWillUnmount() {
      this.unsubscribeFromAuth();
   }

   render() {
      const { currentUser } = this.props;
      return (
         <div>
            <Header />
            <Switch>
               <Route exact path="/" component={HomePage} />
               <Route
                  path="/user/:id"
                  render={(props) => (
                     <UserProfilePageWithSpinner
                        isLoading={!currentUser}
                        {...props}
                     />
                  )}
               />
               <Route path="/shop" component={ShopPage} />
               <Route exact path="/checkout" component={CheckoutPage} />
               <Route
                  exact
                  path="/signin"
                  render={() =>
                     this.props.currentUser ? (
                        <Redirect to="/" />
                     ) : (
                        <SignInAndSignUpPage />
                     )
                  }
               />
            </Switch>
         </div>
      );
   }
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
