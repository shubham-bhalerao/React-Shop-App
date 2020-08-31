import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ fetchCollectionsStartAsync, match, isFetching }) => {
   //moved async fetching to redux so can use in multiple places without repeating
   useEffect(() => {
      fetchCollectionsStartAsync();
   }, [fetchCollectionsStartAsync]); //fetchCollectionsStartAsync is passed into [] to avoid waring

   //very interesting issue caused due to init of state
   //has to do with [] -> truthy
   console.log(isFetching);
   return (
      <div className="shop-page">
         <Route
            exact
            path={`${match.path}`}
            render={(props) => (
               <CollectionsOverviewWithSpinner
                  isLoading={isFetching}
                  {...props}
               />
            )}
         />
         <Route
            path={`${match.path}/:collectionId`}
            render={(props) => (
               <CollectionPageWithSpinner isLoading={isFetching} {...props} />
            )}
         />
      </div>
   );
};

const mapStateToProps = createStructuredSelector({
   isFetching: selectIsCollectionFetching,
});

const mapDispatchToProps = (dispatch) => ({
   fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
