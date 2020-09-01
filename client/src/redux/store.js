import { createStore, compose, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const middlewares = [thunk];

export const store = createStore(
   rootReducer,
   compose(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
