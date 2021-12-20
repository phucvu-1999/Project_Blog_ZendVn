import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";

import authReducer from "./auth/reducer";
import postReducer from "./post/reducer";
import categoryReducer from "./category/reducer";
import menuReducer from "./Menu/reducer";

const rootReducer = combineReducers({
  Post: postReducer,
  Auth: authReducer,
  Category: categoryReducer,
  Menu: menuReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
