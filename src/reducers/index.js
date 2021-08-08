import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import registerReducer from "../pages/Register/reducer";
import loginReducer from "../pages/Login/reducer";
import profileReducer from "../pages/Profile/reducer";

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  register: registerReducer,
  login: loginReducer,
  profile: profileReducer,
});

export default rootReducer;
