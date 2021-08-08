import { FAILED, LOADING } from "./constants";
import { loginUser } from "../../utils/fetch";
import { setToken, setUserData, setExpireTime } from "../../utils/storage";

export const fetchLogin = (data) => (dispatch) => {
  dispatch(loadingAction(true));
  loginUser(data)
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
