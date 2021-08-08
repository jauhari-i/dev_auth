import { hot } from "react-hot-loader/root";
import React from "react";
import PropTypes from "prop-types";
import { useRoutes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import SnackbarProvider from "react-simple-snackbar";
import { getToken, checkExpireTime, clearStorages } from "./utils/storage";

const loginStatus = () => {
  if (!getToken()) {
    return false;
  } else if (checkExpireTime()) {
    clearStorages();
    return false;
  } else if (getToken()) {
    return true;
  }
};

const Route = () => {
  const login = loginStatus();
  const routing = useRoutes(routes(login));

  return <>{routing}</>;
};

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <BrowserRouter>
          <Route />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default hot(App);
