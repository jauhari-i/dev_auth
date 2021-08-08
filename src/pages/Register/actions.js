import { FAILED, LOADING } from "./constants";
import {
  registerUser,
  authFacebook,
  authGithub,
  authGoogle,
} from "../../utils/fetch";
import { setToken, setUserData, setExpireTime } from "../../utils/storage";

export const fetchRegister = (data) => (dispatch) => {
  dispatch(loadingAction(true));
  registerUser(data)
    .then((res) => {
      dispatch(loadingAction(false));
      if (res.data.accessToken) {
        const { accessToken } = res.data;
        const userData = JSON.parse(atob(accessToken.split(".")[1]));
        setToken(accessToken);
        setExpireTime(userData.exp);
        setUserData(userData);
        location.href = `/home`;
      }
    })
    .catch((err) => {
      dispatch(loginFailedAction(err.message));
      dispatch(loadingAction(false));
    });
};

export const fetchGoogle = (data) => (dispatch) => {
  dispatch(loadingAction(true));

  authGoogle(data)
    .then((res) => {
      dispatch(loadingAction(false));
      if (res.data.accessToken) {
        const { accessToken } = res.data;
        const userData = JSON.parse(atob(accessToken.split(".")[1]));
        setToken(accessToken);
        setExpireTime(userData.exp);
        setUserData(userData);
        location.href = `/home`;
      }
    })
    .catch((err) => {
      dispatch(loginFailedAction(err.message));
      dispatch(loadingAction(false));
    });
};

export const fetchFacebook = (data) => (dispatch) => {
  dispatch(loadingAction(true));

  authFacebook(data)
    .then((res) => {
      dispatch(loadingAction(false));
      if (res.data.accessToken) {
        const { accessToken } = res.data;
        const userData = JSON.parse(atob(accessToken.split(".")[1]));
        setToken(accessToken);
        setExpireTime(userData.exp);
        setUserData(userData);
        location.href = `/home`;
      }
    })
    .catch((err) => {
      dispatch(loginFailedAction(err.message));
      dispatch(loadingAction(false));
    });
};

export const fetchGithub = (data) => (dispatch) => {
  dispatch(loadingAction(true));

  authGithub(data)
    .then((res) => {
      dispatch(loadingAction(false));
      if (res.data.accessToken) {
        const { accessToken } = res.data;
        const userData = JSON.parse(atob(accessToken.split(".")[1]));
        setToken(accessToken);
        setExpireTime(userData.exp);
        setUserData(userData);
        location.href = `/home`;
      }
    })
    .catch((err) => {
      dispatch(loginFailedAction(err.message));
      dispatch(loadingAction(false));
    });
};

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function loginFailedAction(message) {
  return { type: FAILED, message };
}
