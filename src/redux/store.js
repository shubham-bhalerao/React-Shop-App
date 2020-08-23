import { createStore, compose } from "redux";

import rootReducer from "./root-reducer";

const store = createStore(
   rootReducer,
   compose(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
         window.__REDUX_DEVTOOLS_EXTENSION__()
   )
);

export default store;
