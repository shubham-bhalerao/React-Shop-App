import { createStore, compose } from "redux";
import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

export const store = createStore(
   rootReducer,
   compose(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
         window.__REDUX_DEVTOOLS_EXTENSION__()
   )
);

export const persistor = persistStore(store);
