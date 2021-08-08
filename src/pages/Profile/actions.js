import { FAILED, LOADING, SUCCESS } from "./constants";
import { getProfile, updateProfile } from "../../utils/fetch";

export const fetchProfile = () => (dispatch) => {
  const key = "User";

  dispatch(loadingAction(true, key));

  getProfile()
    .then((res) => dispatch(successAction(res.data, key)))
    .catch((err) => dispatch(failedAction(err.message, key)));
};

export const editProfile = (data) => (dispatch) => {
  const key = "Update";

  dispatch(loadingAction(true, key));
  updateProfile(data)
    .then(() => dispatch(failedAction("successupdate", key)))
    .catch((err) => dispatch(failedAction(err.message, key)));
};

const failedAction = (message, key) => {
  return { type: FAILED, message, key };
};

const loadingAction = (isLoading, key) => {
  return { type: LOADING, isLoading, key };
};

const successAction = (data, key) => {
  return { type: SUCCESS, data, key };
};
